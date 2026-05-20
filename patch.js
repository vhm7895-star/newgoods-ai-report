const fs = require('fs');
let code = fs.readFileSync('dashboard.js', 'utf-8');
code = code.replace(/<img src="https:\/\/picsum\.photos\/seed\/\$\{p\.name\}\/(\d+)\/(\d+)"/g, '<img src="${p.thumb_url || `https://picsum.photos/seed/${p.name}/$1/$2`}"');
fs.writeFileSync('dashboard.js', code);
console.log('patched');
