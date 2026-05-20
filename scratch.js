const https = require('https');
https.get('https://attrangs.co.kr/shop/search.php?search_text=ps4533', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const fs = require('fs');
    fs.writeFileSync('attrangs_html.txt', data);
    console.log('done');
  });
});
