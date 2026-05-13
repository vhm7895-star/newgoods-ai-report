// ─── 원본 데이터 (판매중 + 진열 필터 적용, 5/13 기준) ──────────
const RAW = [
  { reg_date:'2026-04-21', name:'bk174',      views:  33,  cart_count:  1,  purchase_count:  0,  cart_rate:    3,  purchase_rate:   0, total_rate:    3,  sales:       0,   dwell:66, stock:  0  },
  { reg_date:'2026-03-31', name:'ps5858',     views: 329,  cart_count: 12,  purchase_count:  3,  cart_rate:  3.6,  purchase_rate: 0.9, total_rate:  4.6,  sales:  178500,   dwell:42, stock:302  },
  { reg_date:'2026-03-27', name:'op16364',    views: 455,  cart_count:  4,  purchase_count:  2,  cart_rate:  0.9,  purchase_rate: 0.4, total_rate:  1.3,  sales:   96000,   dwell:35, stock:125  },
  { reg_date:'2026-03-27', name:'bs8738',     views: 105,  cart_count:  2,  purchase_count:  0,  cart_rate:  1.9,  purchase_rate:   0, total_rate:  1.9,  sales:       0,   dwell:24, stock:211  },
  { reg_date:'2026-03-20', name:'ps5853',     views: 363,  cart_count: 32,  purchase_count: 10,  cart_rate:  8.8,  purchase_rate: 2.8, total_rate: 11.6,  sales:  570000,   dwell:42, stock:114  },
  { reg_date:'2026-04-24', name:'ps5889',     views: 774,  cart_count: 37,  purchase_count:  6,  cart_rate:  4.8,  purchase_rate: 0.8, total_rate:  5.6,  sales:  336000,   dwell:41, stock:  0  },
  { reg_date:'2026-04-24', name:'ts5020',     views: 173,  cart_count:  1,  purchase_count:  0,  cart_rate:  0.6,  purchase_rate:   0, total_rate:  0.6,  sales:       0,   dwell:36, stock:  0  },
  { reg_date:'2026-04-23', name:'ps5887',     views:1334,  cart_count: 97,  purchase_count: 15,  cart_rate:  7.3,  purchase_rate: 1.1, total_rate:  8.4,  sales:  720000,   dwell:42, stock:  0  },
  { reg_date:'2026-04-21', name:'cd3673',     views: 910,  cart_count: 24,  purchase_count:  5,  cart_rate:  2.6,  purchase_rate: 0.5, total_rate:  3.2,  sales:  144500,   dwell:41, stock:  0  },
  { reg_date:'2026-04-21', name:'st3084',     views:1129,  cart_count: 40,  purchase_count:  3,  cart_rate:  3.5,  purchase_rate: 0.3, total_rate:  3.8,  sales:  126000,   dwell:47, stock:  0  },
  { reg_date:'2026-04-21', name:'bs8770',     views: 427,  cart_count:  7,  purchase_count:  0,  cart_rate:  1.6,  purchase_rate:   0, total_rate:  1.6,  sales:       0,   dwell:40, stock:  0  },
  { reg_date:'2026-04-21', name:'sk7835',     views: 677,  cart_count: 19,  purchase_count:  3,  cart_rate:  2.8,  purchase_rate: 0.4, total_rate:  3.2,  sales:   89700,   dwell:35, stock:  0  },
  { reg_date:'2026-04-21', name:'nt5541',     views: 315,  cart_count: 10,  purchase_count:  1,  cart_rate:  3.2,  purchase_rate: 0.3, total_rate:  3.5,  sales:   39900,   dwell:34, stock:  0  },
  { reg_date:'2026-04-21', name:'ts5014',     views: 606,  cart_count:  8,  purchase_count:  1,  cart_rate:  1.3,  purchase_rate: 0.2, total_rate:  1.5,  sales:   24900,   dwell:32, stock:  0  },
  { reg_date:'2026-04-21', name:'ps5878',     views:1392,  cart_count: 79,  purchase_count: 21,  cart_rate:  5.7,  purchase_rate: 1.5, total_rate:  7.2,  sales:  693000,   dwell:56, stock:  0  },
  { reg_date:'2026-04-16', name:'bs8762',     views: 781,  cart_count:103,  purchase_count: 12,  cart_rate: 13.2,  purchase_rate: 1.5, total_rate: 14.7,  sales:  321600,   dwell:47, stock: 61  },
  { reg_date:'2026-04-16', name:'op16387',    views:2912,  cart_count:369,  purchase_count: 65,  cart_rate: 12.7,  purchase_rate: 2.2, total_rate: 14.9,  sales: 1859000,   dwell:43, stock: 93  },
  { reg_date:'2026-04-16', name:'ts5005',     views: 747,  cart_count:101,  purchase_count: 24,  cart_rate: 13.5,  purchase_rate: 3.2, total_rate: 16.7,  sales:  523200,   dwell:38, stock:  0  },
  { reg_date:'2026-04-16', name:'ts5003',     views:8220,  cart_count:1288, purchase_count:190,  cart_rate: 15.7,  purchase_rate: 2.3, total_rate:   18,  sales: 4763900,   dwell:42, stock: 14  },
  { reg_date:'2026-04-16', name:'op16385',    views: 529,  cart_count:  6,  purchase_count:  0,  cart_rate:  1.1,  purchase_rate:   0, total_rate:  1.1,  sales:       0,   dwell:37, stock:  0  },
  { reg_date:'2026-04-13', name:'sk7817',     views: 477,  cart_count: 68,  purchase_count: 12,  cart_rate: 14.3,  purchase_rate: 2.5, total_rate: 16.8,  sales:  395700,   dwell:37, stock:  0  },
  { reg_date:'2026-04-07', name:'cd3668',     views: 723,  cart_count:134,  purchase_count: 23,  cart_rate: 18.5,  purchase_rate: 3.2, total_rate: 21.7,  sales:  917700,   dwell:41, stock: 70  },
  { reg_date:'2026-04-07', name:'cd3665',     views:2452,  cart_count:538,  purchase_count:108,  cart_rate: 21.9,  purchase_rate: 4.4, total_rate: 26.3,  sales: 3088800,   dwell:47, stock:112  },
  { reg_date:'2026-04-07', name:'ts4999',     views: 618,  cart_count:  7,  purchase_count:  1,  cart_rate:  1.1,  purchase_rate: 0.2, total_rate:  1.3,  sales:   34000,   dwell:34, stock: 78  },
  { reg_date:'2026-03-31', name:'ps5860',     views: 913,  cart_count:114,  purchase_count: 25,  cart_rate: 12.5,  purchase_rate: 2.7, total_rate: 15.2,  sales:  895000,   dwell:44, stock: 84  },
  { reg_date:'2026-03-27', name:'op16363',    views: 820,  cart_count: 18,  purchase_count:  1,  cart_rate:  2.2,  purchase_rate: 0.1, total_rate:  2.3,  sales:   49500,   dwell:34, stock:237  },
  { reg_date:'2026-03-24', name:'bs8734',     views: 552,  cart_count: 88,  purchase_count: 15,  cart_rate: 15.9,  purchase_rate: 2.7, total_rate: 18.7,  sales:  422500,   dwell:59, stock:198  },
  { reg_date:'2026-01-15', name:'bs8614',     views: 491,  cart_count: 75,  purchase_count: 14,  cart_rate: 15.3,  purchase_rate: 2.9, total_rate: 18.1,  sales:  400400,   dwell:61, stock:256  },
  { reg_date:'2025-04-30', name:'nt5100',     views:  71,  cart_count: 25,  purchase_count:  2,  cart_rate: 35.2,  purchase_rate: 2.8, total_rate:   38,  sales:   56000,   dwell:50, stock: 32  },
  { reg_date:'2025-04-03', name:'jk2990',     views: 260,  cart_count: 27,  purchase_count:  5,  cart_rate: 10.4,  purchase_rate: 1.9, total_rate: 12.3,  sales:  175950,   dwell:33, stock: 28  },
  { reg_date:'2024-04-18', name:'op15739',    views:  34,  cart_count:  0,  purchase_count:  0,  cart_rate:    0,  purchase_rate:   0, total_rate:    0,  sales:       0,   dwell:38, stock:  0  },
  { reg_date:'2023-07-04', name:'ts3812',     views:   7,  cart_count:  0,  purchase_count:  0,  cart_rate:    0,  purchase_rate:   0, total_rate:    0,  sales:       0,   dwell:25, stock:  0  },
  { reg_date:'2023-05-23', name:'bs7655',     views:1614,  cart_count:340,  purchase_count: 42,  cart_rate: 21.1,  purchase_rate: 2.6, total_rate: 23.7,  sales: 1512000,   dwell:40, stock:  4  },
  { reg_date:'2023-05-11', name:'ps4543',     views: 467,  cart_count: 78,  purchase_count: 11,  cart_rate: 16.7,  purchase_rate: 2.4, total_rate: 19.1,  sales:  545600,   dwell:48, stock: 40  },
  { reg_date:'2023-04-26', name:'ps4533',     views:2265,  cart_count:410,  purchase_count:103,  cart_rate: 18.1,  purchase_rate: 4.5, total_rate: 22.6,  sales: 4027700,   dwell:55, stock:536  },
  { reg_date:'2023-04-26', name:'cd2859',     views:  13,  cart_count:  0,  purchase_count:  0,  cart_rate:    0,  purchase_rate:   0, total_rate:    0,  sales:       0,   dwell:13, stock:  0  },
  { reg_date:'2023-04-03', name:'op15138',    views:  27,  cart_count:  0,  purchase_count:  0,  cart_rate:    0,  purchase_rate:   0, total_rate:    0,  sales:       0,   dwell:17, stock:  0  },
  { reg_date:'2023-03-08', name:'ts3692',     views: 620,  cart_count:125,  purchase_count: 27,  cart_rate: 20.2,  purchase_rate: 4.4, total_rate: 24.5,  sales:  669600,   dwell:41, stock: 18  },
  { reg_date:'2026-04-17', name:'ts5012',     views: 387,  cart_count: 11,  purchase_count:  3,  cart_rate:  2.8,  purchase_rate: 0.8, total_rate:  3.6,  sales:   57000,   dwell:39, stock:  0  },
  { reg_date:'2026-04-16', name:'sk7824',     views: 915,  cart_count: 91,  purchase_count: 12,  cart_rate:  9.9,  purchase_rate: 1.3, total_rate: 11.3,  sales:  504000,   dwell:41, stock:  9  },
  { reg_date:'2026-04-16', name:'op16386',    views:2913,  cart_count:126,  purchase_count: 15,  cart_rate:  4.3,  purchase_rate: 0.5, total_rate:  4.8,  sales:  810000,   dwell:35, stock:  0  },
  { reg_date:'2026-04-10', name:'sk7815',     views: 686,  cart_count: 55,  purchase_count: 13,  cart_rate:    8,  purchase_rate: 1.9, total_rate:  9.9,  sales:  442000,   dwell:37, stock:  0  },
  { reg_date:'2026-04-10', name:'ps5864',     views: 417,  cart_count: 43,  purchase_count:  9,  cart_rate: 10.3,  purchase_rate: 2.2, total_rate: 12.5,  sales:  499500,   dwell:44, stock:  0  },
  { reg_date:'2026-04-07', name:'nt5529',     views: 536,  cart_count:127,  purchase_count: 13,  cart_rate: 23.7,  purchase_rate: 2.4, total_rate: 26.1,  sales:  518700,   dwell:40, stock: 78  },
  { reg_date:'2026-04-07', name:'nt5528',     views: 392,  cart_count:117,  purchase_count: 15,  cart_rate: 29.8,  purchase_rate: 3.8, total_rate: 33.7,  sales:  447000,   dwell:48, stock:223  },
  { reg_date:'2026-04-07', name:'nt5524',     views:1331,  cart_count:159,  purchase_count: 37,  cart_rate: 11.9,  purchase_rate: 2.8, total_rate: 14.7,  sales:  915500,   dwell:38, stock: 90  },
  { reg_date:'2026-04-07', name:'nt5523',     views:2202,  cart_count:453,  purchase_count: 79,  cart_rate: 20.6,  purchase_rate: 3.6, total_rate: 24.2,  sales: 1959200,   dwell:34, stock: 21  },
  { reg_date:'2026-04-07', name:'cd3666',     views: 726,  cart_count:111,  purchase_count: 16,  cart_rate: 15.3,  purchase_rate: 2.2, total_rate: 17.5,  sales:  512000,   dwell:43, stock:125  },
  { reg_date:'2026-04-06', name:'sk7810',     views: 323,  cart_count: 26,  purchase_count:  3,  cart_rate:    8,  purchase_rate: 0.9, total_rate:    9,  sales:  178500,   dwell:42, stock:  0  },
  { reg_date:'2026-03-27', name:'ts4995',     views: 931,  cart_count:155,  purchase_count: 37,  cart_rate: 16.6,  purchase_rate:   4, total_rate: 20.6,  sales: 1221000,   dwell:41, stock: 30  },
  { reg_date:'2026-03-20', name:'ps5854',     views: 481,  cart_count: 64,  purchase_count: 10,  cart_rate: 13.3,  purchase_rate: 2.1, total_rate: 15.4,  sales:  528000,   dwell:41, stock:104  },
  { reg_date:'2026-01-06', name:'bs8609',     views:1834,  cart_count:300,  purchase_count: 61,  cart_rate: 16.4,  purchase_rate: 3.3, total_rate: 19.7,  sales: 2409500,   dwell:45, stock:256  },
  { reg_date:'2026-01-06', name:'ts4844',     views: 253,  cart_count: 75,  purchase_count: 12,  cart_rate: 29.6,  purchase_rate: 4.7, total_rate: 34.4,  sales:  378000,   dwell:43, stock: 58  },
  { reg_date:'2025-07-22', name:'bs8379',     views: 136,  cart_count:  5,  purchase_count:  2,  cart_rate:  3.7,  purchase_rate: 1.5, total_rate:  5.1,  sales:  102000,   dwell:36, stock:  0  },
  { reg_date:'2025-05-19', name:'bs8220',     views:  36,  cart_count:  1,  purchase_count:  0,  cart_rate:  2.8,  purchase_rate:   0, total_rate:  2.8,  sales:       0,   dwell:60, stock:  0  },
  { reg_date:'2025-05-12', name:'bs8212',     views:  78,  cart_count:  5,  purchase_count:  2,  cart_rate:  6.4,  purchase_rate: 2.6, total_rate:    9,  sales:  119600,   dwell:45, stock:  0  },
  { reg_date:'2024-07-17', name:'op15829',    views: 105,  cart_count:  3,  purchase_count:  3,  cart_rate:  2.9,  purchase_rate: 2.9, total_rate:  5.7,  sales:  135000,   dwell:62, stock:  0  },
  { reg_date:'2024-06-11', name:'op15785',    views:  86,  cart_count:  3,  purchase_count:  0,  cart_rate:  3.5,  purchase_rate:   0, total_rate:  3.5,  sales:       0,   dwell:47, stock:  0  },
  { reg_date:'2023-05-24', name:'ts3774',     views:2018,  cart_count:476,  purchase_count: 86,  cart_rate: 23.6,  purchase_rate: 4.3, total_rate: 27.8,  sales: 1591000,   dwell:40, stock: 66  },
  { reg_date:'2022-06-03', name:'bs7026',     views: 195,  cart_count: 14,  purchase_count:  9,  cart_rate:  7.2,  purchase_rate: 4.6, total_rate: 11.8,  sales:  200000,   dwell:45, stock:139  },
  { reg_date:'2022-05-13', name:'op13968',    views:  51,  cart_count:  1,  purchase_count:  0,  cart_rate:    2,  purchase_rate:   0, total_rate:    2,  sales:       0,   dwell:19, stock:  0  },
  { reg_date:'2022-05-09', name:'ts3207',     views: 393,  cart_count: 11,  purchase_count:  2,  cart_rate:  2.8,  purchase_rate: 0.5, total_rate:  3.3,  sales:   28800,   dwell:44, stock:  0  },
  { reg_date:'2021-12-17', name:'ps3514',     views: 735,  cart_count:120,  purchase_count: 11,  cart_rate: 16.3,  purchase_rate: 1.5, total_rate: 17.8,  sales:  324500,   dwell:44, stock:  0  },
  { reg_date:'2021-06-28', name:'bs6225',     views: 393,  cart_count:111,  purchase_count: 17,  cart_rate: 28.2,  purchase_rate: 4.3, total_rate: 32.6,  sales:  761600,   dwell:42, stock: 45  },
  { reg_date:'2021-06-15', name:'ts2631',     views:  56,  cart_count:  1,  purchase_count:  6,  cart_rate:  1.8,  purchase_rate:10.7, total_rate: 12.5,  sales:   89000,   dwell:49, stock:  0  },
  { reg_date:'2020-06-05', name:'bs5193',     views: 185,  cart_count: 13,  purchase_count:  5,  cart_rate:    7,  purchase_rate: 2.7, total_rate:  9.7,  sales:   99500,   dwell:42, stock: 64  },
];

// ─── 채점 함수 ───────────────────────────────────────────────────────
const scoreP = r => r>=5?30: r>=3?24: r>=2?18: r>=1?12: r>=0.5?6: 0;
const scoreC = r => r>=20?20: r>=15?16: r>=10?12: r>=5?8: r>=2?4: 0;
const scoreV = v => v>=2000?20: v>=1000?16: v>=500?12: v>=200?8: v>=50?4: 0;
const scoreS = s => s>=2000000?20: s>=1000000?16: s>=500000?12: s>=200000?8: s>=50000?4: 0;
const scoreD = d => d>=55?10: d>=45?8: d>=38?6: d>=30?4: d>=20?2: 0;

function getTier(score) {
  if (score >= 80) return 'HERO';
  if (score >= 60) return '성장 가능';
  if (score >= 40) return '관찰 필요';
  return '개선 필요';
}

function getPriority(p) {
  const ab = p.cart_count - p.purchase_count;
  if (p.views >= 200 && p.purchase_count === 0 && p.dwell >= 38) return '긴급';
  if (p.purchase_rate >= 3 && p.views < 300)   return '긴급';
  if (ab >= 80)                                  return '긴급';
  if (p.hero_score >= 80)  return '높음';
  if (p.hero_score >= 60)  return '높음';
  if (p.views >= 100 && p.purchase_count === 0) return '높음';
  if (p.hero_score >= 40)  return '보통';
  return '유지';
}

// ─── 데이터 가공 ─────────────────────────────────────────────────────
const products = RAW.map(r => {
  const sp = scoreP(r.purchase_rate);
  const sc = scoreC(r.cart_rate);
  const sv = scoreV(r.views);
  const ss = scoreS(r.sales);
  const sd = scoreD(r.dwell);
  const hero_score = sp + sc + sv + ss + sd;
  const p = {
    ...r,
    score_purchase: sp, score_cart: sc, score_views: sv, score_sales: ss, score_dwell: sd,
    hero_score,
    tier: getTier(hero_score),
  };
  p.priority = getPriority(p);
  return p;
}).sort((a, b) => b.hero_score - a.hero_score);

// ─── 유틸 ───────────────────────────────────────────────────────────
const fmt = n => n.toLocaleString('ko-KR');
const fmtW = n => n >= 1000000 ? (n / 1000000).toFixed(1) + 'M' : n >= 10000 ? Math.round(n / 10000) + '만' : fmt(n);

function tierClass(tier) {
  return { 'HERO': 'tier-hero', '성장 가능': 'tier-growth', '관찰 필요': 'tier-watch', '개선 필요': 'tier-danger' }[tier] || '';
}

function tierLabel(tier) {
  return { 'HERO': '⭐ HERO', '성장 가능': '🔼 성장 가능', '관찰 필요': '➡️ 관찰 필요', '개선 필요': '🔽 개선 필요' }[tier] || tier;
}

function priorityClass(p) {
  return { '긴급': 'p-urgent', '높음': 'p-high', '보통': 'p-normal', '유지': 'p-low' }[p] || '';
}

function scoreColor(score) {
  if (score >= 80) return '#f59e0b';
  if (score >= 60) return '#3b82f6';
  if (score >= 40) return '#8b5cf6';
  return '#ef4444';
}

function stockBadge(stock, sales) {
  if (stock === 0 && sales > 0) return `<span class="stock-badge stock-zero">재고없음 ⚠️</span>`;
  if (stock > 0 && stock <= 5)  return `<span class="stock-badge stock-low">재고 ${stock}개 ⚠️</span>`;
  if (stock > 0)                return `<span class="stock-badge stock-ok">재고 ${stock}개</span>`;
  return '';
}

function buildGauge(score, size = 80) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = scoreColor(score);
  return `
    <div class="score-gauge" style="width:${size}px;height:${size}px">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle class="track" cx="${size/2}" cy="${size/2}" r="${r}"/>
        <circle class="fill" cx="${size/2}" cy="${size/2}" r="${r}"
          stroke="${color}"
          stroke-dasharray="${circ}"
          stroke-dashoffset="${offset}"/>
      </svg>
      <div class="score-label">
        <span class="score-num" style="color:${color}">${score}</span>
        <span class="score-unit">점 / 100</span>
      </div>
    </div>`;
}

// ─── 헤더 메타 ──────────────────────────────────────────────────────
document.getElementById('analysis-date').textContent = '조회기간: 2026.5.10 ~ 5.13';
document.getElementById('product-count').textContent = `총 ${products.length}개 상품`;

// ─── KPI ─────────────────────────────────────────────────────────────
const totalSales = products.reduce((s, p) => s + p.sales, 0);
const heroList   = products.filter(p => p.tier === 'HERO');
const urgentList = products.filter(p => p.priority === '긴급');
const totalAbandoned = products.reduce((s, p) => s + Math.max(0, p.cart_count - p.purchase_count), 0);
const totalCart = products.reduce((s, p) => s + p.cart_count, 0);

const kpis = [
  { label: '총 판매금액',    value: fmtW(totalSales) + '원', sub: `${products.length}개 상품 합산` },
  { label: '⭐ HERO 상품',    value: heroList.length + '개',   sub: `점수 80점 이상`, color: '#f59e0b' },
  { label: '🔴 긴급 처리',    value: urgentList.length + '개', sub: '즉시 액션 필요', color: '#ef4444' },
  { label: '장바구니 담은 고객', value: fmt(totalCart) + '명', sub: '구매 미전환' },
];

document.getElementById('kpi-grid').innerHTML = kpis.map(k => `
  <div class="kpi-card">
    <div class="kpi-label">${k.label}</div>
    <div class="kpi-value" style="${k.color ? `color:${k.color}` : ''}">${k.value}</div>
    <div class="kpi-sub">${k.sub}</div>
  </div>`).join('');

// ─── HERO 카드 ───────────────────────────────────────────────────────
document.getElementById('hero-count').textContent = heroList.length + '개';

const breakdownDef = [
  { label: '구매비율', key: 'score_purchase', max: 30, color: '#f59e0b' },
  { label: '장바구니', key: 'score_cart',     max: 20, color: '#3b82f6' },
  { label: '조회수',   key: 'score_views',    max: 20, color: '#10b981' },
  { label: '판매금액', key: 'score_sales',    max: 20, color: '#8b5cf6' },
  { label: '체류시간', key: 'score_dwell',    max: 10, color: '#f97316' },
];

document.getElementById('hero-grid').innerHTML = heroList.map(p => `
  <div class="hero-card">
    <div class="hero-card-top">
      <div>
        <div class="hero-name">${p.name} ${stockBadge(p.stock, p.sales)}</div>
        <div class="hero-regdate">등록일 ${p.reg_date}</div>
      </div>
      ${buildGauge(p.hero_score, 80)}
    </div>
    <div class="hero-metrics">
      <div class="metric">
        <div class="metric-label">조회수</div>
        <div class="metric-value highlight">${fmt(p.views)}</div>
      </div>
      <div class="metric">
        <div class="metric-label">구매 비율</div>
        <div class="metric-value highlight">${p.purchase_rate}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">판매금액</div>
        <div class="metric-value">${fmtW(p.sales)}원</div>
      </div>
      <div class="metric">
        <div class="metric-label">구매 미전환</div>
        <div class="metric-value">${fmt(p.cart_count - p.purchase_count)}명</div>
      </div>
    </div>
    <div class="score-breakdown">
      ${breakdownDef.map(b => `
        <div class="breakdown-row">
          <div class="breakdown-label">${b.label}</div>
          <div class="breakdown-bar-wrap">
            <div class="breakdown-bar" style="width:${(p[b.key]/b.max*100).toFixed(0)}%;background:${b.color}"></div>
          </div>
          <div class="breakdown-score">${p[b.key]}점</div>
        </div>`).join('')}
    </div>
  </div>`).join('');

// ─── 성장 가능 카드 ──────────────────────────────────────────────────
const growthList = products.filter(p => p.tier === '성장 가능');
document.getElementById('growth-count').textContent = growthList.length + '개';

document.getElementById('growth-grid').innerHTML = growthList.map(p => {
  const abandoned = p.cart_count - p.purchase_count;
  return `
  <div class="growth-card">
    <div class="growth-score-ring">
      <div class="ring-num">${p.hero_score}</div>
      <div class="ring-label">점 / 100</div>
    </div>
    <div class="growth-info">
      <div class="growth-name">${p.name}</div>
      <div class="growth-stats">
        <span class="stat-chip">조회 ${fmt(p.views)}</span>
        <span class="stat-chip good">구매 ${p.purchase_rate}%</span>
        <span class="stat-chip">장바구니 ${p.cart_rate}%</span>
        ${abandoned >= 30 ? `<span class="stat-chip warn">구매 미전환 ${fmt(abandoned)}명</span>` : ''}
        <span class="stat-chip">${fmtW(p.sales)}원</span>
      </div>
    </div>
  </div>`;
}).join('');

// ─── 차트 공통 설정 ──────────────────────────────────────────────────
Chart.defaults.color = '#6b7280';
Chart.defaults.font.family = "'Pretendard', sans-serif";
Chart.defaults.font.size = 11;

const chartBg = 'rgba(255,255,255,0.04)';
const gridColor = 'rgba(255,255,255,0.06)';

// ─── 히어로 점수 차트 ────────────────────────────────────────────────
const top20 = products.slice(0, 20);
new Chart(document.getElementById('scoreChart'), {
  type: 'bar',
  data: {
    labels: top20.map(p => p.name),
    datasets: [{
      label: '히어로 점수',
      data: top20.map(p => p.hero_score),
      backgroundColor: top20.map(p => scoreColor(p.hero_score) + 'cc'),
      borderColor:     top20.map(p => scoreColor(p.hero_score)),
      borderWidth: 1,
      borderRadius: 4,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.raw}점 — ${tierLabel(top20[ctx.dataIndex].tier)}`
        }
      }
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { maxRotation: 45 } },
      y: { grid: { color: gridColor }, min: 0, max: 100, ticks: { stepSize: 20 } }
    }
  }
});

// ─── 구매 비율 차트 ──────────────────────────────────────────────────
const topPurchase = [...products].sort((a,b) => b.purchase_rate - a.purchase_rate).slice(0,15);
new Chart(document.getElementById('purchaseChart'), {
  type: 'bar',
  data: {
    labels: topPurchase.map(p => p.name),
    datasets: [{
      label: '구매 비율 (%)',
      data: topPurchase.map(p => p.purchase_rate),
      backgroundColor: '#10b98188',
      borderColor: '#10b981',
      borderWidth: 1,
      borderRadius: 4,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: gridColor }, ticks: { maxRotation: 45 } },
      y: { grid: { color: gridColor }, ticks: { callback: v => v + '%' } }
    }
  }
});

// ─── 장바구니 비율 차트 ──────────────────────────────────────────────
const topCart = [...products].sort((a,b) => b.cart_rate - a.cart_rate).slice(0,15);
new Chart(document.getElementById('cartChart'), {
  type: 'bar',
  data: {
    labels: topCart.map(p => p.name),
    datasets: [{
      label: '장바구니 비율 (%)',
      data: topCart.map(p => p.cart_rate),
      backgroundColor: '#3b82f688',
      borderColor: '#3b82f6',
      borderWidth: 1,
      borderRadius: 4,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: gridColor }, ticks: { maxRotation: 45 } },
      y: { grid: { color: gridColor }, ticks: { callback: v => v + '%' } }
    }
  }
});

// ─── 조회수 vs 판매금액 버블 차트 ───────────────────────────────────
const bubbleData = products
  .filter(p => p.views > 5 || p.sales > 0)
  .map(p => ({
    x: p.views,
    y: p.sales / 10000,
    r: Math.max(3, Math.min(20, p.hero_score / 7)),
    name: p.name,
    tier: p.tier,
    score: p.hero_score,
  }));

new Chart(document.getElementById('bubbleChart'), {
  type: 'bubble',
  data: {
    datasets: [{
      label: '상품',
      data: bubbleData,
      backgroundColor: bubbleData.map(d => scoreColor(d.score) + '66'),
      borderColor:     bubbleData.map(d => scoreColor(d.score)),
      borderWidth: 1,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => {
            const d = ctx.raw;
            return [`${d.name}`, `조회 ${fmt(d.x)}회`, `판매 ${fmtW(d.y * 10000)}원`, `점수 ${d.score}점`];
          }
        }
      }
    },
    scales: {
      x: { grid: { color: gridColor }, title: { display: true, text: '조회수', color: '#6b7280' } },
      y: { grid: { color: gridColor }, title: { display: true, text: '판매금액 (만원)', color: '#6b7280' } }
    }
  }
});

// ─── 광고 확대 추천 ──────────────────────────────────────────────────
const adList = products.filter(p => p.purchase_rate >= 2 && p.views < 500 && p.views > 10);
document.getElementById('ad-grid').innerHTML = adList.map(p => {
  const exp = Math.round(1000 * p.purchase_rate / 100);
  const mult = (1000 / Math.max(p.views, 1)).toFixed(1);
  return `
  <div class="action-card ad-card">
    <div class="action-name">${p.name}</div>
    <div class="action-stats">
      <div class="action-stat-row"><span class="action-stat-label">히어로 점수</span><span class="action-stat-val blue">${p.hero_score}점</span></div>
      <div class="action-stat-row"><span class="action-stat-label">현재 조회수</span><span class="action-stat-val">${fmt(p.views)}회</span></div>
      <div class="action-stat-row"><span class="action-stat-label">구매 비율</span><span class="action-stat-val green">${p.purchase_rate}%</span></div>
      <div class="action-stat-row"><span class="action-stat-label">판매금액</span><span class="action-stat-val">${fmtW(p.sales)}원</span></div>
    </div>
    <div class="action-expected">
      💡 광고로 조회수 1,000 달성 시 예상 추가 구매 약 <strong>${exp}건</strong> — 현재 대비 <strong>${mult}배</strong> 노출 확대
    </div>
  </div>`;
}).join('');

// ─── 푸시 발송 긴급 대상 ─────────────────────────────────────────────
const pushList = products
  .filter(p => (p.cart_count - p.purchase_count) >= 30)
  .sort((a, b) => (b.cart_count - b.purchase_count) - (a.cart_count - a.purchase_count))
  .slice(0, 8);

document.getElementById('push-grid').innerHTML = pushList.map(p => {
  const abandoned = p.cart_count - p.purchase_count;
  const recover = Math.max(1, Math.round(abandoned * 0.2));
  const avgPrice = p.purchase_count > 0 ? Math.round(p.sales / p.purchase_count) : 0;
  const expected = avgPrice > 0 ? fmtW(recover * avgPrice) + '원' : `${recover}건`;
  return `
  <div class="action-card push-card">
    <div class="action-name">${p.name}</div>
    <div class="action-stats">
      <div class="action-stat-row"><span class="action-stat-label">구매 미전환</span><span class="action-stat-val orange">${fmt(abandoned)}명</span></div>
      <div class="action-stat-row"><span class="action-stat-label">구매 비율</span><span class="action-stat-val">${p.purchase_rate}%</span></div>
      <div class="action-stat-row"><span class="action-stat-label">장바구니 비율</span><span class="action-stat-val">${p.cart_rate}%</span></div>
      <div class="action-stat-row"><span class="action-stat-label">히어로 점수</span><span class="action-stat-val">${p.hero_score}점</span></div>
    </div>
    <div class="action-expected">
      📩 구매 미전환 ${fmt(abandoned)}명 중 20% 전환 시 추가 <strong>${expected}</strong> 즉각 회수 가능
    </div>
  </div>`;
}).join('');

// ─── 상세페이지 수정 필요 ────────────────────────────────────────────
const detailList = products
  .filter(p => p.dwell >= 42 && p.purchase_rate < 2 && p.views >= 100)
  .sort((a, b) => b.dwell - a.dwell)
  .slice(0, 8);

document.getElementById('detail-grid').innerHTML = detailList.length === 0
  ? '<p class="empty-msg">해당 상품 없음</p>'
  : detailList.map(p => `
  <div class="action-card detail-card">
    <div class="action-name">${p.name}</div>
    <div class="action-stats">
      <div class="action-stat-row"><span class="action-stat-label">평균 체류시간</span><span class="action-stat-val orange">${p.dwell}초</span></div>
      <div class="action-stat-row"><span class="action-stat-label">구매 비율</span><span class="action-stat-val">${p.purchase_rate}%</span></div>
      <div class="action-stat-row"><span class="action-stat-label">장바구니 비율</span><span class="action-stat-val">${p.cart_rate}%</span></div>
      <div class="action-stat-row"><span class="action-stat-label">히어로 점수</span><span class="action-stat-val">${p.hero_score}점</span></div>
    </div>
    <div class="action-expected">
      📄 체류 ${p.dwell}초 열람 중이나 구매 전환 ${p.purchase_rate}% — 착용 영상·사이즈 실측·구매 포인트 상단 배치 권장
    </div>
  </div>`).join('');

// ─── 가격 점검 필요 ──────────────────────────────────────────────────
const priceList = products
  .filter(p => {
    const ratio = p.cart_count > 0 ? p.purchase_count / p.cart_count : 0;
    return (p.cart_count >= 20 && ratio < 0.15) || (p.cart_count >= 5 && p.purchase_count === 0 && p.cart_rate >= 5);
  })
  .sort((a, b) => b.cart_count - a.cart_count)
  .slice(0, 8);

document.getElementById('price-grid').innerHTML = priceList.length === 0
  ? '<p class="empty-msg">해당 상품 없음</p>'
  : priceList.map(p => {
    const ratio = p.cart_count > 0 ? Math.round(p.purchase_count / p.cart_count * 100) : 0;
    return `
  <div class="action-card price-card">
    <div class="action-name">${p.name}</div>
    <div class="action-stats">
      <div class="action-stat-row"><span class="action-stat-label">장바구니 수</span><span class="action-stat-val orange">${fmt(p.cart_count)}개</span></div>
      <div class="action-stat-row"><span class="action-stat-label">구매 수</span><span class="action-stat-val">${fmt(p.purchase_count)}건</span></div>
      <div class="action-stat-row"><span class="action-stat-label">장바구니→구매</span><span class="action-stat-val red">${ratio}%</span></div>
      <div class="action-stat-row"><span class="action-stat-label">히어로 점수</span><span class="action-stat-val">${p.hero_score}점</span></div>
    </div>
    <div class="action-expected">
      💰 장바구니 후 결제 전환 ${ratio}% — 가격·배송비·경쟁가 재검토 권장
    </div>
  </div>`;
  }).join('');

// ─── 재고 긴급 알림 ──────────────────────────────────────────────────
const stockAlertList = products
  .filter(p => (p.stock === 0 && p.sales > 0) || (p.stock > 0 && p.stock <= 5 && p.sales >= 200000))
  .sort((a, b) => b.sales - a.sales);

document.getElementById('stock-grid').innerHTML = stockAlertList.length === 0
  ? '<p class="empty-msg">재고 위험 상품 없음</p>'
  : stockAlertList.map(p => {
    const alertMsg = p.stock === 0 ? '재고 0 ⚠️ 즉시 발주 필요' : `재고 ${p.stock}개 — 품절 임박`;
    return `
  <div class="action-card stock-alert-card">
    <div class="action-name">${p.name}</div>
    <div class="action-stats">
      <div class="action-stat-row"><span class="action-stat-label">재고</span><span class="action-stat-val red">${p.stock}개</span></div>
      <div class="action-stat-row"><span class="action-stat-label">판매금액</span><span class="action-stat-val green">${fmtW(p.sales)}원</span></div>
      <div class="action-stat-row"><span class="action-stat-label">구매 수</span><span class="action-stat-val">${fmt(p.purchase_count)}건</span></div>
      <div class="action-stat-row"><span class="action-stat-label">히어로 점수</span><span class="action-stat-val">${p.hero_score}점</span></div>
    </div>
    <div class="action-expected">
      📦 ${alertMsg}
    </div>
  </div>`;
  }).join('');

// ─── 썸네일 점검 필요 ────────────────────────────────────────────────
const _today = new Date();
const thumbList = products
  .filter(p => {
    const days = Math.floor((_today - new Date(p.reg_date)) / (1000 * 60 * 60 * 24));
    return p.views < 100 && p.views >= 1 && days >= 14;
  })
  .map(p => ({ ...p, daysSince: Math.floor((_today - new Date(p.reg_date)) / (1000 * 60 * 60 * 24)) }))
  .sort((a, b) => a.views - b.views)
  .slice(0, 8);

document.getElementById('thumb-grid').innerHTML = thumbList.length === 0
  ? '<p class="empty-msg">해당 상품 없음</p>'
  : thumbList.map(p => `
  <div class="action-card thumb-card">
    <div class="action-name">${p.name}</div>
    <div class="action-stats">
      <div class="action-stat-row"><span class="action-stat-label">조회수</span><span class="action-stat-val red">${fmt(p.views)}회</span></div>
      <div class="action-stat-row"><span class="action-stat-label">등록일</span><span class="action-stat-val">${p.reg_date}</span></div>
      <div class="action-stat-row"><span class="action-stat-label">등록 경과</span><span class="action-stat-val orange">${p.daysSince}일</span></div>
      <div class="action-stat-row"><span class="action-stat-label">구매 비율</span><span class="action-stat-val">${p.purchase_rate}%</span></div>
    </div>
    <div class="action-expected">
      🖼️ ${p.daysSince}일 경과 후 조회수 ${p.views}회 — 썸네일 교체 A/B 테스트 권장
    </div>
  </div>`).join('');

// ─── 개선 필요 상품 ──────────────────────────────────────────────────
const dangerList = products.filter(p => p.tier === '개선 필요');
document.getElementById('danger-count').textContent = dangerList.length + '개';

document.getElementById('improve-grid').innerHTML = dangerList.map(p => {
  let issue = '';
  if (p.purchase_count === 0 && p.views >= 100) issue = '유입 있으나 구매 0건';
  else if (p.purchase_rate < 0.5) issue = '구매 전환율 0.5% 미만';
  else if (p.views < 50) issue = '노출 극히 낮음';
  else issue = '전반 지표 저조';
  return `
  <div class="improve-card">
    <div class="improve-name">${p.name}</div>
    <div class="improve-score">${p.hero_score}<span>점</span></div>
    <div class="improve-issue">${issue}<br/>조회 ${fmt(p.views)} · 구매 ${p.purchase_rate}%</div>
  </div>`;
}).join('');

// ─── 전체 상품 테이블 ────────────────────────────────────────────────
let sortCol = 'rank';
let sortAsc  = true;
let filterText = '';
let filterTier = '';

function renderTable() {
  let list = products.map((p, i) => ({ ...p, rank: i + 1 }));

  if (filterText) list = list.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));
  if (filterTier) list = list.filter(p => p.tier === filterTier);

  if (sortCol !== 'rank') {
    list.sort((a, b) => {
      const av = a[sortCol], bv = b[sortCol];
      return sortAsc ? av - bv : bv - av;
    });
  }

  const color = score => scoreColor(score);

  document.getElementById('table-body').innerHTML = list.map((p, i) => `
    <tr>
      <td class="rank">${i + 1}</td>
      <td class="prod-name">${p.name}<br/><span style="font-size:10px;color:#555">${p.reg_date}</span></td>
      <td>
        <div class="score-bar-wrap">
          <div class="score-bar-bg">
            <div class="score-bar-fill" style="width:${p.hero_score}%;background:${color(p.hero_score)}"></div>
          </div>
          <span class="score-bar-num" style="color:${color(p.hero_score)}">${p.hero_score}</span>
        </div>
      </td>
      <td><span class="tier-badge ${tierClass(p.tier)}">${tierLabel(p.tier)}</span></td>
      <td>${fmt(p.views)}</td>
      <td style="color:${p.purchase_rate >= 3 ? '#10b981' : p.purchase_rate >= 1 ? '#f0f0f0' : '#6b7280'}">${p.purchase_rate}%</td>
      <td style="color:${p.cart_rate >= 15 ? '#3b82f6' : '#f0f0f0'}">${p.cart_rate}%</td>
      <td>${p.sales > 0 ? fmtW(p.sales) + '원' : '—'}</td>
      <td>${p.dwell}초</td>
      <td>${stockBadge(p.stock, p.sales) || `<span style="color:#555">${p.stock}</span>`}</td>
      <td><span class="priority-badge ${priorityClass(p.priority)}">${p.priority}</span></td>
    </tr>`).join('');
}

renderTable();

// 정렬
document.querySelectorAll('.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (sortCol === col) { sortAsc = !sortAsc; }
    else { sortCol = col; sortAsc = false; }
    renderTable();
  });
});

// 검색
document.getElementById('table-search').addEventListener('input', e => {
  filterText = e.target.value;
  renderTable();
});

// 필터
document.getElementById('tier-filter').addEventListener('change', e => {
  filterTier = e.target.value;
  renderTable();
});
