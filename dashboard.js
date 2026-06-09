// ─── 원본 데이터 (판매중 + 진열 필터 적용, 6. 9. 기준) ──────────
const RAW = [
  { reg_date:'2023-06-01', name:'bs7659', views:1330,  cart_count: 422,  purchase_count:  56,  cart_rate: 31.7,  purchase_rate: 4.2, total_rate: 35.9,  sales: 1344000,   dwell:41, stock:186, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/154484/t50.list1_6a26eabde2d69.gif', is_new: true  },
  { reg_date:'2026-04-07', name:'ps5863', views:1206,  cart_count: 267,  purchase_count:  46,  cart_rate: 22.1,  purchase_rate: 3.8, total_rate:   26,  sales: 1653500,   dwell:39, stock: 84, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169933/t50.list1_6a22d8cfc3ac0.gif', is_new: false  },
  { reg_date:'2026-04-07', name:'nt5525', views:1036,  cart_count: 220,  purchase_count:  40,  cart_rate: 21.2,  purchase_rate: 3.9, total_rate: 25.1,  sales: 1072000,   dwell:43, stock: 40, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169943/t50.list1_6a15f865e4e6c.gif', is_new: false  },
  { reg_date:'2021-04-08', name:'ts2485', views: 610,  cart_count: 157,  purchase_count:  47,  cart_rate: 25.7,  purchase_rate: 7.7, total_rate: 33.4,  sales:  874200,   dwell:43, stock:  6, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/79210/t50.list1_6a1ecf78e74ef.gif', is_new: false  },
  { reg_date:'2026-05-11', name:'ps5891', views:1798,  cart_count: 370,  purchase_count:  41,  cart_rate: 20.6,  purchase_rate: 2.3, total_rate: 22.9,  sales: 1715800,   dwell:52, stock: 17, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170251/t50.list1_6a27019be176a.gif', is_new: false  },
  { reg_date:'2026-04-21', name:'ts5015', views: 404,  cart_count:  94,  purchase_count:  23,  cart_rate: 23.3,  purchase_rate: 5.7, total_rate:   29,  sales:  657800,   dwell:44, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170117/t50.list1_6a0cb86c2d61e.gif', is_new: false  },
  { reg_date:'2026-05-20', name:'ts5037', views: 647,  cart_count: 169,  purchase_count:  24,  cart_rate: 26.1,  purchase_rate: 3.7, total_rate: 29.8,  sales:  501600,   dwell:34, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170329/t50.list1_6a22ed8ce7ded.gif', is_new: false  },
  { reg_date:'2026-04-07', name:'cd3667', views: 618,  cart_count:  93,  purchase_count:  23,  cart_rate:   15,  purchase_rate: 3.7, total_rate: 18.8,  sales:  657800,   dwell:52, stock:135, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169947/t50.list1_6a0c334ae02c8.gif', is_new: false  },
  { reg_date:'2026-05-11', name:'sk7840', views:2389,  cart_count: 299,  purchase_count:  31,  cart_rate: 12.5,  purchase_rate: 1.3, total_rate: 13.8,  sales: 1540200,   dwell:41, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170249/t50.list1_6a1722d6e4ab8.gif', is_new: false  },
  { reg_date:'2026-03-16', name:'bs8712', views:1615,  cart_count: 194,  purchase_count:  25,  cart_rate:   12,  purchase_rate: 1.5, total_rate: 13.6,  sales: 1182500,   dwell:48, stock:  9, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169671/t50.list1_6a1ee7c3e430e.gif', is_new: true  },
  { reg_date:'2026-05-15', name:'ts5036', views:1295,  cart_count: 170,  purchase_count:  21,  cart_rate: 13.1,  purchase_rate: 1.6, total_rate: 14.7,  sales: 1008000,   dwell:47, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170303/t50.list1_6a1de3ff0f24c.gif', is_new: false  },
  { reg_date:'2025-12-30', name:'sk7607', views: 491,  cart_count: 135,  purchase_count:  13,  cart_rate: 27.5,  purchase_rate: 2.6, total_rate: 30.1,  sales:  364000,   dwell:41, stock: 79, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169061/t50.list1_6a27142c8e721.gif', is_new: true  },
  { reg_date:'2026-05-15', name:'st3095', views: 791,  cart_count: 124,  purchase_count:   9,  cart_rate: 15.7,  purchase_rate: 1.1, total_rate: 16.8,  sales:  432000,   dwell:45, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170309/t50.list1_6a1ccfd143850.gif', is_new: true  },
  { reg_date:'2025-05-20', name:'op16084', views: 918,  cart_count: 109,  purchase_count:  13,  cart_rate: 11.9,  purchase_rate: 1.4, total_rate: 13.3,  sales:  682000,   dwell:49, stock: 18, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/166733/t50.list1_6a270990174b1.gif', is_new: true  },
  { reg_date:'2025-03-17', name:'nt5027', views:1235,  cart_count: 158,  purchase_count:  22,  cart_rate: 12.8,  purchase_rate: 1.8, total_rate: 14.6,  sales:  479600,   dwell:48, stock:180, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/165437/t50.list1_6a1c6a65d9710.gif', is_new: false  },
  { reg_date:'2026-05-22', name:'ts5040', views:1013,  cart_count:  72,  purchase_count:  14,  cart_rate:  7.1,  purchase_rate: 1.4, total_rate:  8.5,  sales:  264600,   dwell:50, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170349/t50.list1_6a2700803ee27.gif', is_new: true  },
  { reg_date:'2026-05-15', name:'nt5553', views:1887,  cart_count: 117,  purchase_count:  15,  cart_rate:  6.2,  purchase_rate: 0.8, total_rate:    7,  sales: 1032700,   dwell:42, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170315/t50.list1_6a1ef3e1d9702.gif', is_new: true  },
  { reg_date:'2026-04-28', name:'bs8775', views:1230,  cart_count:  66,  purchase_count:  16,  cart_rate:  5.4,  purchase_rate: 1.3, total_rate:  6.7,  sales:  459200,   dwell:46, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170219/t50.list1_6a218e973427f.gif', is_new: true  },
  { reg_date:'2026-05-22', name:'cd3680', views:1198,  cart_count:  80,  purchase_count:  12,  cart_rate:  6.7,  purchase_rate:   1, total_rate:  7.7,  sales:  345600,   dwell:44, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170351/t50.list1_6a26e2c635350.gif', is_new: false  },
  { reg_date:'2026-05-11', name:'jk3086', views:1439,  cart_count:  85,  purchase_count:  10,  cart_rate:  5.9,  purchase_rate: 0.7, total_rate:  6.6,  sales:  698000,   dwell:38, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170239/t50.list1_6a1e6d8d35b73.gif', is_new: false  },
  { reg_date:'2026-04-07', name:'ts4998', views: 637,  cart_count:  58,  purchase_count:   7,  cart_rate:  9.1,  purchase_rate: 1.1, total_rate: 10.2,  sales:  187600,   dwell:39, stock: 44, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169923/t50.list1_6a22f1830de7a.gif', is_new: false  },
  { reg_date:'2026-04-23', name:'sk7837', views: 844,  cart_count:  39,  purchase_count:   9,  cart_rate:  4.6,  purchase_rate: 1.1, total_rate:  5.7,  sales:  358200,   dwell:38, stock:280, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170155/t50.list1_6a21c5f37afaa.gif', is_new: false  },
  { reg_date:'2026-05-12', name:'bs8783', views: 409,  cart_count:  50,  purchase_count:   6,  cart_rate: 12.2,  purchase_rate: 1.5, total_rate: 13.7,  sales:  149400,   dwell:36, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170261/t50.list1_6a270491c7837.gif', is_new: false  },
  { reg_date:'2026-04-22', name:'cd3674', views: 924,  cart_count:  91,  purchase_count:   6,  cart_rate:  9.8,  purchase_rate: 0.6, total_rate: 10.5,  sales:  168000,   dwell:45, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170149/t50.list1_6a22de5061a13.gif', is_new: false  },
  { reg_date:'2024-04-08', name:'op15727', views:1073,  cart_count:  47,  purchase_count:   3,  cart_rate:  4.4,  purchase_rate: 0.3, total_rate:  4.7,  sales:  253000,   dwell:51, stock:  2, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/160265/t50.666f01e275c4e.gif', is_new: true  },
  { reg_date:'2026-05-15', name:'op16392', views:1202,  cart_count:  44,  purchase_count:   4,  cart_rate:  3.7,  purchase_rate: 0.3, total_rate:    4,  sales:  328000,   dwell:45, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170311/t50.list1_6a1eeb51d972b.gif', is_new: true  },
  { reg_date:'2026-05-20', name:'ps5905', views:1307,  cart_count:  24,  purchase_count:   6,  cart_rate:  1.8,  purchase_rate: 0.5, total_rate:  2.3,  sales:  297000,   dwell:38, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170335/t50.list1_6a22f75697cdf.gif', is_new: false  },
  { reg_date:'2023-06-07', name:'sk6482', views:  62,  cart_count:   6,  purchase_count:   1,  cart_rate:  9.7,  purchase_rate: 1.6, total_rate: 11.3,  sales:   54000,   dwell:36, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/154610/t50.1688104108_0.gif', is_new: true  },
  { reg_date:'2026-04-10', name:'nt5530', views: 790,  cart_count:  38,  purchase_count:   6,  cart_rate:  4.8,  purchase_rate: 0.8, total_rate:  5.6,  sales:  118800,   dwell:35, stock:  3, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169963/t50.list1_6a21a851766b2.gif', is_new: false  },
  { reg_date:'2025-06-30', name:'ts4661', views:  96,  cart_count:   7,  purchase_count:   1,  cart_rate:  7.3,  purchase_rate:   1, total_rate:  8.3,  sales:   25600,   dwell:38, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/167149/t50.6878a48cc190b.gif', is_new: false  },
  { reg_date:'2024-05-07', name:'op15753', views: 707,  cart_count:  35,  purchase_count:   3,  cart_rate:    5,  purchase_rate: 0.4, total_rate:  5.4,  sales:  119700,   dwell:44, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/160622/t50.list1_6a2621c7d9619.gif', is_new: false  },
  { reg_date:'2026-04-14', name:'st3080', views: 441,  cart_count:  12,  purchase_count:   3,  cart_rate:  2.7,  purchase_rate: 0.7, total_rate:  3.4,  sales:  102000,   dwell:37, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170041/t50.list1_6a261afdf09c2.gif', is_new: true  },
  { reg_date:'2026-05-20', name:'sk7850', views:1859,  cart_count:  30,  purchase_count:   8,  cart_rate:  1.6,  purchase_rate: 0.4, total_rate:    2,  sales:  279200,   dwell:28, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170331/t50.list1_6a22f924d66c2.gif', is_new: false  },
  { reg_date:'2026-05-22', name:'bs8799', views: 831,  cart_count:  20,  purchase_count:   3,  cart_rate:  2.4,  purchase_rate: 0.4, total_rate:  2.8,  sales:  144000,   dwell:32, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170353/t50.list1_6a26f5994cc43.gif', is_new: false  },
  { reg_date:'2026-05-20', name:'sk7848', views:1157,  cart_count:  26,  purchase_count:   1,  cart_rate:  2.2,  purchase_rate: 0.1, total_rate:  2.3,  sales:   30250,   dwell:24, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170325/t50.list1_6a20732be5007.gif', is_new: false  },
  { reg_date:'2026-04-14', name:'st3081', views: 373,  cart_count:   4,  purchase_count:   3,  cart_rate:  1.1,  purchase_rate: 0.8, total_rate:  1.9,  sales:  108000,   dwell:37, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170043/t50.list1_6a2627ffcf7e7.gif', is_new: true  },
  { reg_date:'2026-04-23', name:'ps5885', views: 288,  cart_count:  19,  purchase_count:   1,  cart_rate:  6.6,  purchase_rate: 0.3, total_rate:  6.9,  sales:   25500,   dwell:31, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170171/t50.list1_6a22fd071d16a.gif', is_new: false  },
  { reg_date:'2026-04-27', name:'jp783', views: 349,  cart_count:   8,  purchase_count:   0,  cart_rate:  2.3,  purchase_rate:   0, total_rate:  2.3,  sales:       0,   dwell:43, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170211/t50.list1_6a27120b2cf54.gif', is_new: true  },
  { reg_date:'2026-05-20', name:'ts5038', views: 258,  cart_count:   5,  purchase_count:   1,  cart_rate:  1.9,  purchase_rate: 0.4, total_rate:  2.3,  sales:   19900,   dwell:53, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170337/t50.list1_6a26ef2d05441.gif', is_new: true  },
  { reg_date:'2026-05-22', name:'sk7853', views: 395,  cart_count:   8,  purchase_count:   1,  cart_rate:    2,  purchase_rate: 0.3, total_rate:  2.3,  sales:   28800,   dwell:34, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170361/t50.list1_6a26277167cb7.gif', is_new: true  },
  { reg_date:'2026-05-22', name:'bs8800', views: 297,  cart_count:   3,  purchase_count:   0,  cart_rate:    1,  purchase_rate:   0, total_rate:    1,  sales:       0,   dwell:46, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170355/t50.list1_6a2626a097d12.gif', is_new: true  },
  { reg_date:'2026-05-07', name:'sh3858', views: 104,  cart_count:   3,  purchase_count:   0,  cart_rate:  2.9,  purchase_rate:   0, total_rate:  2.9,  sales:       0,   dwell:32, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170235/t50.list1_6a22ff7b18e84.gif', is_new: false  },
  { reg_date:'2026-04-27', name:'sh3846', views:  31,  cart_count:   1,  purchase_count:   0,  cart_rate:  3.2,  purchase_rate:   0, total_rate:  3.2,  sales:       0,   dwell:24, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170201/t50.list1_6a270cbf85dd4.gif', is_new: false  }
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
document.getElementById('analysis-date').textContent = '조회기간: 2026.6.6 ~ 2026.6.9';
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
