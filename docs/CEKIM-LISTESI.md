# 📸 Çekim Listesi — Yeni Araç Görselleri (12 adet)

Mevcut filo görselleriyle **birebir aynı dil**: koyu stüdyo, yumuşak tepe spotu,
parlak zeminde hafif yansıma, **3/4 sol ön açı**, araç kadrajın ortasında, 4:3 oran.

## Ortak prompt şablonu (ChatGPT/DALL-E vb. için)

> Professional automotive studio photograph of a **[YIL RENK MARKA MODEL]**,
> three-quarter front view from the left, dark charcoal studio background,
> soft overhead spotlight, glossy dark floor with subtle reflection,
> no people, no text, no watermark, photorealistic, 4:3 aspect ratio

Üretince dosyayı `public/cars/` içine **tam bu adla** kaydet (uzantı .png) —
kod değişikliği gerekmez, placeholder otomatik yerini bırakır. İstersen bana
gönder, ben yerleştiririm.

## DESERT KINGS (6 araç)

| # | Dosya adı | Araç | Önerilen renk | Not |
|---|---|---|---|---|
| 1 | `defender-110-2024.png` | 2024 Land Rover Defender 110 | Pangea Green veya Gondwana Stone | Roof rack olabilir |
| 2 | `landcruiser-gr-2024.png` | 2024 Toyota Land Cruiser 300 GR Sport | Beyaz (Precious White) | GR Sport ızgarası: "TOYOTA" yazılı |
| 3 | `bronco-2023.png` | 2023 Ford Bronco Wildtrak 4 kapı | Cyber Orange | Büyük off-road lastikleri |
| 4 | `wrangler-rubicon-2024.png` | 2024 Jeep Wrangler Rubicon 4 kapı | Firecracker Red | Kaput üzerinde RUBICON yazısı |
| 5 | `patrol-nismo-2024.png` | 2024 Nissan Patrol NISMO | Beyaz + kırmızı NISMO aksanları | Dubai ikonu, agresif ön tampon |
| 6 | `tahoe-z71-2023.png` | 2023 Chevrolet Tahoe Z71 | Siyah (Black) | Z71 off-road paketi görünümü |

## CITY DRIVE (6 araç)

| # | Dosya adı | Araç | Önerilen renk | Not |
|---|---|---|---|---|
| 7 | `tesla-model3-2024.png` | 2024 Tesla Model 3 (Highland makyajlı) | Ultra Red veya Pearl White | Yeni ince farlı yüz |
| 8 | `corolla-2024.png` | 2024 Toyota Corolla sedan | Celestite Gray | Hybrid rozeti olabilir |
| 9 | `elantra-2024.png` | 2024 Hyundai Elantra | Amazon Gray | Keskin çizgili yeni kasa |
| 10 | `sportage-2024.png` | 2024 Kia Sportage | Vesta Blue | Bumerang gündüz farları |
| 11 | `cx5-2024.png` | 2024 Mazda CX-5 | Soul Red Crystal | Mazda'nın imza kırmızısı |
| 12 | `mg-gt-2024.png` | 2024 MG GT fastback | Beyaz veya kırmızı | Sportif fastback silüet |

## Kontrol listesi (her görsel için)
- [ ] Koyu stüdyo fonu (mevcut Mustang/G63 görselleriyle aynı ton)
- [ ] 3/4 sol ön açı, araç tamamen kadrajda
- [ ] Zeminde hafif yansıma var
- [ ] Yazı/watermark/insan YOK
- [ ] Doğru model yılı ve gövde tipi (yukarıdaki notlara dikkat)
- [ ] 4:3 oran, en az 1200px genişlik
- [ ] Dosya adı listeyle birebir aynı

## Sonraki adım (opsiyonel)
Görseller hazır olunca Supabase Storage'a da yükleyebiliriz (app de kullanır) —
şimdilik website `public/cars/` üzerinden çalışıyor.
