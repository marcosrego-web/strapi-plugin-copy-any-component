# GitHub'a Yükleme Talimatları

## 🚀 Adım Adım

### 1. GitHub'da Repository Oluşturun

1. https://github.com/new adresine gidin
2. **Repository name**: `strapi-plugin-copy-any-component`
3. **Description**: `A powerful Strapi plugin for copying components between pages with drag & drop`
4. **Visibility**: **Public** seçin
5. ⚠️ **ÖNEMLİ**: README, .gitignore, veya license **EKLEMEYİN** (zaten var)
6. **Create repository** butonuna tıklayın

### 2. Push Komutları

Repository'yi oluşturduktan sonra aşağıdaki komutu çalıştırın:

```bash
cd /Users/metehanpath/Desktop/strapi/src/plugins/my-simple-plugin
git push -u origin main
```

### 3. Alternatif: Manuel Push

Eğer yukarıdaki komut çalışmazsa:

```bash
cd /Users/metehanpath/Desktop/strapi/src/plugins/my-simple-plugin

# Remote'u kontrol edin
git remote -v

# Eğer remote yoksa ekleyin (kullanıcı adınız farklıysa değiştirin)
git remote add origin https://github.com/metehankasapp/strapi-plugin-copy-any-component.git

# Push edin
git push -u origin main
```

### 4. GitHub'da Kontrol

Push işlemi tamamlandıktan sonra:

1. https://github.com/metehankasapp/strapi-plugin-copy-any-component adresine gidin
2. Dosyaların yüklendiğini kontrol edin
3. **Settings** → **General** → **Topics** bölümünden şu topic'leri ekleyin:
   - `strapi`
   - `strapi-plugin`
   - `cms`
   - `content-management`
   - `drag-and-drop`
   - `components`
   - `strapi-v5`

### ✅ Tamamlandı!

Repository başarıyla oluşturulduktan sonra:
- **README.md** dosyası otomatik olarak görünecek
- **Topics** ekleyerek arama sonuçlarında daha görünür olacaksınız
- NPM'e yayınlamak için `DEPLOY.md` dosyasına bakın

