import urllib.request
import re

url = 'https://attrangs.co.kr/shop/search.php?search_text=ps4533'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    img_matches = re.findall(r'<img[^>]+src=[\"\']([^\"\']+)[\"\']', html)
    for img in img_matches:
        if 'ps4533' in img or 'data/item' in img or 'thumb' in img:
            print(img)
except Exception as e:
    print('Error:', e)
