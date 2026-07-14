# Rent Market AE — Yeni Nesil Rebuild Blueprint
*Karar tarihi: 12 Tem 2026 — Üç sütun, fazlı yaklaşım onaylandı*

## Konumlandırma
**"Sorma. Bekleme. Sürpriz yok."**
Az ama doğrulanmış envanter (curated & guaranteed) — OneClickDrive ile ilan yarışı YOK.

## Pazar ağrıları (fark buradan doğar)
1. Gizli maliyetler: ilan fiyatı ≠ ödenen fiyat (depozito, sigorta excess, km limiti, Salik, teslim ücreti)
2. WhatsApp yazışma sürünmesi: müsaitlik/fiyat/depozito ping-pongu
3. Güvensizlik: IG/WhatsApp'taki yüzlerce doğrulanmamış firma

## Üç Sütun

### 1. AI Concierge (ana fark — Faz 1)
- Uygulamanın kalbi konuşma: "Cuma-pazartesi, 500 AED/gün, depozitosuz SUV" → toplam maliyetiyle 3 öneri
- Sigorta / km limiti / Salik / depozito sorularına anında cevap
- TR / EN / AR / RU
- Sonuç: tek dokunuşla WhatsApp'a hazır rezervasyon özeti
- Teknoloji: Orphea AI Concierge'in Rent Market vertical fork'u (Claude API + tool use: search_cars, quote_total)
- Dubai'de hiçbir kiralama platformunda yok; ayrıca Orphea ajansının canlı ürün demosu

### 2. True Total Price (güven farkı — Faz 1)
- Her araçta standart kart: N günlük GERÇEK toplam = kira (haftalık/aylık kırılımlı) + sigorta + teslim + depozito bloke ayrı gösterim + tahmini Salik
- "Sürpriz Yok" rozeti — 5 sağlayıcıyla fiyat garantisi anlaşması
- İlk sürümde per-provider ücret matrisi lib/pricing.ts'te (DB'ye Faz 2'de taşınır)

### 3. Anında Müsaitlik + 60sn Rezervasyon (deneyim farkı — Faz 2)
- Gerçek zamanlı müsaitlik takvimi (Supabase: bookings/blocks tablosu)
- In-app "Reserve": ödemesiz, ücretsiz iptal, sağlayıcı 15 dk onay SLA
- Faz 3: kapıya teslim canlı takip, doğrulanmış yorumlar, fiyat alarmları

## Fazlar
| Faz | Kapsam | Platform |
|---|---|---|
| **1** | AI Concierge (web önce, sonra app) + True Price kartları + pricing matrisi | Website + Build 18 |
| **2** | Müsaitlik takvimi (DB), in-app Reserve, sağlayıcı onay mini-paneli | Website + App |
| **3** | Canlı teslim takibi, yorum sistemi, fiyat alarmı, AR önizleme (ops.) | App ağırlıklı |

## Yapmayacaklarımız
- İlan sayısı yarışı (OneClickDrive olamayız, olmayacağız)
- Faz 1-2'de ödeme entegrasyonu
- Araç sahipliği / filo

## Teknik notlar
- Supabase DDL (yeni tablolar) dashboard SQL editor'den — kullanıcıyla birlikte
- Concierge API: Next.js route → Claude API (ANTHROPIC_API_KEY Vercel env'e eklenecek)
- App tarafında concierge: yeni tab, Build 18 hedefi
