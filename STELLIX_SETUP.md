# Steellix Scope ile NPM Publish

Package adı `@steellix/strapi-plugin-copy-any-component` olarak güncellendi.

## 📋 Yapılması Gerekenler

### Seçenek 1: Steellix Organization Oluşturma (Önerilen)

1. **npm'de organization oluşturun:**
   - https://www.npmjs.com/organizations/create
   - Organization name: `steellix`
   - Plan: **Free** (public packages için yeterli)

2. **Organization'ı kontrol edin:**
   - https://www.npmjs.com/org/steellix

3. **Publish edin:**
   ```bash
   cd /Users/metehanpath/Desktop/strapi/src/plugins/my-simple-plugin
   npm publish --access public
   ```

### Seçenek 2: Kullanıcı Adını Değiştirme

Eğer npm kullanıcı adınızı "steellix" olarak değiştirmek istiyorsanız:

1. **npm hesap ayarları:**
   - https://www.npmjs.com/settings/metehankasap/profile
   - ⚠️ **DİKKAT**: Kullanıcı adı değiştirmek karmaşık bir işlem ve bazı sorunlara yol açabilir

2. **Alternatif**: Organization oluşturmak daha kolay ve güvenlidir

### Seçenek 3: Unscoped Package (Scope Olmadan)

Eğer scope kullanmak istemiyorsanız:

```json
{
  "name": "strapi-plugin-copy-any-component"
}
```

⚠️ **Not**: Unscoped package'lar için isim çakışması riski vardır.

## ✅ Önerilen Yol

**Organization oluşturmak en iyi seçenektir** çünkü:
- Daha profesyonel görünür
- İsim çakışması riski yoktur
- Gelecekte ekibiniz büyürse kolayca yönetebilirsiniz
- Ücretsizdir (public packages için)

## 🚀 Publish Komutu

Organization'ı oluşturduktan sonra:

```bash
cd /Users/metehanpath/Desktop/strapi/src/plugins/my-simple-plugin
npm publish --access public
```

## 📦 Package Bilgileri

- **Eski ad**: `@metehankasap/strapi-plugin-copy-any-component`
- **Yeni ad**: `@steellix/strapi-plugin-copy-any-component`
- **NPM URL**: https://www.npmjs.com/package/@steellix/strapi-plugin-copy-any-component

## ⚠️ Önemli Notlar

1. **Eski package**: `@metehankasap/strapi-plugin-copy-any-component` npm'de kaldı
   - İsterseniz unpublish edebilirsiniz (72 saat içinde)
   - Ya da olduğu gibi bırakabilirsiniz

2. **GitHub URL**: GitHub repository URL'i değişmedi (isteğe bağlı değiştirilebilir)

3. **Version**: Yeni scope ile yeni bir package olarak `1.0.0` ile başlıyor

