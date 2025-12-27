# Copy Any Component Plugin - Test Rehberi

Bu rehber, plugin'i test etmek için adım adım talimatlar içerir.

## 1. Temel Test

### Adım 1: Strapi'yi Başlatın

```bash
npm run develop
```

### Adım 2: Admin Panelinde Plugin'e Erişin

1. Strapi admin panelinde giriş yapın
2. Sol menüden **Plugins > Copy Any Component 🎨** seçeneğine tıklayın

### Adım 3: Sayfaları Kontrol Edin

- Source Page (sol panel) ve Target Page (sağ panel) dropdown'larından sayfaları görebilmelisiniz
- Eğer sayfa yoksa, önce Content Manager'da birkaç sayfa oluşturun

### Adım 4: Component Kopyalama Testi

1. **Source Page** seçin (örneğin: "Ana Sayfa")
2. **Target Page** seçin (örneğin: "Hakkımızda")
3. Source Page panelinden bir component'i seçin
4. Component'i sürükleyip Target Page paneline bırakın
5. Başarı mesajını görmelisiniz
6. Target Page panelinde yeni component görünmeli

### Adım 5: Kopyalanan Component'i Kontrol Edin

1. Content Manager > Pages > Target Page'e gidin
2. Sayfayı düzenle modunda açın
3. Kopyalanan component'in tüm field'larının doğru kopyalandığını kontrol edin:
   - Text field'lar
   - Media dosyaları
   - Nested component'ler (button, form-field, vb.)
   - Relation field'lar

### Adım 6: Publish Testi

1. Plugin arayüzüne geri dönün
2. **Publish** butonuna tıklayın
3. Başarı mesajını görmelisiniz
4. Frontend'de değişikliklerin göründüğünü kontrol edin

## 2. Farklı Component Tipleri Testi

Her component tipini test edin:

- ✅ **Hero Section** - Basit component
- ✅ **CTA Section** - Button component'leri içeren
- ✅ **Stats Section** - Relation (siteSettings) içeren
- ✅ **Form Section** - Nested form-field component'leri içeren
- ✅ **Gallery Section** - Media array içeren
- ✅ **Accordion Section** - Nested accordion-item component'leri içeren
- ✅ **Pricing Section** - Nested pricing-plan component'leri içeren
- ✅ **Timeline Section** - Nested timeline-item component'leri içeren

Her bir component tipinde:
- Tüm field'ların kopyalandığını doğrulayın
- Nested component'lerin kopyalandığını doğrulayın
- Media dosyalarının referanslarının korunduğunu doğrulayın

## 3. Aynı Sayfada Kopyalama Testi

1. Aynı sayfayı hem Source hem de Target olarak seçin
2. Bir component'i kopyalayın
3. Component'in duplicate (çoğaltıldığını) doğrulayın
4. Publish edin ve sonucu kontrol edin

## 4. Component Sıralama Testi

1. Target Page panelinde component'leri seçin
2. Component'leri sürükleyerek sıralayın
3. Değişikliklerin otomatik kaydedildiğini kontrol edin
4. Publish edin ve sonucu kontrol edin

## 5. Farklı Content Type Testi (OPSİYONEL)

Eğer farklı bir content type kullanmak istiyorsanız:

### Adım 1: Config'i Güncelleyin

`config/plugins.ts` dosyasını düzenleyin:

```typescript
export default () => ({
  'copy-any-component': {
    enabled: true,
    resolve: './src/plugins/my-simple-plugin',
    config: {
      contentType: 'api::article.article',  // Farklı content type
      dynamicZoneField: 'blocks',            // Farklı field name
    },
  },
});
```

### Adım 2: Strapi'yi Yeniden Başlatın

```bash
npm run develop
```

### Adım 3: Yeni Content Type ile Test Edin

1. Content Manager'da yeni content type'dan kayıtlar oluşturun
2. Plugin arayüzünde yeni kayıtları görebilmelisiniz
3. Component kopyalama işlemini test edin

## 6. Hata Senaryoları Testi

### Test 1: İzin Hatası

1. Gerekli izinleri kapatın (Settings > Users & Permissions > Roles)
2. Component kopyalamayı deneyin
3. Uygun hata mesajını görmelisiniz

### Test 2: Geçersiz Sayfa ID

1. Network tab'ını açın
2. Component kopyalama işlemini başlatın
3. API request'ini düzenleyip geçersiz ID gönderin
4. Uygun hata mesajını görmelisiniz

## 7. Performance Testi

1. Çok sayıda component içeren bir sayfa oluşturun (10+ component)
2. Tüm component'leri tek tek kopyalayın
3. İşlemlerin makul bir sürede tamamlandığını kontrol edin

## 8. Browser Console Testi

1. Browser Developer Tools'u açın (F12)
2. Console tab'ına geçin
3. Component kopyalama işlemini yapın
4. Herhangi bir JavaScript hatası olmadığını doğrulayın
5. Network tab'ında API isteklerinin başarılı olduğunu kontrol edin

## 9. Detaylı Bilgi Modal Testi

1. Bir component'i kopyalayın
2. Başarı mesajına tıklayın
3. Detaylı bilgi modal'ının açıldığını kontrol edin
4. Şu bilgileri doğrulayın:
   - Kopyalanan field sayısı
   - Media dosyaları
   - Kaldırılan sistem field'ları (id, createdAt, vb.)

## 10. Frontend Render Testi

1. Component'leri kopyalayın ve publish edin
2. Frontend'de sayfayı açın
3. Tüm component'lerin doğru render edildiğini kontrol edin:
   - Stil'ler doğru mu?
   - İçerik doğru mu?
   - Media dosyaları görünüyor mu?
   - Nested component'ler çalışıyor mu?

## Beklenen Sonuçlar

✅ **Başarılı Senaryolar:**
- Component'ler sorunsuz kopyalanır
- Tüm field'lar korunur
- Media referansları korunur
- Nested component'ler kopyalanır
- Publish işlemi başarılı olur

❌ **Hata Senaryoları:**
- İzin hatası mesajı gösterilir
- Geçersiz sayfa hatası gösterilir
- Network hataları uygun şekilde handle edilir

## Sorun Giderme

### Component'ler görünmüyor
- Sayfaların publish edildiğinden emin olun
- Browser cache'ini temizleyin
- Strapi'yi yeniden başlatın

### Component kopyalanmıyor
- Browser console'da hata var mı kontrol edin
- Network tab'ında API isteklerini kontrol edin
- İzinlerin doğru ayarlandığını kontrol edin

### Field'lar kayboluyor
- Browser console log'larını kontrol edin
- Component schema'sını kontrol edin
- Media field'larının doğru populate edildiğinden emin olun

