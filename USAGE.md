# Component Copy Plugin - Kullanım Rehberi

## Temel Kullanım

### 1. Plugin'e Erişim

Strapi admin panelinde sol menüden **Plugins > Component Copy** seçeneğine tıklayın.

### 2. Sayfa Seçimi

- **Source Page (Kaynak Sayfa)**: Component'leri kopyalamak istediğiniz sayfayı seçin
- **Target Page (Hedef Sayfa)**: Component'lerin kopyalanacağı sayfayı seçin

### 3. Component Kopyalama

1. Source Page panelinden bir component'i seçin
2. Component'i sürükleyip Target Page paneline bırakın
3. Component belirtilen pozisyona kopyalanacaktır

### 4. Component Sıralama

Target Page panelinde component'leri sürükleyerek sıralayabilirsiniz:
- Component'i tutun ve istediğiniz pozisyona sürükleyin
- Component otomatik olarak yeni pozisyonuna taşınacaktır

### 5. Değişiklikleri Kaydetme

1. Yaptığınız değişiklikler otomatik olarak draft olarak kaydedilir
2. Değişiklikleri yayınlamak için **Publish** butonuna tıklayın
3. Başarılı olduğunda bir onay mesajı görüntülenecektir

## Özellikler

### Aynı Sayfada Kopyalama

Aynı sayfayı hem source hem de target olarak seçebilirsiniz:
- Bu durumda component'ler duplicate (çoğaltılır) olur
- Aynı sayfa içinde component'leri çoğaltabilirsiniz

### Detaylı Bilgi Görüntüleme

Component kopyalandıktan sonra:
- Başarı mesajına tıklayarak detaylı bilgi modal'ını açabilirsiniz
- Hangi alanların kopyalandığını görebilirsiniz
- Hangi alanların kopyalanamadığını (örn: sistem alanları) görebilirsiniz
- Media dosyalarının kopyalanma durumunu görebilirsiniz

### Component Önizleme

Her component için:
- Component tipi (badge olarak gösterilir)
- Component içeriğinin önizlemesi (title, description vb.)
- Drag handle (sürükleme için)

## Kullanım Senaryoları

### Senaryo 1: Yeni Sayfaya Component Kopyalama

1. Source Page: "Ana Sayfa"
2. Target Page: "Hakkımızda"
3. Ana Sayfa'dan Hero Section'ı sürükle
4. Hakkımızda sayfasına bırak
5. Publish et

### Senaryo 2: Aynı Sayfada Component Çoğaltma

1. Source Page: "İletişim"
2. Target Page: "İletişim" (aynı sayfa)
3. Form Section'ı sürükle
4. Aynı sayfanın sonuna bırak
5. Publish et

### Senaryo 3: Component Sıralama

1. Target Page'i seç
2. Component'leri istediğiniz sıraya göre sürükle
3. Değişiklikler otomatik kaydedilir
4. Publish et

## İpuçları

1. **Çoklu Kopyalama**: Şu anda bir seferde bir component kopyalanabilir. Birden fazla component için işlemi tekrarlayın.

2. **Undo**: Şu anda geri alma özelliği yok. Değişikliklerden önce yedek alın.

3. **Publish**: Draft olarak kaydedilen değişiklikler yayınlanana kadar frontend'de görünmez.

4. **Media Dosyaları**: Media dosyaları referans olarak kopyalanır, yeni dosya oluşturulmaz.

5. **Relations**: Single type relation'lar (örneğin siteSettings) kopyalanır ancak target sayfada mevcut relation kullanılır.

## Kısıtlamalar

1. **System Fields**: `id`, `documentId`, `createdAt`, `updatedAt`, `createdBy`, `updatedBy`, `publishedAt`, `locale` gibi sistem alanları otomatik olarak kaldırılır.

2. **Complex Relations**: Çok karmaşık relation'lar kopyalanmayabilir. Test edin.

3. **Validation**: Component schema'larındaki validation kurallarına uygun veriler gerekir.

4. **Permissions**: Gerekli izinlere sahip olmanız gerekir.

## Sorun Giderme

### Component kopyalanmıyor

- İzinleri kontrol edin
- Browser console'da hata var mı bakın
- Network tab'inde API isteği başarılı mı kontrol edin

### Modal açılmıyor

- Tarayıcı cache'ini temizleyin
- Sayfayı yenileyin (F5)
- Strapi'yi yeniden başlatın

### Component'ler görünmüyor

- Sayfaların yayınlandığından emin olun
- Dynamic zone'ın doğru yapılandırıldığını kontrol edin
- Component'lerin populate edildiğinden emin olun

