# Sağlayıcı Ücret Teyidi

**Neden:** `lib/pricing.ts`'teki ücret matrisi doğrulanmamış pazar varsayımı. Rakamlar gerçek, isimli
şirketlere atfediliyor. Teyit gelene kadar `FEES_VERIFIED = false` ve hiçbir ücret rakamı sitede,
True Price kartında veya AI concierge'de gösterilmiyor.

**Teyit gelince:** rakamları aşağıdaki tabloya işle, `lib/pricing.ts`'te `FEES_VERIFIED = true` yap.
Ücret matrisi provider sayfalarında, True Price kartında ve concierge'de otomatik geri gelir —
başka hiçbir yeri değiştirmeye gerek yok.

---

## Gönderilecek mesaj (her sağlayıcıya ayrı, WhatsApp)

> Merhaba [FİRMA ADI],
>
> Rent Market AE olarak sizi platformumuzda listeliyoruz. Müşterilere fiyatı **sürprizsiz**
> göstermek istiyoruz — yani kiralama bedelinin yanında gerçekte ne ödeyeceklerini de.
>
> Bunun için aşağıdaki 6 bilgiyi yazılı olarak teyit etmenizi rica ediyoruz. Verdiğiniz rakamları
> firmanızın adıyla birlikte sitede yayınlayacağız, o yüzden doğru olması ikimiz için de önemli:
>
> 1. **Sigorta muafiyeti (excess):** Hasar durumunda müşterinin sorumlu olduğu üst limit kaç AED?
> 2. **Günlük km limiti:** Kiralamaya dahil günlük km kaç? Aşımda km başına kaç AED?
> 3. **Kapıya teslim ücreti:** Kaç AED? Kaç günlük kiralamadan sonra ücretsiz oluyor?
> 4. **Salik:** Geçiş başına AED 4'ü olduğu gibi mi yansıtıyorsunuz, yoksa üzerine idari ücret
>    ekliyor musunuz? Ekliyorsanız ne kadar?
> 5. **Depozito iade süresi:** Depozito bloke ediliyorsa kaç gün sonra çözülüyor?
> 6. **Havalimanı teslimatında ek ücret** var mı? **Geç iade** ücreti var mı (saatlik)?
>
> Teşekkürler.

**Not:** 4. soru kritik. Rakip firmaların çoğu Salik'e idari ücret ekliyor (geçiş fiilen AED 5–6
oluyor) ve bunu yazmıyor. Bizim sağlayıcılarımız eklemiyorsa, bunu açıkça yazmak sitedeki en güçlü
tek cümle olur.

---

## Gelen cevapları buraya işle

| Sağlayıcı | Muafiyet (AED) | Km/gün | Aşım (AED/km) | Teslim (AED) | Ücretsiz teslim (gün) | Salik idari ücret | Depozito iade (gün) | Teyit tarihi |
|---|---|---|---|---|---|---|---|---|
| 4 HIRE | | | | | | | | |
| HABIB CAR | | | | | | | | |
| EXOTIC CAR | | | | | | | | |
| ROYAL DRIVE | | | | | | | | |
| ELITE DRIVE | | | | | | | | |

### Mevcut (DOĞRULANMAMIŞ) varsayımlar — karşılaştırmak için

Bunlar şu an `pricing.ts`'te duran tahminler. Gelen cevapla tutmuyorsa, **cevap doğrudur**.

| Sağlayıcı | Muafiyet | Km/gün | Aşım | Teslim | Ücretsiz teslim |
|---|---|---|---|---|---|
| 4 HIRE | 1.500 | 250 | 0,5 | 75 | 3 gün |
| HABIB CAR | 1.000 | 300 | 0,5 | 50 | 3 gün |
| EXOTIC CAR | 5.000 | 200 | 2 | 0 | 1 gün |
| ROYAL DRIVE | 2.000 | 250 | 1 | 75 | 3 gün |
| ELITE DRIVE | 2.500 | 250 | 1 | 0 | 1 gün |
