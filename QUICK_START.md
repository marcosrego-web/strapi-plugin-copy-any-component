# Component Copy Plugin - Hızlı Başlangıç

## ✅ Kurulum Checklist

Başka bir Strapi projesinde plugin'i kullanmak için şu adımları izleyin:

### 1. Plugin'i Kopyalayın

```bash
# Mevcut projeden plugin klasörünü kopyalayın
cp -r /path/to/source/strapi/src/plugins/my-simple-plugin /path/to/target/strapi/src/plugins/
```

### 2. Plugin'i Kaydedin

`config/plugins.ts` dosyasına ekleyin:

```typescript
export default () => ({
  'my-simple-plugin': {
    enabled: true,
    resolve: './src/plugins/my-simple-plugin',
  },
});
```

### 3. İzinleri Ayarlayın

Strapi admin panelinde:
- **Settings > Users & Permissions > Roles**
- İlgili role seçin (Authenticated, Public, vb.)
- **My Simple Plugin** bölümündeki tüm izinleri etkinleştirin:
  - `find`
  - `getPageSections`
  - `copySections`
  - `updatePageSections`
  - `publish`

### 4. Strapi'yi Yeniden Başlatın

```bash
# Development
npm run develop

# Production
npm run build
npm run start
```

### 5. Plugin'i Kullanın

- Admin panelinde **Plugins > Component Copy** menüsüne gidin
- Component'leri kopyalayın ve sıralayın

## ⚠️ Önemli Notlar

1. **Page Content Type Gerekli**: Plugin `api::page.page` content type'ını kullanır. Bu content type'ın:
   - `sections` adında bir dynamic zone field'ı olmalıdır
   - `slug` field'ı olmalıdır

2. **Farklı Content Type**: Eğer farklı bir content type kullanıyorsanız, plugin kodunda `api::page.page` referanslarını değiştirmeniz gerekir.

3. **Bootstrap Kodu**: Mevcut projedeki `src/index.ts` dosyasındaki bootstrap kodu bu plugin'e özel değildir. İsterseniz hedef projede kullanmayabilirsiniz.

4. **Component'ler**: Plugin herhangi bir dynamic zone component'ini destekler. Kendi component'lerinizi kullanabilirsiniz.

## 🔧 Farklı Content Type Kullanımı

Eğer `page` yerine başka bir content type kullanıyorsanız:

1. `server/src/services/component-copy.js` dosyasında tüm `api::page.page` referanslarını değiştirin
2. `strapi-server.js` dosyasında controller'lardaki `api::page.page` referanslarını değiştirin

**Örnek:**
```javascript
// Eski
api::page.page

// Yeni (örneğin article için)
api::article.article
```

## 📚 Daha Fazla Bilgi

- **Detaylı Kurulum**: [INSTALLATION.md](./INSTALLATION.md)
- **Kullanım Rehberi**: [USAGE.md](./USAGE.md)
- **Genel Bilgiler**: [README.md](./README.md)

