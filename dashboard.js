// ─── 원본 데이터 (판매중 + 진열 필터 적용, 5. 20. 기준) ──────────
const RAW = [
  { reg_date:'2023-04-26', name:'ps4533', views:3280,  cart_count: 769,  purchase_count: 116,  cart_rate: 23.4,  purchase_rate: 3.5, total_rate:   27,  sales: 4158600,   dwell:53, stock:590, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/153746/t50.list1_6a0cb6ce9dda1.gif'  },
  { reg_date:'2026-03-09', name:'ts4957', views:1355,  cart_count: 300,  purchase_count:  52,  cart_rate: 22.1,  purchase_rate: 3.8, total_rate:   26,  sales: 1034800,   dwell:41, stock: 25, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169659/t50.list1_6a09f6d3f3ed1.gif'  },
  { reg_date:'2025-05-28', name:'ps5305', views: 806,  cart_count: 178,  purchase_count:  38,  cart_rate: 22.1,  purchase_rate: 4.7, total_rate: 26.8,  sales: 1421200,   dwell:49, stock:117, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/166907/t50.list1_6a0ca7ea4ab06.gif'  },
  { reg_date:'2026-04-07', name:'nt5523', views:1450,  cart_count: 580,  purchase_count:  57,  cart_rate:   40,  purchase_rate: 3.9, total_rate: 43.9,  sales: 1411500,   dwell:36, stock: 16, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169939/t50.list1_6a044483dc8a3.gif'  },
  { reg_date:'2025-05-20', name:'ps5268', views: 223,  cart_count:  50,  purchase_count:  21,  cart_rate: 22.4,  purchase_rate: 9.4, total_rate: 31.8,  sales:  504000,   dwell:53, stock:213, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/166565/t50.688aea6290da1.gif'  },
  { reg_date:'2026-01-06', name:'ts4844', views: 362,  cart_count:  75,  purchase_count:  19,  cart_rate: 20.7,  purchase_rate: 5.2, total_rate:   26,  sales:  541500,   dwell:40, stock: 39, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169107/t50.list1_6a01a0d0b3232.gif'  },
  { reg_date:'2024-01-18', name:'ts3986', views: 988,  cart_count: 224,  purchase_count:  41,  cart_rate: 22.7,  purchase_rate: 4.1, total_rate: 26.8,  sales:  688800,   dwell:38, stock: 49, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/158636/t50.list1_6a0450688fa38.gif'  },
  { reg_date:'2026-03-27', name:'ts4995', views:1767,  cart_count: 372,  purchase_count:  46,  cart_rate: 21.1,  purchase_rate: 2.6, total_rate: 23.7,  sales: 1518000,   dwell:37, stock:  4, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169797/t50.list1_6a03e175a15e9.gif'  },
  { reg_date:'2026-03-23', name:'ps5855', views:1613,  cart_count: 260,  purchase_count:  46,  cart_rate: 16.1,  purchase_rate: 2.9, total_rate:   19,  sales: 1288000,   dwell:43, stock:  1, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169725/t50.list1_6a09f35799972.gif'  },
  { reg_date:'2026-04-21', name:'bs8767', views: 812,  cart_count: 154,  purchase_count:  24,  cart_rate:   19,  purchase_rate:   3, total_rate: 21.9,  sales:  565600,   dwell:41, stock: 11, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170103/t50.list1_6a0caa3586239.gif'  },
  { reg_date:'2026-04-21', name:'st3084', views:2505,  cart_count: 216,  purchase_count:  48,  cart_rate:  8.6,  purchase_rate: 1.9, total_rate: 10.5,  sales: 2016000,   dwell:56, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170133/t50.list1_6a0311f75979c.gif'  },
  { reg_date:'2026-04-21', name:'ps5880', views: 877,  cart_count: 116,  purchase_count:  32,  cart_rate: 13.2,  purchase_rate: 3.6, total_rate: 16.9,  sales:  880000,   dwell:53, stock:  1, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170119/t50.list1_6a0c8ca894e1f.gif'  },
  { reg_date:'2026-04-07', name:'cd3668', views: 617,  cart_count: 134,  purchase_count:  15,  cart_rate: 21.7,  purchase_rate: 2.4, total_rate: 24.1,  sales:  598500,   dwell:44, stock: 64, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169951/t50.list1_6a028fca2fcc0.gif'  },
  { reg_date:'2026-04-21', name:'cd3673', views:1396,  cart_count: 156,  purchase_count:  39,  cart_rate: 11.2,  purchase_rate: 2.8, total_rate:   14,  sales: 1127100,   dwell:42, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170147/t50.list1_6a09db9a098e2.gif'  },
  { reg_date:'2026-03-31', name:'ps5858', views: 714,  cart_count: 108,  purchase_count:  21,  cart_rate: 15.1,  purchase_rate: 2.9, total_rate: 18.1,  sales: 1488900,   dwell:43, stock:236, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169845/t50.list1_6a05da14ef805.gif'  },
  { reg_date:'2023-05-11', name:'ps4543', views: 464,  cart_count:  89,  purchase_count:  16,  cart_rate: 19.2,  purchase_rate: 3.4, total_rate: 22.6,  sales:  713600,   dwell:42, stock:  5, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/154091/t50.list1_69f9e511c3d39.gif'  },
  { reg_date:'2026-04-07', name:'nt5529', views: 847,  cart_count: 159,  purchase_count:  22,  cart_rate: 18.8,  purchase_rate: 2.6, total_rate: 21.4,  sales:  877800,   dwell:43, stock: 41, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169955/t50.list1_6a05ba9463e0b.gif'  },
  { reg_date:'2026-04-16', name:'op16385', views:1248,  cart_count: 157,  purchase_count:  23,  cart_rate: 12.6,  purchase_rate: 1.8, total_rate: 14.4,  sales: 1104000,   dwell:47, stock:181, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170047/t50.list1_6a0c2218887d2.gif'  },
  { reg_date:'2023-11-28', name:'sk6665', views: 773,  cart_count:  77,  purchase_count:  22,  cart_rate:   10,  purchase_rate: 2.8, total_rate: 12.8,  sales:  776000,   dwell:48, stock:384, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/157577/t50.list1_6a0989c163f7f.gif'  },
  { reg_date:'2026-04-07', name:'nt5528', views: 473,  cart_count:  99,  purchase_count:  10,  cart_rate: 20.9,  purchase_rate: 2.1, total_rate:   23,  sales:  295800,   dwell:44, stock:189, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169953/t50.list1_6a09e1fac2355.gif'  },
  { reg_date:'2025-05-20', name:'bs8230', views:  20,  cart_count:   4,  purchase_count:   1,  cart_rate:   20,  purchase_rate:   5, total_rate:   25,  sales:   38600,   dwell:74, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/166799/t50.68770cc7b480c.gif'  },
  { reg_date:'2026-04-07', name:'nt5527', views: 559,  cart_count:  90,  purchase_count:  13,  cart_rate: 16.1,  purchase_rate: 2.3, total_rate: 18.4,  sales:  387400,   dwell:42, stock: 73, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169949/t50.list1_6a0c1eafbcc1a.gif'  },
  { reg_date:'2026-04-24', name:'ps5889', views: 689,  cart_count: 102,  purchase_count:  14,  cart_rate: 14.8,  purchase_rate:   2, total_rate: 16.8,  sales:  798000,   dwell:41, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170193/t50.list1_6a09922f45622.gif'  },
  { reg_date:'2026-03-20', name:'ps5853', views: 329,  cart_count:  74,  purchase_count:   6,  cart_rate: 22.5,  purchase_rate: 1.8, total_rate: 24.3,  sales:  354000,   dwell:46, stock: 98, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169721/t50.list1_6a09decb9fcdf.gif'  },
  { reg_date:'2026-03-27', name:'bs8738', views: 304,  cart_count:  50,  purchase_count:   6,  cart_rate: 16.4,  purchase_rate:   2, total_rate: 18.4,  sales:  239400,   dwell:37, stock:196, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169791/t50.list1_6a0c886ac9ab3.gif'  },
  { reg_date:'2026-04-21', name:'st3083', views:1693,  cart_count: 101,  purchase_count:  18,  cart_rate:    6,  purchase_rate: 1.1, total_rate:    7,  sales:  648000,   dwell:41, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170125/t50.list1_6a0c5a1c42025.gif'  },
  { reg_date:'2026-04-07', name:'cd3667', views:1846,  cart_count:  94,  purchase_count:  22,  cart_rate:  5.1,  purchase_rate: 1.2, total_rate:  6.3,  sales:  629200,   dwell:44, stock:181, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169947/t50.list1_6a0c334ae02c8.gif'  },
  { reg_date:'2026-04-07', name:'nt5526', views: 517,  cart_count:  52,  purchase_count:  14,  cart_rate: 10.1,  purchase_rate: 2.7, total_rate: 12.8,  sales:  375200,   dwell:34, stock:115, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169945/t50.list1_6a0c66fdedef5.gif'  },
  { reg_date:'2026-04-10', name:'ps5864', views: 357,  cart_count:  55,  purchase_count:   4,  cart_rate: 15.4,  purchase_rate: 1.1, total_rate: 16.5,  sales:  236000,   dwell:49, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169985/t50.list1_6a0cadd059425.gif'  },
  { reg_date:'2026-03-20', name:'ps5854', views:2324,  cart_count: 132,  purchase_count:  12,  cart_rate:  5.7,  purchase_rate: 0.5, total_rate:  6.2,  sales:  660000,   dwell:41, stock: 76, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169723/t50.list1_6a0c62cbd5fb9.gif'  },
  { reg_date:'2026-04-10', name:'sk7814', views: 697,  cart_count:  90,  purchase_count:   8,  cart_rate: 12.9,  purchase_rate: 1.1, total_rate: 14.1,  sales:  434400,   dwell:47, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169979/t50.list1_69ef959c4f27a.gif'  },
  { reg_date:'2026-04-21', name:'sk7835', views: 767,  cart_count: 103,  purchase_count:  12,  cart_rate: 13.4,  purchase_rate: 1.6, total_rate:   15,  sales:  358800,   dwell:39, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170113/t50.list1_6a03026a56860.gif'  },
  { reg_date:'2026-04-21', name:'nt5541', views: 672,  cart_count:  87,  purchase_count:  10,  cart_rate: 12.9,  purchase_rate: 1.5, total_rate: 14.4,  sales:  399000,   dwell:44, stock:  3, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170107/t50.list1_6a05b0598d683.gif'  },
  { reg_date:'2026-04-21', name:'ts5015', views: 576,  cart_count:  61,  purchase_count:  10,  cart_rate: 10.6,  purchase_rate: 1.7, total_rate: 12.3,  sales:  300000,   dwell:31, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170117/t50.list1_6a0cb86c2d61e.gif'  },
  { reg_date:'2026-04-21', name:'st3087', views: 882,  cart_count:  69,  purchase_count:   9,  cart_rate:  7.8,  purchase_rate:   1, total_rate:  8.8,  sales:  328500,   dwell:46, stock:  3, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170137/t50.list1_6a0c8df0da9ed.gif'  },
  { reg_date:'2026-04-16', name:'sk7825', views:1139,  cart_count:  77,  purchase_count:  10,  cart_rate:  6.8,  purchase_rate: 0.9, total_rate:  7.6,  sales:  540000,   dwell:39, stock:  2, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170059/t50.list1_6a098fccc0060.gif'  },
  { reg_date:'2023-04-10', name:'jk2610', views: 320,  cart_count:  30,  purchase_count:   4,  cart_rate:  9.4,  purchase_rate: 1.3, total_rate: 10.6,  sales:  276000,   dwell:64, stock:189, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/153347/t50.list1_6a0c55a6c9c1b.gif'  },
  { reg_date:'2026-03-27', name:'jk3081', views: 931,  cart_count:  29,  purchase_count:  13,  cart_rate:  3.1,  purchase_rate: 1.4, total_rate:  4.5,  sales:  887700,   dwell:42, stock:106, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169795/t50.list1_6a0abcdbd24f0.gif'  },
  { reg_date:'2026-04-21', name:'bs8768', views: 737,  cart_count:  72,  purchase_count:  12,  cart_rate:  9.8,  purchase_rate: 1.6, total_rate: 11.4,  sales:  471900,   dwell:33, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170121/t50.list1_6a0cb03154cc5.gif'  },
  { reg_date:'2026-04-07', name:'jk3084', views: 944,  cart_count:  26,  purchase_count:  13,  cart_rate:  2.8,  purchase_rate: 1.4, total_rate:  4.1,  sales:  648700,   dwell:37, stock: 86, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169929/t50.list1_6a0aca5399e92.gif'  },
  { reg_date:'2026-03-27', name:'op16363', views: 949,  cart_count:  95,  purchase_count:   5,  cart_rate:   10,  purchase_rate: 0.5, total_rate: 10.5,  sales:  247500,   dwell:40, stock:209, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169799/t50.list1_6a0c4db7dd60f.gif'  },
  { reg_date:'2026-04-16', name:'sk7826', views: 849,  cart_count:  89,  purchase_count:   8,  cart_rate: 10.5,  purchase_rate: 0.9, total_rate: 11.4,  sales:  376000,   dwell:39, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170061/t50.list1_69fcb83ed4176.gif'  },
  { reg_date:'2026-04-17', name:'ts5012', views: 368,  cart_count:  44,  purchase_count:   4,  cart_rate:   12,  purchase_rate: 1.1, total_rate:   13,  sales:   76000,   dwell:39, stock: 55, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170083/t50.list1_6a0c8ad6338d6.gif'  },
  { reg_date:'2026-04-07', name:'nt5525', views: 546,  cart_count:  32,  purchase_count:   6,  cart_rate:  5.9,  purchase_rate: 1.1, total_rate:    7,  sales:  160800,   dwell:43, stock:178, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169943/t50.list1_6a0acb164b398.gif'  },
  { reg_date:'2026-05-07', name:'ts5023', views: 722,  cart_count:  37,  purchase_count:  13,  cart_rate:  5.1,  purchase_rate: 1.8, total_rate:  6.9,  sales:  258700,   dwell:27, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170233/t50.list1_6a09ebbd5ba45.gif'  },
  { reg_date:'2026-04-07', name:'ps5863', views: 626,  cart_count:  14,  purchase_count:   6,  cart_rate:  2.2,  purchase_rate:   1, total_rate:  3.2,  sales:  230000,   dwell:35, stock:186, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169933/t50.list1_6a0acbbf298dc.gif'  },
  { reg_date:'2026-04-21', name:'ts5016', views: 378,  cart_count:  42,  purchase_count:   4,  cart_rate: 11.1,  purchase_rate: 1.1, total_rate: 12.2,  sales:   99600,   dwell:27, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170123/t50.list1_6a0c49c17a18a.gif'  },
  { reg_date:'2026-04-24', name:'ts5020', views: 215,  cart_count:  14,  purchase_count:   3,  cart_rate:  6.5,  purchase_rate: 1.4, total_rate:  7.9,  sales:   69000,   dwell:35, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170191/t50.list1_6a09d7182be4e.gif'  },
  { reg_date:'2026-04-21', name:'bs8770', views: 540,  cart_count:  51,  purchase_count:   4,  cart_rate:  9.4,  purchase_rate: 0.7, total_rate: 10.2,  sales:  152000,   dwell:36, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170131/t50.list1_6a0caba765257.gif'  },
  { reg_date:'2026-04-21', name:'ts5017', views: 653,  cart_count:  25,  purchase_count:   4,  cart_rate:  3.8,  purchase_rate: 0.6, total_rate:  4.4,  sales:   66300,   dwell:39, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170135/t50.list1_6a0c85d70ea3c.gif'  },
  { reg_date:'2026-05-04', name:'st3091', views:1441,  cart_count:  62,  purchase_count:   6,  cart_rate:  4.3,  purchase_rate: 0.4, total_rate:  4.7,  sales:  192000,   dwell:33, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170231/t50.list1_6a0c80ec1b69e.gif'  },
  { reg_date:'2026-04-17', name:'nt5537', views: 345,  cart_count:   7,  purchase_count:   2,  cart_rate:    2,  purchase_rate: 0.6, total_rate:  2.6,  sales:   35800,   dwell:46, stock: 70, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170087/t50.list1_6a0c8e8188483.gif'  },
  { reg_date:'2026-04-30', name:'cd3676', views: 915,  cart_count:  26,  purchase_count:   2,  cart_rate:  2.8,  purchase_rate: 0.2, total_rate:  3.1,  sales:   72250,   dwell:36, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170229/t50.list1_6a0c7bde63a82.gif'  },
  { reg_date:'2024-07-10', name:'op15821', views: 134,  cart_count:   3,  purchase_count:   1,  cart_rate:  2.2,  purchase_rate: 0.7, total_rate:    3,  sales:   83000,   dwell:43, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/161633/t50.6699dc508ff9a.gif'  },
  { reg_date:'2026-04-07', name:'sk7811', views: 686,  cart_count:  15,  purchase_count:   1,  cart_rate:  2.2,  purchase_rate: 0.1, total_rate:  2.3,  sales:   48000,   dwell:32, stock: 92, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/169927/t50.list1_6a0ac296360a1.gif'  },
  { reg_date:'2026-05-11', name:'bs8777', views:  77,  cart_count:   1,  purchase_count:   1,  cart_rate:  1.3,  purchase_rate: 1.3, total_rate:  2.6,  sales:   46800,   dwell:29, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170237/t50.list1_6a0d1e791b360.gif'  },
  { reg_date:'2026-04-21', name:'bk173', views: 148,  cart_count:   2,  purchase_count:   1,  cart_rate:  1.4,  purchase_rate: 0.7, total_rate:    2,  sales:   36000,   dwell:40, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170139/t50.list1_6a0cb36f23925.gif'  },
  { reg_date:'2026-04-21', name:'nt5542', views: 190,  cart_count:   5,  purchase_count:   0,  cart_rate:  2.6,  purchase_rate:   0, total_rate:  2.6,  sales:       0,   dwell:41, stock:  1, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170109/t50.list1_6a04597348677.gif'  },
  { reg_date:'2022-06-20', name:'op14227', views: 134,  cart_count:   5,  purchase_count:   0,  cart_rate:  3.7,  purchase_rate:   0, total_rate:  3.7,  sales:       0,   dwell:32, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/130179/t50.1656989472_0.gif'  },
  { reg_date:'2026-05-11', name:'ps5891', views:  37,  cart_count:   1,  purchase_count:   0,  cart_rate:  2.7,  purchase_rate:   0, total_rate:  2.7,  sales:       0,   dwell:34, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/170251/t50.list1_6a0c2506990f1.gif'  },
  { reg_date:'2025-03-17', name:'nt5048', views:   5,  cart_count:   0,  purchase_count:   0,  cart_rate:    0,  purchase_rate:   0, total_rate:    0,  sales:       0,   dwell:38, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/165428/t50.681d8c588d4f4.gif'  },
  { reg_date:'2025-05-26', name:'bs8254', views:  71,  cart_count:   1,  purchase_count:   0,  cart_rate:  1.4,  purchase_rate:   0, total_rate:  1.4,  sales:       0,   dwell:28, stock:  0, thumb_url:'https://atimg.sonyunara.com/files/attrangs/goods/166856/t50.684a8c56b4465.gif'  }
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
      <a href="https://at.snfg.kr/sho/index.php?code=goodsUpdate&index_no=${idx}" target="_blank" class="link-btn" title="어드민 수정" onclick="event.stopPropagation()">⚙️</a>
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

// ─── 헤더 메타 ──────────────────────────────────────────────────────
document.getElementById('analysis-date').textContent = '조회기간: 2026.5.17 ~ 2026.5.20';
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
          <div class="hero-name">${p.name} ${stockBadge(p.stock, p.sales)}</div>
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
        <div class="growth-name">${p.name}</div>
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
      <div class="action-name">${p.name}</div>
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
      <div class="action-name">${p.name}</div>
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
      <div class="action-name">${p.name}</div>
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
      <div class="action-name">${p.name}</div>
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
      <div class="action-name">${p.name}</div>
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
      <div class="action-name">${p.name}</div>
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
      <div class="improve-name">${p.name}</div>
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
          <div><span class="prod-name-text">${p.name}</span>${getLinks(p)}<br/><span style="font-size:10px;color:#555">${p.reg_date}</span></div>
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
