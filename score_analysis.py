#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
아뜨랑스 신상품 반응 분석 — 히어로 점수 시스템
"""

import csv
from datetime import datetime

# ─── 채점 함수 ────────────────────────────────────────────────────

def parse_num(s):
    if not s or str(s).strip() in ('', '-'):
        return 0.0
    return float(str(s).replace(',', '').strip())

def score_purchase_rate(r):
    if r >= 5:    return 30
    if r >= 3:    return 24
    if r >= 2:    return 18
    if r >= 1:    return 12
    if r >= 0.5:  return 6
    return 0

def score_cart_rate(r):
    if r >= 20: return 20
    if r >= 15: return 16
    if r >= 10: return 12
    if r >= 5:  return 8
    if r >= 2:  return 4
    return 0

def score_views(v):
    if v >= 2000: return 20
    if v >= 1000: return 16
    if v >= 500:  return 12
    if v >= 200:  return 8
    if v >= 50:   return 4
    return 0

def score_sales(a):
    if a >= 2_000_000: return 20
    if a >= 1_000_000: return 16
    if a >= 500_000:   return 12
    if a >= 200_000:   return 8
    if a >= 50_000:    return 4
    return 0

def score_dwell(s):
    if s >= 55: return 10
    if s >= 45: return 8
    if s >= 38: return 6
    if s >= 30: return 4
    if s >= 20: return 2
    return 0

def get_tier(score):
    if score >= 80: return "⭐ HERO"
    if score >= 60: return "🔼 성장 가능"
    if score >= 40: return "➡️ 관찰 필요"
    return "🔽 개선 필요"

# ─── 상품 상태 요약 ───────────────────────────────────────────────

def get_status(p):
    v  = p['views'];  cr = p['cart_rate'];  pr = p['purchase_rate']
    dw = p['dwell'];  sl = p['sales'];       pc = p['purchase_count']
    cc = p['cart_count'];  sc = p['hero_score']
    ab = cc - pc

    if sc >= 80:
        return (f"전 지표 우수. 조회 {v:,}회 · 구매 비율 {pr}% · 판매금액 {sl:,}원. "
                f"현재 최상위 퍼포먼스. 광고/메인 집중 투자 시 매출 극대화 가능.")
    if pr >= 3 and v < 500:
        return (f"구매 비율 {pr}%로 전환력 압도적이나 조회수 {v:,}회에 불과. "
                f"노출 부족으로 매출이 극히 제한된 상태. 광고 집행 즉시 폭발적 성장 가능.")
    if cr >= 15 and pr < 2:
        return (f"장바구니 비율 {cr}%로 관심도 높으나 구매 비율 {pr}%로 낮음. "
                f"이탈 {ab}명이 결제 직전에 멈춘 상태. 가격·배송·신뢰 요소 보완이 핵심.")
    if dw >= 45 and pr < 2:
        return (f"체류시간 {dw}초로 상세를 충분히 열람 중이나 구매 비율 {pr}%로 낮음. "
                f"상세페이지 설득력 강화가 필요한 상태.")
    if v >= 300 and pc == 0:
        return (f"조회수 {v:,}회로 유입은 있으나 구매 0건. "
                f"전환을 막는 근본 원인 즉각 파악 필요.")
    if sc >= 60:
        return (f"조회수 {v:,}회 · 구매 비율 {pr}% · 판매금액 {sl:,}원으로 준수한 성과. "
                f"약점 지표 보완 시 HERO 등급 달성 가능.")
    if sc >= 40:
        return (f"전반적 평균 수준. 조회수 {v:,}회 · 구매 비율 {pr}%로 개선 여지 있음. "
                f"원인 파악 후 집중 운영 필요.")
    return (f"주요 지표 전반 저조. 조회수 {v:,}회 · 구매 비율 {pr}% · 판매금액 {sl:,}원. "
            f"상품 재검토 또는 리뉴얼 검토 필요.")

# ─── 우선순위 ─────────────────────────────────────────────────────

def get_priority(p):
    v  = p['views'];  pr = p['purchase_rate'];  cr = p['cart_rate']
    dw = p['dwell'];  pc = p['purchase_count']; sc = p['hero_score']
    cc = p['cart_count'];  ab = cc - pc

    if v >= 200 and pc == 0 and dw >= 38:
        return "🔴 긴급", "조회 충분·체류 정상이나 구매 0건 — 상세페이지 즉시 점검"
    if pr >= 3 and v < 300:
        return "🔴 긴급", "고전환율 상품 저노출 — 광고 예산 즉시 투입 필요"
    if ab >= 80:
        return "🔴 긴급", f"장바구니 이탈 {ab}명 — 즉각 푸시로 매출 회수 가능"
    if sc >= 80:
        return "🟠 높음", "HERO 상품 — 광고·메인 노출 극대화로 매출 최대화"
    if sc >= 60:
        return "🟠 높음", "성장 가능 상품 — 이번 주 내 집중 육성 액션 실행 권장"
    if v >= 100 and pc == 0:
        return "🟠 높음", "유입 있으나 전환 전무 — 원인 파악 후 즉시 개선"
    if sc >= 40:
        return "🟡 보통", "평균 수준 유지 중 — 주간 모니터링 지속"
    return "🟢 유지/정리", "저반응 상품 — 재고 정리 또는 리뉴얼 검토"

# ─── 추천 액션 ───────────────────────────────────────────────────

def get_actions(p):
    v  = p['views'];  cc = p['cart_count'];  pc = p['purchase_count']
    cr = p['cart_rate'];  pr = p['purchase_rate'];  tr = p['total_rate']
    dw = p['dwell'];  sl = p['sales'];       sc = p['hero_score']
    ab = cc - pc

    acts = []

    # ACT-01 광고 확대
    if pr >= 2 and v < 500:
        acts.append("[ACT-01] **광고 확대** — 구매 전환율 우수 대비 노출 부족. 상품 광고 즉시 집행, 유사 카테고리 타겟팅 설정")

    # ACT-02 광고 중단
    if v >= 300 and pc == 0 and cr < 3:
        acts.append("[ACT-02] **광고 중단 검토** — 조회 대비 전환 전무. 집행 중인 광고 일시 중단 후 원인 파악 선행")

    # ACT-03 메인 노출
    if tr >= 18 or sc >= 80:
        acts.append("[ACT-03] **메인 노출** — 총 반응률 우수. 자사몰 메인 추천 슬롯 우선 배치 (최소 1주일)")

    # ACT-04 푸시
    if ab >= 30 and pr < 2:
        acts.append(f"[ACT-04] **푸시 발송** — 장바구니 이탈 {ab}명 대상. '오늘만 무료배송' 또는 '한정 할인' 즉시 발송")
    elif cr >= 10 and pr < 2:
        acts.append("[ACT-04] **푸시 발송** — 장바구니 전환 대비 구매 전환 낮음. 이탈 고객 리마인드 푸시 집행")

    # ACT-05 리뷰 확보
    if cr >= 8 and pr < 1.5:
        acts.append("[ACT-05] **리뷰 확보** — 기존 구매자 대상 리뷰 작성 쿠폰 즉시 발송. 신뢰도 강화로 신규 구매 전환 향상")

    # ACT-06 상세페이지 수정
    if dw >= 42 and pr < 2:
        acts.append("[ACT-06] **상세페이지 수정** — 높은 체류 대비 구매 전환 낮음. 착용 영상·실측 사이즈·핵심 구매 포인트 상단 배치")
    elif v >= 300 and pc == 0:
        acts.append("[ACT-06] **상세페이지 전면 수정** — 구매 0건. 첫 이미지·가격 정당성·사이즈 정보 전면 재검토 필요")

    # ACT-07 가격 점검
    if cc >= 20 and pc > 0 and (pc / cc) < 0.15:
        acts.append(f"[ACT-07] **가격 점검** — 장바구니→구매 전환율 {int(pc/cc*100)}%. 경쟁 상품 대비 가격 포지셔닝 재검토")
    elif cc >= 5 and pc == 0:
        acts.append("[ACT-07] **가격 점검** — 장바구니 후 전원 이탈. 가격 부담 여부 즉시 점검")

    # ACT-08 재고 확보
    if sl >= 500_000 and pc >= 10:
        acts.append("[ACT-08] **재고 확보** — 판매 실적 우수. 품절 방지 위해 재고 수량 즉시 확인 및 발주")

    # ACT-10 코디 연결
    if dw >= 45:
        acts.append("[ACT-10] **코디 상품 연결** — 체류시간 높아 추가 탐색 의향 존재. 하단 코디 상품 배치로 교차 구매 유도")

    # ACT-11 외부몰 확장
    if pr >= 3 and v < 500:
        acts.append("[ACT-11] **외부몰 확장** — 높은 전환율 상품의 노출 채널 다각화. 카카오스타일·에이블리 추가 입점 검토")

    # 기본 액션 (아무것도 해당 없을 때)
    if not acts:
        acts.append("[ACT-09] **긴급 소진 유도** — 저반응 상품. 할인 또는 번들 구성으로 재고 정리 검토")

    return acts

# ─── 기대 효과 ───────────────────────────────────────────────────

def get_effects(p):
    pr = p['purchase_rate'];  v  = p['views']
    cc = p['cart_count'];      pc = p['purchase_count']
    sl = p['sales'];            dw = p['dwell'];  sc = p['hero_score']
    ab = cc - pc

    eff = []

    if pr >= 3 and v < 500:
        exp = int(1000 * pr / 100)
        mult = round(1000 / max(v, 1), 1)
        eff.append(f"광고로 조회수 1,000 달성 시 예상 추가 구매 약 {exp}건 — 현재 대비 {mult}배 노출 확대")

    if ab >= 30:
        recover = max(1, int(ab * 0.2))
        if pc > 0 and sl > 0:
            avg_p = int(sl / pc)
            eff.append(f"이탈 {ab}명 중 20% 전환 시 추가 {recover}건 · 약 {recover * avg_p:,}원 즉각 회수")
        else:
            eff.append(f"이탈 {ab}명 중 20% 전환 시 추가 구매 {recover}건 발생 기대")

    if dw >= 42 and pr < 2:
        eff.append(f"상세페이지 개선 후 높은 체류시간({dw}초)이 구매로 연결 — 전환율 2배 이상 개선 기대")

    if sc >= 80:
        eff.append("HERO 상품 집중 육성 시 전체 매출의 핵심 기여 상품으로 자리매김 가능")

    if not eff:
        if sc >= 60:
            eff.append("집중 운영 시 HERO 등급 달성 가능. 현재 강점 유지 + 약점 지표 보완 병행 권장")
        elif sc >= 40:
            eff.append("원인 파악 후 단계적 개선 시 성장 가능 상품으로 등급 상승 기대")
        else:
            eff.append("근본적 상품 재검토 또는 리뉴얼 후 재론칭 시 성과 개선 가능")

    return eff

# ─── 데이터 로드 ──────────────────────────────────────────────────

products = []
with open('data/newgoods-data.csv', encoding='utf-8') as f:
    reader = csv.reader(f)
    next(reader)  # 헤더 스킵
    for row in reader:
        if len(row) < 10:
            continue
        try:
            p = {
                'reg_date':       row[0].strip(),
                'name':           row[1].strip(),
                'views':          int(parse_num(row[2])),
                'cart_count':     int(parse_num(row[3])),
                'purchase_count': int(parse_num(row[4])),
                'cart_rate':      parse_num(row[5]),
                'purchase_rate':  parse_num(row[6]),
                'total_rate':     parse_num(row[7]),
                'sales':          int(parse_num(row[8])),
                'dwell':          int(parse_num(row[9])),
            }
            if p['name']:
                products.append(p)
        except (ValueError, IndexError):
            continue

# ─── 점수 계산 ───────────────────────────────────────────────────

for p in products:
    sp = score_purchase_rate(p['purchase_rate'])
    sc = score_cart_rate(p['cart_rate'])
    sv = score_views(p['views'])
    ss = score_sales(p['sales'])
    sd = score_dwell(p['dwell'])
    total = sp + sc + sv + ss + sd

    p['score_purchase'] = sp
    p['score_cart']     = sc
    p['score_views']    = sv
    p['score_sales']    = ss
    p['score_dwell']    = sd
    p['hero_score']     = total
    p['tier']           = get_tier(total)
    p['status']         = get_status(p)
    pri, reason         = get_priority(p)
    p['priority']       = pri
    p['priority_reason']= reason
    p['actions']        = get_actions(p)
    p['effects']        = get_effects(p)

products.sort(key=lambda x: x['hero_score'], reverse=True)

# ─── 통계 집계 ───────────────────────────────────────────────────

tier_map = {"⭐ HERO": [], "🔼 성장 가능": [], "➡️ 관찰 필요": [], "🔽 개선 필요": []}
for p in products:
    tier_map[p['tier']].append(p)

# ─── 리포트 생성 ──────────────────────────────────────────────────

today = datetime.now().strftime('%Y-%m-%d')
out = []

# 헤더
out += [
    "# 아뜨랑스 신상품 반응 분석 — 히어로 점수 리포트",
    "",
    f"> 분석 기준일: {today}  ",
    f"> 분석 대상: {len(products)}개 상품  ",
    "> 점수 체계: 100점 만점 (구매 비율 30pt + 장바구니 비율 20pt + 조회수 20pt + 판매금액 20pt + 체류시간 10pt)",
    "",
    "---",
    "",
]

# 채점 기준표
out += [
    "## 채점 기준",
    "",
    "| 지표 | 배점 | 구간별 점수 |",
    "|------|------|------------|",
    "| 구매 비율 | 30점 | 5%↑: 30 / 3–5%: 24 / 2–3%: 18 / 1–2%: 12 / 0.5–1%: 6 / 0.5%↓: 0 |",
    "| 장바구니 비율 | 20점 | 20%↑: 20 / 15–20%: 16 / 10–15%: 12 / 5–10%: 8 / 2–5%: 4 / 2%↓: 0 |",
    "| 조회수 | 20점 | 2,000↑: 20 / 1,000–2,000: 16 / 500–1,000: 12 / 200–500: 8 / 50–200: 4 / 50↓: 0 |",
    "| 판매금액 | 20점 | 200만↑: 20 / 100–200만: 16 / 50–100만: 12 / 20–50만: 8 / 5–20만: 4 / 5만↓: 0 |",
    "| 평균 체류시간 | 10점 | 55초↑: 10 / 45–55초: 8 / 38–45초: 6 / 30–38초: 4 / 20–30초: 2 / 20초↓: 0 |",
    "",
    "| 점수 구간 | 등급 | 의미 |",
    "|----------|------|------|",
    "| 80 – 100점 | ⭐ HERO | 광고·메인 집중 투자. 전사 핵심 상품 |",
    "| 60 – 79점 | 🔼 성장 가능 | 약점 보완 시 HERO 달성 가능. 집중 육성 |",
    "| 40 – 59점 | ➡️ 관찰 필요 | 원인 분석 후 선별 개선 |",
    "| 0 – 39점 | 🔽 개선 필요 | 상품 재검토 또는 소진 정리 |",
    "",
    "---",
    "",
]

# 전체 요약 카운트
out += [
    "## 전체 점수 요약",
    "",
    "| 등급 | 상품 수 | 대표 상품 |",
    "|------|--------|----------|",
]
for tier, pl in tier_map.items():
    top = pl[0]['name'] if pl else "-"
    out.append(f"| {tier} | {len(pl)}개 | {top} 외 {max(0,len(pl)-1)}개 |")

out += [""]

# 전체 상품 점수 테이블
out += [
    "### 전체 상품 점수 일람 (점수 내림차순)",
    "",
    "| # | 상품 | 구매비율 | 장바구니비율 | 조회수 | 판매금액 | 체류시간 | 히어로 점수 | 등급 |",
    "|---|------|---------|------------|-------|--------|--------|-----------|------|",
]
for i, p in enumerate(products, 1):
    out.append(
        f"| {i} | {p['name']} | "
        f"{p['score_purchase']}pt ({p['purchase_rate']}%) | "
        f"{p['score_cart']}pt ({p['cart_rate']}%) | "
        f"{p['score_views']}pt ({p['views']:,}) | "
        f"{p['score_sales']}pt ({p['sales']:,}원) | "
        f"{p['score_dwell']}pt ({p['dwell']}초) | "
        f"**{p['hero_score']}점** | {p['tier']} |"
    )

out += ["", "---", ""]

# 등급별 상세 분석
tier_order = ["⭐ HERO", "🔼 성장 가능", "➡️ 관찰 필요", "🔽 개선 필요"]

for tier in tier_order:
    pl = tier_map[tier]
    out.append(f"## {tier} — {len(pl)}개 상품")
    out.append("")

    if not pl:
        out += ["해당 등급 상품 없음", "", "---", ""]
        continue

    for p in pl:
        out += [
            f"### {p['name']}",
            "",
            f"| 히어로 점수 | 등급 | 등록일 |",
            f"|------------|------|-------|",
            f"| **{p['hero_score']}점 / 100점** | {p['tier']} | {p['reg_date']} |",
            "",
            "**점수 세부 내역**",
            "",
            "| 지표 | 점수 | 원본 수치 |",
            "|------|------|---------|",
            f"| 구매 비율 | {p['score_purchase']}pt / 30pt | {p['purchase_rate']}% ({p['purchase_count']}건) |",
            f"| 장바구니 비율 | {p['score_cart']}pt / 20pt | {p['cart_rate']}% ({p['cart_count']}개) |",
            f"| 조회수 | {p['score_views']}pt / 20pt | {p['views']:,}회 |",
            f"| 판매금액 | {p['score_sales']}pt / 20pt | {p['sales']:,}원 |",
            f"| 평균 체류시간 | {p['score_dwell']}pt / 10pt | {p['dwell']}초 |",
            f"| **합계** | **{p['hero_score']}pt / 100pt** | — |",
            "",
            "**상품 상태**",
            "",
            p['status'],
            "",
            f"**우선순위** {p['priority']}",
            "",
            f"사유: {p['priority_reason']}",
            "",
            "**추천 운영 액션**",
            "",
        ]
        for i, act in enumerate(p['actions'], 1):
            out.append(f"{i}. {act}")
        out += [
            "",
            "**기대 효과**",
            "",
        ]
        for eff in p['effects']:
            out.append(f"- {eff}")
        out += ["", "---", ""]

# 종합 우선순위 요약
urgent = [p for p in products if p['priority'] == "🔴 긴급"]
high   = [p for p in products if p['priority'] == "🟠 높음"]

out += [
    "## 종합 액션 우선순위",
    "",
    "### 🔴 긴급 처리 필요",
    "",
    "| 상품 | 점수 | 긴급 사유 | 즉시 액션 |",
    "|------|------|---------|---------|",
]
for p in urgent:
    first_act = p['actions'][0].split('**')[1] if p['actions'] else "-"
    out.append(f"| {p['name']} | {p['hero_score']}점 | {p['priority_reason']} | {first_act} |")

out += [
    "",
    "### 🟠 이번 주 내 실행 권장",
    "",
    "| 상품 | 점수 | 등급 | 우선 액션 |",
    "|------|------|------|---------|",
]
for p in high:
    first_act = p['actions'][0].split('**')[1] if p['actions'] else "-"
    out.append(f"| {p['name']} | {p['hero_score']}점 | {p['tier']} | {first_act} |")

out += [
    "",
    "---",
    "",
    "*리포트 생성: 아뜨랑스 MD AI 분석 시스템 v2.0 (히어로 점수 시스템 적용)*",
]

# 파일 저장
with open('reports/newgoods-report.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

# 콘솔 출력
print(f"\n{'='*55}")
print(f" 아뜨랑스 신상품 반응 분석 완료")
print(f"{'='*55}")
print(f" 분석 상품: {len(products)}개")
print(f" ⭐ HERO      : {len(tier_map['⭐ HERO'])}개")
print(f" 🔼 성장 가능  : {len(tier_map['🔼 성장 가능'])}개")
print(f" ➡️ 관찰 필요  : {len(tier_map['➡️ 관찰 필요'])}개")
print(f" 🔽 개선 필요  : {len(tier_map['🔽 개선 필요'])}개")
print(f"{'='*55}")
print(f" TOP 5 히어로 점수:")
for p in products[:5]:
    print(f"   {p['name']:10s}  {p['hero_score']:3d}점  {p['tier']}")
print(f"{'='*55}")
print(f" 리포트 저장 완료: reports/newgoods-report.md")
