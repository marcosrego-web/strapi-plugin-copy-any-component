# NPM Publish - 2FA Ayarları

npm yayınlamak için **2FA (Two-Factor Authentication)** gerekiyor.

## 🔐 Seçenek 1: 2FA Aktif Etme (Önerilen)

1. **npm hesabınıza gidin:**
   - https://www.npmjs.com/settings/metehankasap/profile

2. **"Enable two-factor authentication"** bölümünü bulun

3. **"Enable 2FA"** butonuna tıklayın

4. **QR kodu tarayın** (Google Authenticator, Authy gibi uygulamalar)

5. **Doğrulama kodunu girin**

6. **Tekrar publish deneyin:**
   ```bash
   cd /Users/metehanpath/Desktop/strapi/src/plugins/my-simple-plugin
   npm publish --access public
   ```

## 🔑 Seçenek 2: Granular Access Token (2FA Bypass ile)

Eğer 2FA aktif etmek istemiyorsanız:

1. **Access Token oluşturun:**
   - https://www.npmjs.com/settings/metehankasap/tokens
   - "Generate New Token" → "Granular Access Token"
   - **Automation** tipini seçin
   - **"Bypass 2FA for publishing"** seçeneğini işaretleyin
   - Scope: `write:packages` seçin
   - Token'ı kopyalayın

2. **Token ile login:**
   ```bash
   npm login --auth-type=legacy
   # Username: metehankasap
   # Password: [Token'ı yapıştırın]
   # Email: [email adresiniz]
   ```

3. **Tekrar publish deneyin:**
   ```bash
   npm publish --access public
   ```

## ✅ 2FA Aktif Edildikten Sonra

```bash
cd /Users/metehanpath/Desktop/strapi/src/plugins/my-simple-plugin
npm publish --access public
```

Yayınlama sırasında 2FA kodu istenecek, uygulamanızdan kodu girip devam edin.

## 📦 Package Bilgileri

- **Package Name**: `@metehankasap/strapi-plugin-copy-any-component`
- **Version**: `1.0.0`
- **NPM URL**: https://www.npmjs.com/package/@metehankasap/strapi-plugin-copy-any-component

## 🎉 Başarılı Publish Sonrası

Package yayınlandıktan sonra:

1. GitHub'a değişiklikleri push edin:
   ```bash
   git push
   ```

2. npm'de package'ı kontrol edin:
   - https://www.npmjs.com/package/@metehankasap/strapi-plugin-copy-any-component

3. README'yi güncelleyin (npm badge ekleyin)

