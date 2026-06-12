// ─── 원본 데이터 (판매중 + 진열 필터 적용, 6. 12. 기준) ──────────
const RAW = [
  { reg_date:'2022-06-03', name:'bs7026', views:1058,  cart_count: 334,  purchase_count:  66,  cart_rate: 31.6,  purchase_rate: 6.2, total_rate: 37.8,  sales: 1460000,   dwell:45, stock:109, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/128418/t50.list1_6a29a72baee8f.gif', is_new: true  },
  { reg_date:'2026-04-23', name:'ps5888', views:1174,  cart_count: 330,  purchase_count:  39,  cart_rate: 28.1,  purchase_rate: 3.3, total_rate: 31.4,  sales: 2373200,   dwell:47, stock: 56, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170189/t50.list1_6a298e4bae0a3.gif', is_new: true  },
  { reg_date:'2023-06-01', name:'bs7659', views:1095,  cart_count: 473,  purchase_count:  60,  cart_rate: 43.2,  purchase_rate: 5.5, total_rate: 48.7,  sales: 1440000,   dwell:39, stock:203, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/154484/t50.list1_6a26eabde2d69.gif', is_new: false  },
  { reg_date:'2026-05-11', name:'ps5891', views:1773,  cart_count: 457,  purchase_count:  51,  cart_rate: 25.8,  purchase_rate: 2.9, total_rate: 28.7,  sales: 2145400,   dwell:56, stock: 29, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170251/t50.list1_6a27019be176a.gif', is_new: false  },
  { reg_date:'2024-01-23', name:'sk6794', views: 431,  cart_count: 131,  purchase_count:  15,  cart_rate: 30.4,  purchase_rate: 3.5, total_rate: 33.9,  sales:  535000,   dwell:59, stock:272, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/158714/t50.list1_6a16f6ba78ca6.gif', is_new: true  },
  { reg_date:'2025-12-30', name:'bs8591', views:1710,  cart_count: 304,  purchase_count:  45,  cart_rate: 17.8,  purchase_rate: 2.6, total_rate: 20.4,  sales: 1485000,   dwell:44, stock:254, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169047/t50.list1_6a297d3726bde.gif', is_new: true  },
  { reg_date:'2024-05-08', name:'ts4131', views: 380,  cart_count: 121,  purchase_count:  13,  cart_rate: 31.8,  purchase_rate: 3.4, total_rate: 35.3,  sales:  257400,   dwell:45, stock: 50, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/160655/t50.list1_6a2ad9ea789ea.gif', is_new: true  },
  { reg_date:'2025-12-30', name:'sk7607', views: 577,  cart_count: 150,  purchase_count:  12,  cart_rate:   26,  purchase_rate: 2.1, total_rate: 28.1,  sales:  336000,   dwell:49, stock: 69, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169061/t50.list1_6a27142c8e721.gif', is_new: false  },
  { reg_date:'2025-05-20', name:'op16084', views: 816,  cart_count: 128,  purchase_count:  15,  cart_rate: 15.7,  purchase_rate: 1.8, total_rate: 17.5,  sales:  762000,   dwell:55, stock: 10, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/166733/t50.list1_6a270990174b1.gif', is_new: false  },
  { reg_date:'2024-05-29', name:'bs7950', views: 192,  cart_count:  62,  purchase_count:   6,  cart_rate: 32.3,  purchase_rate: 3.1, total_rate: 35.4,  sales:  216000,   dwell:41, stock: 92, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/160952/t50.667cdb4a922ba.gif', is_new: true  },
  { reg_date:'2026-05-22', name:'ts5039', views: 982,  cart_count: 135,  purchase_count:  21,  cart_rate: 13.7,  purchase_rate: 2.1, total_rate: 15.9,  sales:  462000,   dwell:42, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170347/t50.list1_6a2992455dd70.gif', is_new: true  },
  { reg_date:'2026-04-14', name:'st3080', views:1328,  cart_count:  84,  purchase_count:  18,  cart_rate:  6.3,  purchase_rate: 1.4, total_rate:  7.7,  sales:  612000,   dwell:45, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170041/t50.list1_6a29a22db1521.gif', is_new: false  },
  { reg_date:'2026-04-22', name:'cd3674', views: 901,  cart_count: 138,  purchase_count:  16,  cart_rate: 15.3,  purchase_rate: 1.8, total_rate: 17.1,  sales:  448000,   dwell:45, stock: 25, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170149/t50.list1_6a22de5061a13.gif', is_new: false  },
  { reg_date:'2026-05-15', name:'st3096', views:1452,  cart_count: 112,  purchase_count:  15,  cart_rate:  7.7,  purchase_rate:   1, total_rate:  8.7,  sales:  801000,   dwell:42, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170321/t50.list1_6a1de90ae7f4a.gif', is_new: true  },
  { reg_date:'2024-05-07', name:'op15753', views:1783,  cart_count:  94,  purchase_count:  22,  cart_rate:  5.3,  purchase_rate: 1.2, total_rate:  6.5,  sales:  874700,   dwell:41, stock: 64, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/160622/t50.list1_6a29ccd9d4737.gif', is_new: false  },
  { reg_date:'2026-05-12', name:'bs8783', views: 524,  cart_count:  67,  purchase_count:  12,  cart_rate: 12.8,  purchase_rate: 2.3, total_rate: 15.1,  sales:  298800,   dwell:32, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170261/t50.list1_6a270491c7837.gif', is_new: false  },
  { reg_date:'2026-04-07', name:'ts4998', views: 580,  cart_count: 106,  purchase_count:  10,  cart_rate: 18.3,  purchase_rate: 1.7, total_rate:   20,  sales:  261000,   dwell:43, stock: 22, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169923/t50.list1_6a22f1830de7a.gif', is_new: false  },
  { reg_date:'2026-05-22', name:'cd3680', views:2759,  cart_count: 180,  purchase_count:  26,  cart_rate:  6.5,  purchase_rate: 0.9, total_rate:  7.5,  sales:  748800,   dwell:38, stock:  1, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170351/t50.list1_6a26e2c635350.gif', is_new: false  },
  { reg_date:'2026-05-15', name:'cd3679', views: 698,  cart_count: 102,  purchase_count:  10,  cart_rate: 14.6,  purchase_rate: 1.4, total_rate:   16,  sales:  268000,   dwell:43, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170317/t50.list1_6a218739e5ebd.gif', is_new: true  },
  { reg_date:'2022-05-20', name:'ts3230', views: 134,  cart_count:  21,  purchase_count:   3,  cart_rate: 15.7,  purchase_rate: 2.2, total_rate: 17.9,  sales:   66000,   dwell:45, stock: 47, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/126609/t50.list1_6a2b66b739c64.gif', is_new: true  },
  { reg_date:'2026-05-22', name:'bs8799', views:1298,  cart_count:  52,  purchase_count:  13,  cart_rate:    4,  purchase_rate:   1, total_rate:    5,  sales:  626000,   dwell:40, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170353/t50.list1_6a26f5994cc43.gif', is_new: false  },
  { reg_date:'2026-05-20', name:'ts5037', views:1716,  cart_count: 218,  purchase_count:  23,  cart_rate: 12.7,  purchase_rate: 1.3, total_rate:   14,  sales:  480700,   dwell:26, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170329/t50.list1_6a22ed8ce7ded.gif', is_new: false  },
  { reg_date:'2026-05-15', name:'st3095', views:1037,  cart_count: 136,  purchase_count:   8,  cart_rate: 13.1,  purchase_rate: 0.8, total_rate: 13.9,  sales:  388000,   dwell:52, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170309/t50.list1_6a1ccfd143850.gif', is_new: false  },
  { reg_date:'2026-05-12', name:'ts5028', views: 386,  cart_count: 114,  purchase_count:   5,  cart_rate: 29.5,  purchase_rate: 1.3, total_rate: 30.8,  sales:  115000,   dwell:36, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170259/t50.list1_6a22d56f85488.gif', is_new: true  },
  { reg_date:'2026-04-23', name:'sk7837', views: 764,  cart_count:  60,  purchase_count:  12,  cart_rate:  7.9,  purchase_rate: 1.6, total_rate:  9.4,  sales:  477600,   dwell:41, stock:263, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170155/t50.list1_6a2ad03131553.gif', is_new: false  },
  { reg_date:'2026-05-22', name:'ts5040', views:2404,  cart_count: 100,  purchase_count:  17,  cart_rate:  4.2,  purchase_rate: 0.7, total_rate:  4.9,  sales:  321300,   dwell:38, stock:  1, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170349/t50.list1_6a2700803ee27.gif', is_new: false  },
  { reg_date:'2026-04-14', name:'st3081', views:1202,  cart_count:  47,  purchase_count:   8,  cart_rate:  3.9,  purchase_rate: 0.7, total_rate:  4.6,  sales:  288000,   dwell:41, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170043/t50.list1_6a298389633ba.gif', is_new: false  },
  { reg_date:'2026-05-22', name:'ts5041', views: 475,  cart_count:  25,  purchase_count:   7,  cart_rate:  5.3,  purchase_rate: 1.5, total_rate:  6.7,  sales:  279300,   dwell:35, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170357/t50.list1_6a298cc46687c.gif', is_new: true  },
  { reg_date:'2026-05-20', name:'ts5038', views: 611,  cart_count:  21,  purchase_count:   6,  cart_rate:  3.4,  purchase_rate:   1, total_rate:  4.4,  sales:  119400,   dwell:42, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170337/t50.list1_6a26ef2d05441.gif', is_new: false  },
  { reg_date:'2026-05-20', name:'ps5905', views: 884,  cart_count:  52,  purchase_count:   7,  cart_rate:  5.9,  purchase_rate: 0.8, total_rate:  6.7,  sales:  346500,   dwell:30, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170335/t50.list1_6a22f75697cdf.gif', is_new: false  },
  { reg_date:'2026-05-20', name:'sk7850', views: 939,  cart_count:  51,  purchase_count:   7,  cart_rate:  5.4,  purchase_rate: 0.7, total_rate:  6.2,  sales:  244300,   dwell:30, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170331/t50.list1_6a22f924d66c2.gif', is_new: false  },
  { reg_date:'2026-05-22', name:'sk7852', views: 924,  cart_count:  33,  purchase_count:   5,  cart_rate:  3.6,  purchase_rate: 0.5, total_rate:  4.1,  sales:  324000,   dwell:42, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170359/t50.list1_6a29bffc05f3b.gif', is_new: true  },
  { reg_date:'2026-04-23', name:'ps5885', views: 198,  cart_count:  26,  purchase_count:   2,  cart_rate: 13.1,  purchase_rate:   1, total_rate: 14.1,  sales:   51000,   dwell:36, stock: 42, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170171/t50.list1_6a22fd071d16a.gif', is_new: false  },
  { reg_date:'2024-04-08', name:'op15727', views:1822,  cart_count:  58,  purchase_count:   3,  cart_rate:  3.2,  purchase_rate: 0.2, total_rate:  3.3,  sales:  245000,   dwell:53, stock:  1, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/160265/t50.666f01e275c4e.gif', is_new: false  },
  { reg_date:'2023-06-07', name:'sk6482', views: 153,  cart_count:  10,  purchase_count:   2,  cart_rate:  6.5,  purchase_rate: 1.3, total_rate:  7.8,  sales:  108000,   dwell:49, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/154610/t50.1688104108_0.gif', is_new: false  },
  { reg_date:'2022-05-20', name:'ts3229', views: 174,  cart_count:  26,  purchase_count:   2,  cart_rate: 14.9,  purchase_rate: 1.1, total_rate: 16.1,  sales:   44000,   dwell:38, stock: 20, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/126606/t50.list1_6a2b670047ba9.gif', is_new: true  },
  { reg_date:'2026-05-21', name:'sk7851', views: 424,  cart_count:  31,  purchase_count:   2,  cart_rate:  7.3,  purchase_rate: 0.5, total_rate:  7.8,  sales:   62000,   dwell:38, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170341/t50.list1_6a2ad297f18bb.gif', is_new: true  },
  { reg_date:'2026-05-22', name:'sk7853', views: 711,  cart_count:  10,  purchase_count:   5,  cart_rate:  1.4,  purchase_rate: 0.7, total_rate:  2.1,  sales:  144000,   dwell:37, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170361/t50.list1_6a2ac8537dc22.gif', is_new: false  },
  { reg_date:'2026-04-27', name:'jp783', views: 609,  cart_count:  21,  purchase_count:   1,  cart_rate:  3.4,  purchase_rate: 0.2, total_rate:  3.6,  sales:   56000,   dwell:38, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170211/t50.list1_6a27120b2cf54.gif', is_new: false  },
  { reg_date:'2026-05-22', name:'bs8800', views:1009,  cart_count:  17,  purchase_count:   1,  cart_rate:  1.7,  purchase_rate: 0.1, total_rate:  1.8,  sales:   47500,   dwell:38, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170355/t50.list1_6a2ab3392874f.gif', is_new: false  },
  { reg_date:'2024-01-23', name:'bs7834', views: 265,  cart_count:   3,  purchase_count:   0,  cart_rate:  1.1,  purchase_rate:   0, total_rate:  1.1,  sales:       0,   dwell:46, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/158732/t50.list1_6a28dd7823244.gif', is_new: true  },
  { reg_date:'2026-04-27', name:'sh3846', views:  52,  cart_count:   2,  purchase_count:   0,  cart_rate:  3.8,  purchase_rate:   0, total_rate:  3.8,  sales:       0,   dwell:35, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170201/t50.list1_6a270cbf85dd4.gif', is_new: false  },
  { reg_date:'2024-04-18', name:'op15739', views:   7,  cart_count:   0,  purchase_count:   0,  cart_rate:    0,  purchase_rate:   0, total_rate:    0,  sales:       0,   dwell:21, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/160424/t50.664abf640d4ba.gif', is_new: true  }
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


// ─── 딥링크 헬퍼 ──────────────────────────────────────────────────
function getNewBadge(isNew) {
  return isNew ? '<span class="new-badge" style="background:#ef4444; color:white; font-size:9px; padding:2px 5px; border-radius:3px; margin-left:4px; font-weight:700; vertical-align:middle; line-height:1;">NEW</span>' : '';
}
function getIndexNo(thumbUrl) {
  if (!thumbUrl) return '';
  const m = thumbUrl.match(/\/goods\/(\d+)\//);
  return m ? m[1] : '';
}
function getLinks(p) {
  const idx = getIndexNo(p.thumb_url);
  if (!idx) return '';
  return `
    <span class="link-btns" style="display:inline-flex; gap:4px; margin-left:6px; vertical-align:middle;">
      <a href="https://attrangs.co.kr/shop/view.php?index_no=${idx}" target="_blank" class="link-btn" title="자사몰 보기" onclick="event.stopPropagation()">🏠</a>
      <a href="https://at.snfg.kr/order/index.php?code=sell_stat_attr&key=index_no&keyword=${idx}&mc=off" target="_blank" class="link-btn" title="어드민 통계 확인" onclick="event.stopPropagation()">⚙️</a>
    </span>
  `;
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

// ─── 딥링크 헬퍼 ──────────────────────────────────────────────────
function getIndexNo(thumbUrl) {
  if (!thumbUrl) return '';
  const m = thumbUrl.match(/\/goods\/(\d+)\//);
  return m ? m[1] : '';
}
function getLinks(p) {
  const idx = getIndexNo(p.thumb_url);
  if (!idx) return '';
  return `
    <span class="link-btns" style="display:inline-flex; gap:4px; margin-left:6px; vertical-align:middle;">
      <a href="https://attrangs.co.kr/shop/view.php?index_no=${idx}" target="_blank" class="link-btn" title="자사몰 보기" onclick="event.stopPropagation()">🏠</a>
      <a href="https://at.snfg.kr/order/index.php?code=sell_stat_attr&key=index_no&keyword=${idx}&mc=off" target="_blank" class="link-btn" title="어드민 통계 확인" onclick="event.stopPropagation()">⚙️</a>
    </span>
  `;
}

// ─── 헤더 메타 ──────────────────────────────────────────────────────
document.getElementById('analysis-date').textContent = '조회기간: 2026.6.9 ~ 2026.6.12';
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
      <div class="prod-name-wrap">
        <img src="${p.thumb_url || `https://picsum.photos/seed/${p.name}/150/150`}" alt="${p.name}" class="thumb-img hero-thumb" loading="lazy" />
        <div>
          <div class="hero-name"><span class="prod-name-text">${p.name}</span>${getNewBadge(p.is_new)}${getLinks(p)} ${stockBadge(p.stock, p.sales)}</div>
          <div class="hero-regdate">등록일 ${p.reg_date}</div>
        </div>
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
      <div class="action-header">
        <img src="${p.thumb_url || `https://picsum.photos/seed/${p.name}/100/100`}" alt="${p.name}" class="thumb-img" loading="lazy" />
        <div class="growth-name"><span class="prod-name-text">${p.name}</span>${getNewBadge(p.is_new)}${getLinks(p)}</div>
      </div>
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
    <div class="action-header">
      <img src="${p.thumb_url || `https://picsum.photos/seed/${p.name}/100/100`}" alt="${p.name}" class="thumb-img" loading="lazy" />
      <div class="action-name"><span class="prod-name-text">${p.name}</span>${getNewBadge(p.is_new)}${getLinks(p)}</div>
    </div>
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
    <div class="action-header">
      <img src="${p.thumb_url || `https://picsum.photos/seed/${p.name}/100/100`}" alt="${p.name}" class="thumb-img" loading="lazy" />
      <div class="action-name"><span class="prod-name-text">${p.name}</span>${getNewBadge(p.is_new)}${getLinks(p)}</div>
    </div>
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
    <div class="action-header">
      <img src="${p.thumb_url || `https://picsum.photos/seed/${p.name}/100/100`}" alt="${p.name}" class="thumb-img" loading="lazy" />
      <div class="action-name"><span class="prod-name-text">${p.name}</span>${getNewBadge(p.is_new)}${getLinks(p)}</div>
    </div>
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
    <div class="action-header">
      <img src="${p.thumb_url || `https://picsum.photos/seed/${p.name}/100/100`}" alt="${p.name}" class="thumb-img" loading="lazy" />
      <div class="action-name"><span class="prod-name-text">${p.name}</span>${getNewBadge(p.is_new)}${getLinks(p)}</div>
    </div>
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
    <div class="action-header">
      <img src="${p.thumb_url || `https://picsum.photos/seed/${p.name}/100/100`}" alt="${p.name}" class="thumb-img" loading="lazy" />
      <div class="action-name"><span class="prod-name-text">${p.name}</span>${getNewBadge(p.is_new)}${getLinks(p)}</div>
    </div>
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
    <div class="action-header">
      <img src="${p.thumb_url || `https://picsum.photos/seed/${p.name}/100/100`}" alt="${p.name}" class="thumb-img" loading="lazy" />
      <div class="action-name"><span class="prod-name-text">${p.name}</span>${getNewBadge(p.is_new)}${getLinks(p)}</div>
    </div>
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
    <div class="action-header">
      <img src="${p.thumb_url || `https://picsum.photos/seed/${p.name}/100/100`}" alt="${p.name}" class="thumb-img" loading="lazy" />
      <div class="improve-name"><span class="prod-name-text">${p.name}</span>${getNewBadge(p.is_new)}${getLinks(p)}</div>
    </div>
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
      <td class="prod-name">
        <div class="prod-name-wrap">
          <img src="${p.thumb_url || `https://picsum.photos/seed/${p.name}/100/100`}" alt="${p.name}" class="thumb-img table-thumb" loading="lazy" />
          <div><span class="prod-name-text">${p.name}</span>${getNewBadge(p.is_new)}${getLinks(p)}<br/><span style="font-size:10px;color:#555">${p.reg_date}</span></div>
        </div>
      </td>
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

// ─── 이미지 미리보기 (Tooltip) ──────────────────────────────
(function initImagePreview() {
  const tooltip = document.createElement('div');
  tooltip.className = 'img-preview-tooltip';
  document.body.appendChild(tooltip);

  document.body.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('thumb-img') || e.target.classList.contains('table-thumb')) {
      // 픽섬 더미 이미지인 경우 고해상도로 교체, 실제 이미지는 그대로 사용
      let src = e.target.src;
      if (src.includes('picsum.photos')) {
        src = src.replace(/\/\d+\/\d+$/, '/300/300');
      } else {
        // 아뜨랑스 원본 큰 이미지는 't50.' 이 없는 원본 파일명입니다.
        src = src.replace('t50.', '');
      }
      tooltip.style.backgroundImage = `url(${src})`;
      tooltip.style.display = 'block';
    }
  });

  document.body.addEventListener('mousemove', (e) => {
    if (tooltip.style.display === 'block') {
      let x = e.clientX + 15;
      let y = e.clientY + 15;
      const tooltipWidth = 320; // 툴팁 가로 크기
      const tooltipHeight = 472; // 툴팁 세로 크기
      if (x + tooltipWidth > window.innerWidth) x = e.clientX - tooltipWidth - 15;
      if (y + tooltipHeight > window.innerHeight) y = e.clientY - tooltipHeight - 15;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    }
  });

  document.body.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('thumb-img') || e.target.classList.contains('table-thumb')) {
      tooltip.style.display = 'none';
    }
  });
})();
