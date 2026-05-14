/**
 * 아뜨랑스 신상품 반응 분석 — 히어로 점수 리포트 생성
 * data/newgoods-data.csv 를 읽어 reports/newgoods-report.md 를 생성한다.
 *
 * 실행: node scripts/analyze-newgoods.js
 */

const fs   = require('fs');
const path = require('path');

const CSV_PATH      = path.join(__dirname, '..', 'data', 'newgoods-data.csv');
const META_PATH     = path.join(__dirname, '..', 'data', 'meta.json');
const REPORT_PATH   = path.join(__dirname, '..', 'reports', 'newgoods-report.md');
const DASHBOARD_PATH = path.join(__dirname, '..', 'dashboard.js');

// ─── CSV 파싱 ─────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split('\n');
  const rows  = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = [];
    let cur = '', inQ = false;
    for (const ch of lines[i]) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; }
      else { cur += ch; }
    }
    cols.push(cur.trim());
    if (cols.length >= 10 && cols[1]) rows.push(cols); // 재고 컬럼(11번째)은 없어도 허용
  }
  return rows;
}

function num(s) {
  if (!s || s.trim() === '') return 0;
  return parseFloat(s.replace(/,/g, '').trim()) || 0;
}

// ─── 채점 함수 ────────────────────────────────────────────────────
const scorePurchaseRate = r => r >= 5 ? 30 : r >= 3 ? 24 : r >= 2 ? 18 : r >= 1 ? 12 : r >= 0.5 ? 6 : 0;
const scoreCartRate     = r => r >= 20 ? 20 : r >= 15 ? 16 : r >= 10 ? 12 : r >= 5 ? 8 : r >= 2 ? 4 : 0;
const scoreViews        = v => v >= 2000 ? 20 : v >= 1000 ? 16 : v >= 500 ? 12 : v >= 200 ? 8 : v >= 50 ? 4 : 0;
const scoreSales        = a => a >= 2000000 ? 20 : a >= 1000000 ? 16 : a >= 500000 ? 12 : a >= 200000 ? 8 : a >= 50000 ? 4 : 0;
const scoreDwell        = s => s >= 55 ? 10 : s >= 45 ? 8 : s >= 38 ? 6 : s >= 30 ? 4 : s >= 20 ? 2 : 0;

function getTier(score) {
  if (score >= 80) return '⭐ HERO';
  if (score >= 60) return '🔼 성장 가능';
  if (score >= 40) return '➡️ 관찰 필요';
  return '🔽 개선 필요';
}

// ─── 상품 상태 요약 ───────────────────────────────────────────────
function getStatus(p) {
  const { views: v, cart_rate: cr, purchase_rate: pr, dwell: dw, sales: sl,
          purchase_count: pc, cart_count: cc, hero_score: sc } = p;
  const ab = cc - pc;
  if (sc >= 80)
    return `전 지표 우수. 조회 ${v.toLocaleString()}회 · 구매 비율 ${pr}% · 판매금액 ${sl.toLocaleString()}원. 현재 최상위 퍼포먼스. 광고/메인 집중 투자 시 매출 극대화 가능.`;
  if (pr >= 3 && v < 500)
    return `구매 비율 ${pr}%로 전환력 압도적이나 조회수 ${v.toLocaleString()}회에 불과. 노출 부족으로 매출이 극히 제한된 상태. 광고 집행 즉시 폭발적 성장 가능.`;
  if (cr >= 15 && pr < 2)
    return `장바구니 비율 ${cr}%로 관심도 높으나 구매 비율 ${pr}%로 낮음. 이탈 ${ab}명이 결제 직전에 멈춘 상태. 가격·배송·신뢰 요소 보완이 핵심.`;
  if (dw >= 45 && pr < 2)
    return `체류시간 ${dw}초로 상세를 충분히 열람 중이나 구매 비율 ${pr}%로 낮음. 상세페이지 설득력 강화가 필요한 상태.`;
  if (v >= 300 && pc === 0)
    return `조회수 ${v.toLocaleString()}회로 유입은 있으나 구매 0건. 전환을 막는 근본 원인 즉각 파악 필요.`;
  if (sc >= 60)
    return `조회수 ${v.toLocaleString()}회 · 구매 비율 ${pr}% · 판매금액 ${sl.toLocaleString()}원으로 준수한 성과. 약점 지표 보완 시 HERO 등급 달성 가능.`;
  if (sc >= 40)
    return `전반적 평균 수준. 조회수 ${v.toLocaleString()}회 · 구매 비율 ${pr}%로 개선 여지 있음.`;
  return `주요 지표 전반 저조. 조회수 ${v.toLocaleString()}회 · 구매 비율 ${pr}% · 판매금액 ${sl.toLocaleString()}원. 상품 재검토 또는 리뉴얼 검토 필요.`;
}

// ─── 우선순위 ─────────────────────────────────────────────────────
function getPriority(p) {
  const { views: v, purchase_rate: pr, dwell: dw, purchase_count: pc,
          hero_score: sc, cart_count: cc } = p;
  const ab = cc - pc;
  if (v >= 200 && pc === 0 && dw >= 38)  return ['🔴 긴급', '조회 충분·체류 정상이나 구매 0건 — 상세페이지 즉시 점검'];
  if (pr >= 3 && v < 300)                return ['🔴 긴급', '고전환율 상품 저노출 — 광고 예산 즉시 투입 필요'];
  if (ab >= 80)                           return ['🔴 긴급', `장바구니 이탈 ${ab}명 — 즉각 푸시로 매출 회수 가능`];
  if (sc >= 80)  return ['🟠 높음', 'HERO 상품 — 광고·메인 노출 극대화로 매출 최대화'];
  if (sc >= 60)  return ['🟠 높음', '성장 가능 상품 — 이번 주 내 집중 육성 액션 실행 권장'];
  if (v >= 100 && pc === 0) return ['🟠 높음', '유입 있으나 전환 전무 — 원인 파악 후 즉시 개선'];
  if (sc >= 40)  return ['🟡 보통', '평균 수준 유지 중 — 주간 모니터링 지속'];
  return ['🟢 유지/정리', '저반응 상품 — 재고 정리 또는 리뉴얼 검토'];
}

// ─── 추천 액션 ───────────────────────────────────────────────────
function getActions(p) {
  const { views: v, cart_count: cc, purchase_count: pc, cart_rate: cr,
          purchase_rate: pr, total_rate: tr, dwell: dw, sales: sl,
          hero_score: sc, stock } = p;
  const ab = cc - pc;
  const acts = [];

  if (pr >= 2 && v < 500)
    acts.push('[ACT-01] **광고 확대** — 구매 전환율 우수 대비 노출 부족. 상품 광고 즉시 집행, 유사 카테고리 타겟팅 설정');
  if (v >= 300 && pc === 0 && cr < 3)
    acts.push('[ACT-02] **광고 중단 검토** — 조회 대비 전환 전무. 집행 중인 광고 일시 중단 후 원인 파악 선행');
  if (tr >= 18 || sc >= 80)
    acts.push('[ACT-03] **메인 노출** — 총 반응률 우수. 자사몰 메인 추천 슬롯 우선 배치 (최소 1주일)');
  if (ab >= 30 && pr < 2)
    acts.push(`[ACT-04] **푸시 발송** — 장바구니 이탈 ${ab}명 대상. '오늘만 무료배송' 또는 '한정 할인' 즉시 발송`);
  else if (cr >= 10 && pr < 2)
    acts.push('[ACT-04] **푸시 발송** — 장바구니 전환 대비 구매 전환 낮음. 이탈 고객 리마인드 푸시 집행');
  if (cr >= 8 && pr < 1.5)
    acts.push('[ACT-05] **리뷰 확보** — 기존 구매자 대상 리뷰 작성 쿠폰 즉시 발송. 신뢰도 강화로 신규 구매 전환 향상');
  if (dw >= 42 && pr < 2)
    acts.push('[ACT-06] **상세페이지 수정** — 높은 체류 대비 구매 전환 낮음. 착용 영상·실측 사이즈·핵심 구매 포인트 상단 배치');
  else if (v >= 300 && pc === 0)
    acts.push('[ACT-06] **상세페이지 전면 수정** — 구매 0건. 첫 이미지·가격 정당성·사이즈 정보 전면 재검토 필요');
  if (cc >= 20 && pc > 0 && (pc / cc) < 0.15)
    acts.push(`[ACT-07] **가격 점검** — 장바구니→구매 전환율 ${Math.round(pc / cc * 100)}%. 경쟁 상품 대비 가격 포지셔닝 재검토`);
  else if (cc >= 5 && pc === 0)
    acts.push('[ACT-07] **가격 점검** — 장바구니 후 전원 이탈. 가격 부담 여부 즉시 점검');

  // 재고 기반 ACT-08 / ACT-09
  if (stock !== null) {
    if (stock === 0 && sl > 0)
      acts.push('[ACT-08] **재고 긴급 확보** ⚠️ — 판매 실적 있으나 현재 재고 0. 즉시 발주 또는 입고 일정 확인 필요');
    else if (stock > 0 && stock <= 5 && sl >= 200000)
      acts.push(`[ACT-08] **재고 확보** — 재고 ${stock}개만 남음. 현재 판매 속도 대비 품절 임박 — 즉시 추가 발주`);
    else if (sl >= 500000 && pc >= 10)
      acts.push('[ACT-08] **재고 확보** — 판매 실적 우수. 품절 방지 위해 재고 수량 즉시 확인 및 발주');

    if (stock >= 30 && pc === 0 && v >= 50)
      acts.push(`[ACT-09] **재고 소진 유도** — 재고 ${stock}개 보유 중이나 구매 0건. 할인·번들 구성으로 재고 정리 우선 검토`);
  } else {
    if (sl >= 500000 && pc >= 10)
      acts.push('[ACT-08] **재고 확보** — 판매 실적 우수. 품절 방지 위해 재고 수량 즉시 확인 및 발주');
  }

  if (dw >= 45)
    acts.push('[ACT-10] **코디 상품 연결** — 체류시간 높아 추가 탐색 의향 존재. 하단 코디 상품 배치로 교차 구매 유도');
  if (pr >= 3 && v < 500)
    acts.push('[ACT-11] **외부몰 확장** — 높은 전환율 상품의 노출 채널 다각화. 카카오스타일·에이블리 추가 입점 검토');

  // ACT-12: 썸네일 점검 — 등록 14일 이상, 조회수 100 미만
  const regDate = p.reg_date ? new Date(p.reg_date) : null;
  const daysSince = regDate ? Math.floor((new Date() - regDate) / 86400000) : 0;
  if (v < 100 && v >= 1 && daysSince >= 14)
    acts.push('[ACT-12] **썸네일 점검** — 등록 후 14일 경과, 조회수 100 미만. 클릭률 저조 가능성 — 썸네일 교체 검토');

  if (acts.length === 0)
    acts.push('[ACT-09] **긴급 소진 유도** — 저반응 상품. 할인 또는 번들 구성으로 재고 정리 검토');

  return acts;
}

// ─── 기대 효과 ───────────────────────────────────────────────────
function getEffects(p) {
  const { purchase_rate: pr, views: v, cart_count: cc, purchase_count: pc,
          sales: sl, dwell: dw, hero_score: sc } = p;
  const ab = cc - pc;
  const eff = [];

  if (pr >= 3 && v < 500) {
    const exp  = Math.round(1000 * pr / 100);
    const mult = (1000 / Math.max(v, 1)).toFixed(1);
    eff.push(`광고로 조회수 1,000 달성 시 예상 추가 구매 약 ${exp}건 — 현재 대비 ${mult}배 노출 확대`);
  }
  if (ab >= 30) {
    const recover = Math.max(1, Math.round(ab * 0.2));
    if (pc > 0 && sl > 0) {
      const avgP = Math.round(sl / pc);
      eff.push(`이탈 ${ab}명 중 20% 전환 시 추가 ${recover}건 · 약 ${(recover * avgP).toLocaleString()}원 즉각 회수`);
    } else {
      eff.push(`이탈 ${ab}명 중 20% 전환 시 추가 구매 ${recover}건 발생 기대`);
    }
  }
  if (dw >= 42 && pr < 2)
    eff.push(`상세페이지 개선 후 높은 체류시간(${dw}초)이 구매로 연결 — 전환율 2배 이상 개선 기대`);
  if (sc >= 80)
    eff.push('HERO 상품 집중 육성 시 전체 매출의 핵심 기여 상품으로 자리매김 가능');
  if (eff.length === 0) {
    if (sc >= 60)      eff.push('집중 운영 시 HERO 등급 달성 가능. 현재 강점 유지 + 약점 지표 보완 병행 권장');
    else if (sc >= 40) eff.push('원인 파악 후 단계적 개선 시 성장 가능 상품으로 등급 상승 기대');
    else               eff.push('근본적 상품 재검토 또는 리뉴얼 후 재론칭 시 성과 개선 가능');
  }
  return eff;
}

// ─── 데이터 로드 & 점수 계산 ────────────────────────────────────
function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`[analyze] ❌ CSV 파일 없음: ${CSV_PATH}`);
    console.error('[analyze]    먼저 node scripts/extract-newgoods.js 를 실행하세요.');
    process.exit(1);
  }

  const raw  = fs.readFileSync(CSV_PATH, 'utf-8');
  const rows = parseCSV(raw);

  const products = rows.map(r => {
    const p = {
      reg_date:       r[0],
      name:           r[1],
      views:          Math.round(num(r[2])),
      cart_count:     Math.round(num(r[3])),
      purchase_count: Math.round(num(r[4])),
      cart_rate:      num(r[5]),
      purchase_rate:  num(r[6]),
      total_rate:     num(r[7]),
      sales:          Math.round(num(r[8])),
      dwell:          Math.round(num(r[9])),
      stock:          r[10] !== undefined ? Math.round(num(r[10])) : null,
    };
    const sp = scorePurchaseRate(p.purchase_rate);
    const sc = scoreCartRate(p.cart_rate);
    const sv = scoreViews(p.views);
    const ss = scoreSales(p.sales);
    const sd = scoreDwell(p.dwell);
    p.score_purchase  = sp;
    p.score_cart      = sc;
    p.score_views     = sv;
    p.score_sales     = ss;
    p.score_dwell     = sd;
    p.hero_score      = sp + sc + sv + ss + sd;
    p.tier            = getTier(p.hero_score);
    p.status          = getStatus(p);
    [p.priority, p.priority_reason] = getPriority(p);
    p.actions         = getActions(p);
    p.effects         = getEffects(p);
    return p;
  }).filter(p => p.name);

  products.sort((a, b) => b.hero_score - a.hero_score);

  // ─── 등급별 분류 ─────────────────────────────────────────────────
  const tierMap = {
    '⭐ HERO': [], '🔼 성장 가능': [], '➡️ 관찰 필요': [], '🔽 개선 필요': [],
  };
  products.forEach(p => tierMap[p.tier].push(p));

  // ─── 리포트 생성 ──────────────────────────────────────────────────
  const today = new Date().toISOString().split('T')[0];
  const lines = [];

  lines.push(
    '# 아뜨랑스 신상품 반응 분석 — 히어로 점수 리포트',
    '',
    `> 분석 기준일: ${today}  `,
    `> 분석 대상: ${products.length}개 상품  `,
    '> 점수 체계: 100점 만점 (구매 비율 30pt + 장바구니 비율 20pt + 조회수 20pt + 판매금액 20pt + 체류시간 10pt)',
    '',
    '---',
    '',
    '## 채점 기준',
    '',
    '| 지표 | 배점 | 구간별 점수 |',
    '|------|------|------------|',
    '| 구매 비율 | 30점 | 5%↑: 30 / 3–5%: 24 / 2–3%: 18 / 1–2%: 12 / 0.5–1%: 6 / 0.5%↓: 0 |',
    '| 장바구니 비율 | 20점 | 20%↑: 20 / 15–20%: 16 / 10–15%: 12 / 5–10%: 8 / 2–5%: 4 / 2%↓: 0 |',
    '| 조회수 | 20점 | 2,000↑: 20 / 1,000–2,000: 16 / 500–1,000: 12 / 200–500: 8 / 50–200: 4 / 50↓: 0 |',
    '| 판매금액 | 20점 | 200만↑: 20 / 100–200만: 16 / 50–100만: 12 / 20–50만: 8 / 5–20만: 4 / 5만↓: 0 |',
    '| 평균 체류시간 | 10점 | 55초↑: 10 / 45–55초: 8 / 38–45초: 6 / 30–38초: 4 / 20–30초: 2 / 20초↓: 0 |',
    '',
    '| 점수 구간 | 등급 | 운영 방향 |',
    '|----------|------|---------|',
    '| 80 – 100점 | ⭐ HERO | 광고·메인 집중 투자. 전사 핵심 상품 |',
    '| 60 – 79점 | 🔼 성장 가능 | 약점 보완 시 HERO 달성 가능. 집중 육성 |',
    '| 40 – 59점 | ➡️ 관찰 필요 | 원인 분석 후 선별 개선 |',
    '| 0 – 39점 | 🔽 개선 필요 | 상품 재검토 또는 소진 정리 |',
    '',
    '---',
    '',
    '## 전체 점수 요약',
    '',
    '| 등급 | 상품 수 | 대표 상품 |',
    '|------|--------|----------|',
  );

  for (const [tier, pl] of Object.entries(tierMap)) {
    const top = pl[0] ? `${pl[0].name} 외 ${Math.max(0, pl.length - 1)}개` : '-';
    lines.push(`| ${tier} | ${pl.length}개 | ${top} |`);
  }

  lines.push(
    '',
    '### 전체 상품 점수 일람 (점수 내림차순)',
    '',
    '| # | 상품 | 구매비율 | 장바구니비율 | 조회수 | 판매금액 | 체류시간 | 히어로 점수 | 등급 |',
    '|---|------|---------|------------|-------|--------|--------|-----------|------|',
  );

  products.forEach((p, i) => {
    lines.push(
      `| ${i + 1} | ${p.name} | ${p.score_purchase}pt (${p.purchase_rate}%) | ` +
      `${p.score_cart}pt (${p.cart_rate}%) | ` +
      `${p.score_views}pt (${p.views.toLocaleString()}) | ` +
      `${p.score_sales}pt (${p.sales.toLocaleString()}원) | ` +
      `${p.score_dwell}pt (${p.dwell}초) | ` +
      `**${p.hero_score}점** | ${p.tier} |`
    );
  });

  lines.push('', '---', '');

  // 등급별 상세
  const tierOrder = ['⭐ HERO', '🔼 성장 가능', '➡️ 관찰 필요', '🔽 개선 필요'];
  for (const tier of tierOrder) {
    const pl = tierMap[tier];
    lines.push(`## ${tier} — ${pl.length}개 상품`, '');
    if (!pl.length) { lines.push('해당 등급 상품 없음', '', '---', ''); continue; }

    for (const p of pl) {
      lines.push(
        `### ${p.name}`,
        '',
        '| 히어로 점수 | 등급 | 등록일 |',
        '|------------|------|-------|',
        `| **${p.hero_score}점 / 100점** | ${p.tier} | ${p.reg_date} |`,
        '',
        '**점수 세부 내역**',
        '',
        '| 지표 | 점수 | 원본 수치 |',
        '|------|------|---------|',
        `| 구매 비율 | ${p.score_purchase}pt / 30pt | ${p.purchase_rate}% (${p.purchase_count}건) |`,
        `| 장바구니 비율 | ${p.score_cart}pt / 20pt | ${p.cart_rate}% (${p.cart_count}개) |`,
        `| 조회수 | ${p.score_views}pt / 20pt | ${p.views.toLocaleString()}회 |`,
        `| 판매금액 | ${p.score_sales}pt / 20pt | ${p.sales.toLocaleString()}원 |`,
        `| 평균 체류시간 | ${p.score_dwell}pt / 10pt | ${p.dwell}초 |`,
        `| **합계** | **${p.hero_score}pt / 100pt** | — |`,
        `| 재고 | — | ${p.stock !== null ? p.stock + '개' : '데이터 없음'} |`,
        '',
        '**상품 상태**',
        '',
        p.status,
        '',
        `**우선순위** ${p.priority}`,
        '',
        `사유: ${p.priority_reason}`,
        '',
        '**추천 운영 액션**',
        '',
      );
      p.actions.forEach((act, i) => lines.push(`${i + 1}. ${act}`));
      lines.push('', '**기대 효과**', '');
      p.effects.forEach(eff => lines.push(`- ${eff}`));
      lines.push('', '---', '');
    }
  }

  // 종합 액션 우선순위
  const urgent = products.filter(p => p.priority === '🔴 긴급');
  const high   = products.filter(p => p.priority === '🟠 높음');

  lines.push(
    '## 종합 액션 우선순위',
    '',
    '### 🔴 긴급 처리 필요',
    '',
    '| 상품 | 점수 | 등급 | 긴급 사유 | 즉시 액션 |',
    '|------|------|------|---------|---------|',
  );
  urgent.forEach(p => {
    const act = p.actions[0].replace(/\[ACT-\d+\] \*\*(.+?)\*\*.*/, '$1');
    lines.push(`| ${p.name} | ${p.hero_score}점 | ${p.tier} | ${p.priority_reason} | ${act} |`);
  });

  lines.push(
    '',
    '### 🟠 이번 주 내 실행 권장',
    '',
    '| 상품 | 점수 | 등급 | 우선 액션 |',
    '|------|------|------|---------|',
  );
  high.forEach(p => {
    const act = p.actions[0].replace(/\[ACT-\d+\] \*\*(.+?)\*\*.*/, '$1');
    lines.push(`| ${p.name} | ${p.hero_score}점 | ${p.tier} | ${act} |`);
  });

  lines.push(
    '',
    '---',
    '',
    `*리포트 생성: 아뜨랑스 MD AI 분석 시스템 v2.0 — 히어로 점수 시스템*`,
  );

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, lines.join('\n'), 'utf-8');

  // 콘솔 출력
  console.log(`\n${'='.repeat(55)}`);
  console.log(' 아뜨랑스 신상품 반응 분석 완료');
  console.log('='.repeat(55));
  console.log(` 분석 상품: ${products.length}개`);
  console.log(` ⭐ HERO      : ${tierMap['⭐ HERO'].length}개`);
  console.log(` 🔼 성장 가능  : ${tierMap['🔼 성장 가능'].length}개`);
  console.log(` ➡️ 관찰 필요  : ${tierMap['➡️ 관찰 필요'].length}개`);
  console.log(` 🔽 개선 필요  : ${tierMap['🔽 개선 필요'].length}개`);
  console.log('='.repeat(55));
  console.log(' TOP 5 히어로 점수:');
  products.slice(0, 5).forEach(p => {
    console.log(`   ${p.name.padEnd(12)} ${String(p.hero_score).padStart(3)}점  ${p.tier}`);
  });
  console.log('='.repeat(55));
  console.log(` 리포트 저장 완료: reports/newgoods-report.md`);

  // dashboard.js 자동 생성
  const todayLabel = new Date().toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' });
  const rawEntries = products.map(p => {
    const pad = (v, w=4) => String(v).padStart(w);
    return `  { reg_date:'${p.reg_date}', name:'${p.name}',` +
      ` views:${pad(p.views)},  cart_count:${pad(p.cart_count)},  purchase_count:${pad(p.purchase_count)},` +
      `  cart_rate:${String(p.cart_rate).padStart(5)},  purchase_rate:${String(p.purchase_rate).padStart(4)},` +
      ` total_rate:${String(p.total_rate).padStart(5)},  sales:${pad(p.sales, 8)},   dwell:${pad(p.dwell, 2)}, stock:${pad(p.stock, 3)}  }`;
  }).join(',\n');

  const dashboardContent = `// ─── 원본 데이터 (판매중 + 진열 필터 적용, ${todayLabel} 기준) ──────────
const RAW = [
${rawEntries}
];
`;

  // dashboard.js에서 RAW 배열 부분만 교체 (indexOf 방식으로 안정적으로 교체)
  let dashSrc = fs.readFileSync(DASHBOARD_PATH, 'utf-8');
  const rawStart = dashSrc.indexOf('const RAW = [');
  const rawEnd   = dashSrc.indexOf('];', rawStart) + 2;
  if (rawStart !== -1 && rawEnd > rawStart) {
    // 헤더 주석 라인도 포함해 교체 (RAW 시작 직전 줄까지)
    const beforeRaw = dashSrc.lastIndexOf('\n', rawStart - 1);
    const headerStart = dashSrc.lastIndexOf('\n', beforeRaw - 1) + 1;
    dashSrc = dashSrc.slice(0, headerStart) + dashboardContent + dashSrc.slice(rawEnd);
  }
  // 조회기간 날짜 표기 (meta.json의 시작일 ~ 오늘)
  const now = new Date();
  const yy = now.getFullYear();
  const mm = now.getMonth() + 1;
  const dd = now.getDate();
  const todayFmt = `${yy}.${mm}.${dd}`;
  let periodLabel = `${todayFmt} 기준`;
  try {
    const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf-8'));
    if (meta.periodStart) {
      periodLabel = `${meta.periodStart} ~ ${todayFmt}`;
    }
  } catch (_) {}
  dashSrc = dashSrc.replace(
    /document\.getElementById\('analysis-date'\)\.textContent\s*=\s*'조회기간:[^']*';/,
    `document.getElementById('analysis-date').textContent = '조회기간: ${periodLabel}';`
  );
  fs.writeFileSync(DASHBOARD_PATH, dashSrc, 'utf-8');
  console.log(` dashboard.js 업데이트 완료: ${products.length}개 상품 (${periodLabel})`);
}

main();
