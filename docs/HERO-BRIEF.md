# Hero Görseli — Higgsfield Brief

**Karar:** Görsel YAZISIZ üretilecek. Slogan ve marka ismi görselin üstüne canlı metin olarak
bindirilecek (web'de HTML, app'te RN `<Text>`). Sebep: gömülü yazı çevrilemez (AR/TR planı var),
SEO'da okunmaz, ekran okuyucu göremez, ve farklı ekran oranlarında kırpılıp okunmaz hale gelir.

**Ölçüler:**

| Kullanım | Boyut | Oran | Not |
|---|---|---|---|
| **Ana render** | 2880 × 1200 | 2.4:1 | Web masaüstü hero + app hero bundan kırpılır |
| App hero | 1206 × 600 | 2:1 | Ana render'dan merkez kırpım (@3x, 402×200 pt) |
| Mobil web (ops.) | 1200 × 1500 | 4:5 | İstersen ayrı dikey render — yoksa ana render `object-cover` ile kullanılır |

**Format:** JPEG (kalite 85) — hero fotoğrafik, PNG gereksiz büyük olur.
Hedef dosya boyutu: masaüstü < 350 KB, app < 150 KB.

---

## ÖNEMLİ: Kompozisyon kuralı

Slogan sol tarafa (web) / sol-alta (app) binecek. O yüzden:

- **Sol %35'lik alan sakin kalsın** — düz gökyüzü, kum, duvar. Araç detayı, yüksek kontrast,
  karmaşık doku OLMASIN. Yazı oraya oturacak.
- Araçlar **sağ %60'lık alanda** toplansın.
- Görsel açık tonlu olduğu için üstüne **koyu metin** koyacağız — o yüzden sol alan **açık ve
  yumuşak** olmalı (beyaz/krem/açık kum). Parlak beyaz patlamalar da olmasın, metin kaybolur.

---

## Higgsfield prompt (İngilizce — kopyala yapıştır)

```
Wide cinematic automotive lifestyle photograph, three luxury rental cars parked side by side
in a shallow arc, three-quarter front view, on a pale sand-coloured concrete plaza in Dubai.

Cars, left to right: a white grand tourer coupé, a light silver luxury SUV, a cream-white
executive sedan. Clean unbranded bodywork, no visible logos, no number plates, no text of any kind.

Setting: soft early-morning Dubai light, warm but airy. Pale limestone and glass architecture
softly out of focus in the background, hazy modern skyline, no recognisable landmark.
Light, bright, premium palette: ivory, warm sand, soft champagne, pale grey. NOT dark,
NOT moody, NOT night.

Composition: the left third of the frame is deliberately empty and calm — open pale sky and
plaza, low detail, smooth gradient, so text can be overlaid there. Cars grouped in the right
two thirds. Generous negative space. Horizon low.

Style: editorial car campaign photography, medium telephoto (85mm), shallow depth of field,
crisp on the cars, gentle bokeh behind. Natural soft shadows, subtle ground reflection.
No people. No text, no watermark, no logo, no lettering anywhere in the image.

Aspect ratio 2.4:1, ultra high resolution.
```

**Negatif prompt (alan varsa):**
```
text, letters, words, watermark, logo, brand badge, number plate, signature, people, crowd,
dark, night, moody, neon, heavy contrast, cluttered background, fisheye, distorted wheels,
extra wheels, melted bodywork
```

---

## Kalite kontrolü — üretilen görseli kabul etmeden önce bak

AI araç görsellerinde en sık bozulan yerler:

1. **Tekerlekler** — elips yerine yumurta şekli, jant çubukları eğri, 5 yerine 6 tekerlek.
2. **Yazı** — "no text" dediğimiz hâlde plakaya/duvara saçma harfler basabilir. Varsa reddet.
3. **Marka rozetleri** — gerçek marka logosu çıkarsa telif riski, reddet.
4. **Yansımalar** — cam ve kaportadaki yansımalar tutarsızsa göze batar.
5. **Sol alan** — gerçekten sakin mi? Yazı oraya okunur şekilde binecek mi?

Birkaç varyasyon üret, en temiz tekerlekli olanı seç. Tekerlek düzeltmesi Photoshop'suz zordur.

---

## Görsel hazır olunca

Dosyaları şuraya koy:

```
~/rent-market-ae/public/hero/hero-banner.jpg        (2880×1200)
~/Desktop/rent-marketV14/rent-market-ae-mobile/assets/hero-banner.jpg   (1206×600)
```

App'te görsel **yerel asset** olacak (uzak URL değil) — çünkü hero'nun boş çıkmasının sebebi tam
olarak siteye verilmiş, hiç yayınlanmamış bir uzak URL'ydi. Yerel asset'te bu imkânsız.

Sonra bana söyle, ikisini de bağlarım:
- Web: `HeroBanner.tsx` tam genişlik banner'a döner, slogan üstüne biner
- App: `index.tsx` hero'su bu asset'i kullanır, slogan üstünde kalır
