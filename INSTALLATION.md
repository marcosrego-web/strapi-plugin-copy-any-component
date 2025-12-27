# Component Copy Plugin - Kurulum Rehberi

Bu rehber, Component Copy plugin'ini başka bir Strapi projesinde kullanmak için gerekli adımları içerir.

## Önkoşullar

- Strapi 5.0.0 veya üzeri
- Node.js 20.x veya üzeri
- Mevcut bir Page content type'ı (sections dynamic zone ile)

## Kurulum Adımları

### 1. Plugin'i Kopyalayın

Plugin klasörünü hedef Strapi projenizin `src/plugins/` dizinine kopyalayın:

```bash
# Mevcut projeden
cp -r /path/to/source/strapi/src/plugins/my-simple-plugin /path/to/target/strapi/src/plugins/

# veya Git kullanarak
git clone <repository-url> /path/to/target/strapi/src/plugins/my-simple-plugin
```

### 2. Plugin'i Kaydedin

Hedef projede `config/plugins.ts` dosyasını düzenleyin:

```typescript
export default () => ({
  'my-simple-plugin': {
    enabled: true,
    resolve: './src/plugins/my-simple-plugin',
  },
});
```

Eğer `config/plugins.js` kullanıyorsanız:

```javascript
module.exports = {
  'my-simple-plugin': {
    enabled: true,
    resolve: './src/plugins/my-simple-plugin',
  },
};
```

### 3. Gerekli Content Type'ı Kontrol Edin

Plugin, `api::page.page` content type'ını kullanır. Bu content type'ın şu özelliklere sahip olması gerekir:

- **Dynamic Zone**: `sections` adında bir dynamic zone field
- **Slug**: Sayfaları tanımlamak için slug field'ı

Eğer farklı bir content type kullanıyorsanız, plugin kodunu düzenlemeniz gerekebilir.

#### Örnek Page Schema:

```json
{
  "kind": "collectionType",
  "collectionName": "pages",
  "info": {
    "singularName": "page",
    "pluralName": "pages",
    "displayName": "Page"
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "sections": {
      "type": "dynamiczone",
      "components": [
        // Component listesi buraya gelecek
      ]
    }
  }
}
```

### 4. İzinleri Ayarlayın

Strapi admin panelinde şu adımları izleyin:

1. **Settings > Users & Permissions > Roles** sayfasına gidin
2. İlgili role'ü seçin (örn: Authenticated, Public)
3. **My Simple Plugin** bölümünü bulun
4. Şu izinleri etkinleştirin:
   - `find` - Sayfaları listelemek için
   - `getPageSections` - Section'ları görmek için
   - `copySections` - Component'leri kopyalamak için
   - `updatePageSections` - Section'ları güncellemek için
   - `publish` - Sayfaları yayınlamak için

### 5. Strapi'yi Yeniden Başlatın

```bash
npm run develop
# veya production için
npm run build
npm run start
```

### 6. Plugin'i Kullanın

1. Strapi admin panelinde **Plugins** menüsüne gidin
2. **Component Copy** seçeneğini bulun
3. Plugin arayüzünü kullanarak component'leri kopyalayın

## Farklı Content Type Kullanımı

Eğer `page` yerine farklı bir content type kullanıyorsanız (örneğin `article`, `post`), plugin kodunda aşağıdaki dosyaları güncellemeniz gerekir:

1. `server/src/services/component-copy.js` - Tüm `api::page.page` referanslarını değiştirin
2. `strapi-server.js` - Controller'lardaki `api::page.page` referanslarını değiştirin
3. `admin/src/pages/HomePage.jsx` - API endpoint'lerini kontrol edin (genellikle değişmez)

**Örnek değişiklik:**

```javascript
// Eski
await strapi.entityService.findOne("api::page.page", pageId, ...)

// Yeni (article için)
await strapi.entityService.findOne("api::article.article", pageId, ...)
```

## Sorun Giderme

### Plugin görünmüyor

- `config/plugins.ts` dosyasının doğru yapılandırıldığından emin olun
- Strapi'yi yeniden başlatın
- `dist` klasörünü temizleyin: `rm -rf dist .cache`

### "Page not found" hatası

- Page content type'ının doğru şekilde oluşturulduğundan emin olun
- Slug field'ının mevcut olduğunu kontrol edin
- Sections dynamic zone'ın tanımlı olduğunu doğrulayın

### Component'ler kopyalanmıyor

- İzinlerin doğru ayarlandığından emin olun
- Browser console'da hata mesajlarını kontrol edin
- Network tab'inde API isteklerinin başarılı olduğunu doğrulayın

### Media dosyaları kopyalanmıyor

- Media library'de dosyaların mevcut olduğundan emin olun
- Media field'larının populate edildiğinden emin olun
- Component schema'larında media field'larının doğru tanımlandığını kontrol edin

## Önemli Notlar

1. **Bootstrap Fonksiyonu**: Mevcut projedeki `src/index.ts` dosyasında bootstrap kodu varsa, bu kod hedef projede çalışmayabilir. Bootstrap kodunu yalnızca test/development için kullanıyorsanız, production'da kaldırmak isteyebilirsiniz.

2. **Component'ler**: Plugin, dynamic zone içindeki tüm component'leri destekler. Kendi component'lerinizi kullanabilirsiniz.

3. **Performance**: Çok sayıda component'i kopyalarken performans etkilenebilir. Büyük component'ler için dikkatli olun.

4. **Backup**: Component kopyalama işleminden önce veritabanınızı yedeklemeyi unutmayın.

## Destek

Sorun yaşarsanız:
1. Browser console'da hata mesajlarını kontrol edin
2. Strapi log'larını inceleyin
3. Plugin'in doğru kurulduğundan emin olun
4. İzinlerin ayarlandığını doğrulayın

