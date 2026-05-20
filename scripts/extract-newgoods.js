/**
 * 아뜨랑스 자사몰 신상품 반응도 데이터 자동 추출
 * https://at.snfg.kr/sho/index.php?code=newGoodsResponse
 *
 * 실행: node scripts/extract-newgoods.js
 * 브라우저 표시: HEADLESS=false node scripts/extract-newgoods.js
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// ─── 설정 ────────────────────────────────────────────────────────
const TARGET_URL  = 'https://at.snfg.kr/sho/index.php?code=newGoodsResponse';
const LOGIN_ID    = process.env.SNFG_ID || '';
const LOGIN_PW    = process.env.SNFG_PW || '';
const HEADLESS    = process.env.HEADLESS !== 'false';
const COOKIE_FILE = path.join(__dirname, '..', '.session-cookies.json');
const OUT_CSV     = path.join(__dirname, '..', 'data', 'newgoods-data.csv');
const OUT_META    = path.join(__dirname, '..', 'data', 'meta.json');
const DEBUG_SHOT  = path.join(__dirname, '..', 'debug-screenshot.png');

const CSV_HEADER = '상품등록일,상품명,조회수,장바구니 수,구매 수,장바구니 비율,구매 비율,총 비율,판매금액,평균 체류시간(초),재고,이미지URL';

// 컬럼 헤더 텍스트 → 필드명 매핑 (부분 일치)
const COL_PATTERNS = [
  { patterns: ['이미지URL'],                    field: 'thumb_url' },
  { patterns: ['등록일', '등록 일'],           field: 'reg_date' },
  { patterns: ['상품명', '상품 명', '상품코드', '상품 코드', '코드'], field: 'name' },
  { patterns: ['조회수', '조회 수', '조회'],    field: 'views' },
  { patterns: ['장바구니 수', '장바구니수'],     field: 'cart_count' },
  { patterns: ['구매 수', '구매수'],            field: 'purchase_count' },
  { patterns: ['장바구니 비율', '장바구니비율', '방바구니'], field: 'cart_rate' },
  { patterns: ['구매 비율', '구매비율'],         field: 'purchase_rate' },
  { patterns: ['총 비율', '총비율'],             field: 'total_rate' },
  { patterns: ['판매금액', '판매 금액'],         field: 'sales' },
  { patterns: ['체류시간', '체류 시간'],         field: 'dwell' },
  { patterns: ['총 재고', '재고'],              field: 'stock' },
];

// ─── 헬퍼 ────────────────────────────────────────────────────────
function log(msg)  { console.log(`[extract] ${msg}`); }
function err(msg)  { console.error(`[extract] ❌ ${msg}`); }
function ok(msg)   { console.log(`[extract] ✅ ${msg}`); }

function matchField(header) {
  const h = header.replace(/\s+/g, ' ').trim();
  for (const { patterns, field } of COL_PATTERNS) {
    if (patterns.some(p => h.includes(p))) return field;
  }
  return null;
}

function cleanNum(s) {
  return s.replace(/,/g, '').replace(/[원초%]/g, '').trim();
}

function escapeCsv(s) {
  if (!s) return '';
  const str = String(s).replace(/\r?\n/g, ' ');
  return str.includes(',') || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
}

// ─── 필터 설정 (판매중 + 진열) ───────────────────────────────────
async function setFilters(page) {
  log('필터 설정: 판매중 + 진열');
  try {
    // 판매상태 = 판매중
    const saleRow = page.locator('tr').filter({ has: page.locator('th', { hasText: '판매중' }) }).first();
    await saleRow.locator('select').selectOption('판매중');

    // 진열여부 = 진열
    const displayRow = page.locator('tr').filter({ has: page.locator('th', { hasText: '진열 여부' }) }).first();
    await displayRow.locator('select').selectOption('진열');

    // 검색 버튼 클릭 (필터 폼의 검색 버튼, 상단 통합검색과 구분)
    await page.getByRole('button', { name: '검색', exact: true }).click();
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForSelector('table tbody tr', { timeout: 10000 });

    ok('필터 적용 완료 (판매중 + 진열)');
  } catch (e) {
    log(`⚠️ 필터 설정 실패: ${e.message} — 기본 데이터로 진행`);
  }
}

// ─── 쿠키 로드/저장 ──────────────────────────────────────────────
function loadCookies() {
  try {
    if (fs.existsSync(COOKIE_FILE)) {
      return JSON.parse(fs.readFileSync(COOKIE_FILE, 'utf-8'));
    }
  } catch (_) {}
  return null;
}

function saveCookies(cookies) {
  fs.writeFileSync(COOKIE_FILE, JSON.stringify(cookies, null, 2), 'utf-8');
}

// ─── 로그인 처리 ──────────────────────────────────────────────────
async function tryLogin(page) {
  // 패스워드 인풋 존재 여부로 로그인 페이지 판단
  const pwInput = page.locator('input[type="password"]').first();
  const needLogin = await pwInput.isVisible({ timeout: 4000 }).catch(() => false);
  if (!needLogin) return true; // 이미 로그인된 상태

  log('로그인 페이지 감지됨');

  // 크레덴셜 없으면 수동 로그인 안내
  if (!LOGIN_ID || !LOGIN_PW) {
    if (HEADLESS) {
      err('.env 파일에 SNFG_ID / SNFG_PW를 설정하거나,\n         HEADLESS=false 로 실행해서 수동 로그인하세요.');
      return false;
    }
    log('브라우저에서 직접 로그인하세요. 로그인 완료 후 자동으로 계속됩니다...');
    // 로그인 완료 감지: 테이블 또는 대시보드 요소가 나타날 때까지 대기
    await page.waitForSelector('table, .dashboard, #content', { timeout: 120000 });
    log('로그인 완료 감지');
    return true;
  }

  // 자동 로그인
  log('자동 로그인 시도 중...');

  // ID 필드 탐색 (name, placeholder, type 기준)
  const idSelectors = [
    'input[name*="id"]',
    'input[name*="user"]',
    'input[name*="login"]',
    'input[name*="admin"]',
    'input[type="text"]:visible',
  ];
  let idInput = null;
  for (const sel of idSelectors) {
    const el = page.locator(sel).first();
    if (await el.isVisible({ timeout: 1000 }).catch(() => false)) {
      idInput = el;
      break;
    }
  }

  if (!idInput) {
    err('로그인 ID 입력창을 찾지 못했습니다. HEADLESS=false 로 실행 후 수동 로그인하세요.');
    return false;
  }

  await idInput.fill(LOGIN_ID);
  await pwInput.fill(LOGIN_PW);

  // 로그인 버튼 또는 엔터
  const loginBtn = page.locator('button[type="submit"], input[type="submit"], .btn-login, .login-btn').first();
  if (await loginBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
    await loginBtn.click();
  } else {
    await page.keyboard.press('Enter');
  }

  await page.waitForNavigation({ timeout: 15000 }).catch(() => {});

  // 로그인 후 타겟 페이지로 복귀
  if (!page.url().includes('newGoodsResponse')) {
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 20000 });
  }

  // 로그인 실패 체크
  const stillLogin = await page.locator('input[type="password"]').isVisible({ timeout: 2000 }).catch(() => false);
  if (stillLogin) {
    err('로그인 실패. 아이디/비밀번호를 확인하세요.');
    return false;
  }

  ok('자동 로그인 완료');
  return true;
}

// ─── 테이블 추출 ──────────────────────────────────────────────────
async function extractTable(page) {
  // 테이블 로드 대기 (AJAX 고려)
  await page.waitForSelector('table', { timeout: 20000 });

  // 추가 로드 대기
  await page.waitForLoadState('networkidle').catch(() => {});

  const data = await page.evaluate(() => {
    // 가장 데이터가 많은 테이블 선택
    let targetTable = null;
    let maxDataCells = 0;

    document.querySelectorAll('table').forEach(t => {
      const cells = t.querySelectorAll('td').length;
      if (cells > maxDataCells) {
        maxDataCells = cells;
        targetTable = t;
      }
    });

    if (!targetTable) return null;

    // 헤더 추출 (thead > th 또는 첫 번째 tr)
    let headerRow = targetTable.querySelector('thead tr');
    if (!headerRow) headerRow = targetTable.querySelector('tr');
    const headers = Array.from(headerRow?.querySelectorAll('th, td') || [])
      .map(c => c.textContent.trim().replace(/\s+/g, ' '));
    headers.push('이미지URL'); // 썸네일 컬럼 추가

    // 데이터 행 추출
    const bodyRows = targetTable.querySelectorAll('tbody tr') ||
                     Array.from(targetTable.querySelectorAll('tr')).slice(1);

    const rows = Array.from(bodyRows)
      .map(tr => {
        const tds = Array.from(tr.querySelectorAll('td'));
        const rowData = tds.map(td => td.textContent.trim().replace(/\s+/g, ' '));
        const img = tr.querySelector('img');
        rowData.push(img ? img.src : '');
        return rowData;
      })
      .filter(row => row.length > 1 && row.some(c => c !== ''));

    return { headers, rows };
  });

  return data;
}

// ─── CSV 변환 ─────────────────────────────────────────────────────
function buildCsv(data) {
  // 헤더 → 필드 인덱스 매핑
  const fieldIdx = {};
  data.headers.forEach((h, i) => {
    const field = matchField(h);
    if (field && !(field in fieldIdx)) fieldIdx[field] = i;
  });

  const required = ['reg_date', 'name', 'views', 'cart_count', 'purchase_count',
                    'cart_rate', 'purchase_rate', 'total_rate', 'sales', 'dwell'];
  const missing = required.filter(f => !(f in fieldIdx));

  if (missing.length > 0) {
    log(`⚠️  매핑 안 된 컬럼: ${missing.join(', ')}`);
    log(`    페이지 헤더: ${data.headers.join(' | ')}`);
  }

  const get = (row, field) => {
    const i = fieldIdx[field];
    return i !== undefined ? (row[i] || '') : '';
  };

  const lines = [CSV_HEADER];
  data.rows.forEach(row => {
    const sales = cleanNum(get(row, 'sales'));
    const dwell = cleanNum(get(row, 'dwell'));
    lines.push([
      escapeCsv(get(row, 'reg_date')),
      escapeCsv(get(row, 'name')),
      cleanNum(get(row, 'views')),
      cleanNum(get(row, 'cart_count')),
      cleanNum(get(row, 'purchase_count')),
      get(row, 'cart_rate').replace(/[%\s]/g, ''),
      get(row, 'purchase_rate').replace(/[%\s]/g, ''),
      get(row, 'total_rate').replace(/[%\s]/g, ''),
      sales ? `"${sales}"` : '0',
      dwell || '0',
      cleanNum(get(row, 'stock')) || '0',
      escapeCsv(get(row, 'thumb_url')),
    ].join(','));
  });

  return lines.join('\n');
}

// ─── 메인 ─────────────────────────────────────────────────────────
async function main() {
  console.log('\n' + '='.repeat(55));
  console.log(' 아뜨랑스 신상품 반응도 데이터 추출 시작');
  console.log('='.repeat(55));

  const browser = await chromium.launch({
    headless: HEADLESS,
    args: ['--lang=ko-KR'],
  });

  const context = await browser.newContext({
    locale: 'ko-KR',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  });

  // 저장된 쿠키 복원
  const savedCookies = loadCookies();
  if (savedCookies) {
    await context.addCookies(savedCookies);
    log('이전 세션 쿠키 로드됨');
  }

  const page = await context.newPage();

  try {
    log(`접속 중: ${TARGET_URL}`);
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // 로그인 처리
    const loggedIn = await tryLogin(page);
    if (!loggedIn) {
      await page.screenshot({ path: DEBUG_SHOT });
      err(`디버그 스크린샷 저장: ${DEBUG_SHOT}`);
      await browser.close();
      process.exit(1);
    }

    // 쿠키 저장 (다음 실행을 위해)
    const cookies = await context.cookies();
    saveCookies(cookies);
    log('세션 쿠키 저장 완료');

    // 필터 적용: 판매중 + 진열
    await setFilters(page);

    // 테이블 추출
    log('데이터 추출 중...');
    const data = await extractTable(page);

    if (!data || data.rows.length === 0) {
      await page.screenshot({ path: DEBUG_SHOT });
      err(`테이블 데이터를 찾지 못했습니다. ${DEBUG_SHOT} 확인`);
      await browser.close();
      process.exit(1);
    }

    log(`헤더: ${data.headers.join(' | ')}`);
    log(`추출된 행: ${data.rows.length}개`);

    // 사이트 조회기간 캡처 (sdate/edate input 값 직접 읽기)
    const today = new Date();
    const todayStr = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`;
    const periodInfo = await page.evaluate(() => {
      const sdate = document.querySelector('input[name="sdate"]')?.value || '';
      const edate = document.querySelector('input[name="edate"]')?.value || '';
      const fmt = s => {
        const [y, m, d] = s.split('-');
        return y && m && d ? `${y}.${parseInt(m)}.${parseInt(d)}` : null;
      };
      return { start: fmt(sdate), end: fmt(edate) };
    });
    let prevProducts = [];
    if (fs.existsSync(OUT_CSV)) {
      const oldCsv = fs.readFileSync(OUT_CSV, 'utf-8').trim().split('\n');
      for (let i = 1; i < oldCsv.length; i++) {
        const cols = oldCsv[i].split(',');
        if (cols.length > 1) prevProducts.push(cols[1].replace(/"/g, '').trim());
      }
    }

    const meta = {
      extractedAt: todayStr,
      periodStart: periodInfo?.start || null,
      periodEnd: todayStr,
      prevProducts
    };
    fs.mkdirSync(path.dirname(OUT_META), { recursive: true });
    fs.writeFileSync(OUT_META, JSON.stringify(meta, null, 2), 'utf-8');
    log(`조회기간 캡처: ${meta.periodStart ? meta.periodStart + ' ~ ' + meta.periodEnd : '시작일 미확인, ' + meta.periodEnd + ' 기준'}`);

    // CSV 저장
    const csv = buildCsv(data);
    fs.mkdirSync(path.dirname(OUT_CSV), { recursive: true });
    fs.writeFileSync(OUT_CSV, csv, 'utf-8');

    console.log('\n' + '='.repeat(55));
    ok(`추출 완료: ${data.rows.length}개 상품`);
    ok(`저장: data/newgoods-data.csv`);
    console.log('='.repeat(55) + '\n');

  } catch (e) {
    await page.screenshot({ path: DEBUG_SHOT }).catch(() => {});
    err(e.message);
    err(`디버그 스크린샷: ${DEBUG_SHOT}`);
    await browser.close();
    process.exit(1);
  }

  await browser.close();
}

main();
