# GitHub Repository Setup Guide

Bu rehber, plugin'inizi GitHub'a yüklemek için adım adım talimatlar içerir.

## 📋 Adım 1: GitHub Repository Oluşturma

1. [GitHub](https://github.com) hesabınıza giriş yapın
2. Sağ üst köşedeki **+** butonuna tıklayın → **New repository**
3. Repository bilgilerini doldurun:
   - **Repository name**: `strapi-plugin-copy-any-component`
   - **Description**: `A powerful Strapi plugin for copying components between pages with drag & drop`
   - **Visibility**: **Public** (açık kaynak için)
   - ⚠️ **ÖNEMLİ**: README, .gitignore, veya license **eklemeyin** (zaten var)

4. **Create repository** butonuna tıklayın

## 📦 Adım 2: Git Repository Hazırlama

Plugin dizininde terminal açın:

```bash
# Plugin dizinine gidin
cd src/plugins/my-simple-plugin

# Git zaten başlatılmışsa bu adımı atlayın
git init

# Tüm dosyaları ekleyin
git add .

# İlk commit'i yapın
git commit -m "Initial commit: Copy Any Component plugin for Strapi 5"

# GitHub remote'unu ekleyin (YOUR_USERNAME'i kendi kullanıcı adınızla değiştirin)
git remote add origin https://github.com/YOUR_USERNAME/strapi-plugin-copy-any-component.git

# Branch'i main olarak ayarlayın
git branch -M main

# GitHub'a push edin
git push -u origin main
```

## ⚙️ Adım 3: Package.json Güncelleme

`package.json` dosyasındaki repository URL'ini güncelleyin:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/strapi-plugin-copy-any-component.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/strapi-plugin-copy-any-component/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/strapi-plugin-copy-any-component#readme"
}
```

## 🏷️ Adım 4: GitHub Repository Ayarları

GitHub repository sayfasında:

1. **Settings** → **General** → **Features**:
   - ✅ Issues (aktif edin)
   - ✅ Discussions (opsiyonel)
   - ✅ Wiki (opsiyonel)

2. **Settings** → **General** → **Topics**:
   Şu topic'leri ekleyin (arama için):
   - `strapi`
   - `strapi-plugin`
   - `cms`
   - `content-management`
   - `drag-and-drop`
   - `components`
   - `strapi-v5`

3. **Settings** → **General** → **Social Preview**:
   Bir görsel ekleyebilirsiniz (opsiyonel)

## 📝 Adım 5: README Badge'lerini Güncelleme

`README.md` dosyasının başına badge'leri ekleyin (YOUR_USERNAME'i değiştirin):

```markdown
[![npm version](https://img.shields.io/npm/v/@strapi/plugin-copy-any-component.svg)](https://www.npmjs.com/package/@strapi/plugin-copy-any-component)
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/strapi-plugin-copy-any-component.svg)](https://github.com/YOUR_USERNAME/strapi-plugin-copy-any-component)
[![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/strapi-plugin-copy-any-component.svg)](https://github.com/YOUR_USERNAME/strapi-plugin-copy-any-component/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

## 🔄 Adım 6: Güncellemeleri Push Etme

Gelecekte yapılan değişiklikleri push etmek için:

```bash
# Değişiklikleri göster
git status

# Değişiklikleri ekle
git add .

# Commit yapın (anlamlı bir mesaj yazın)
git commit -m "feat: add new feature description"

# GitHub'a push edin
git push
```

## 📌 Adım 7: GitHub Release Oluşturma (NPM ile birlikte)

NPM'e yayınlamadan önce GitHub'da bir release oluşturun:

1. GitHub repository sayfasında **Releases** → **Create a new release**
2. **Tag version**: `v1.0.0` (package.json'daki versiyonla aynı)
3. **Release title**: `v1.0.0 - Initial Release`
4. **Description**: Release notlarını yazın (CHANGELOG varsa kopyalayabilirsiniz)
5. **Publish release** butonuna tıklayın

## ✅ Kontrol Listesi

- [ ] GitHub repository oluşturuldu
- [ ] Git başlatıldı ve ilk commit yapıldı
- [ ] GitHub'a push edildi
- [ ] package.json'da repository URL güncellendi
- [ ] README.md badge'leri eklendi (varsa)
- [ ] Repository topics eklendi
- [ ] Issues aktif edildi

## 🚀 Sonraki Adımlar

1. **NPM'e yayınlama**: [DEPLOY.md](./DEPLOY.md) dosyasına bakın
2. **Topluluk paylaşımı**: Discord, Twitter, LinkedIn'de paylaşın
3. **İssue'ları takip edin**: Kullanıcılardan gelen sorunları çözün
4. **Star alın**: Projenizi beğenenler star verebilir! ⭐

## 📚 Faydalı Linkler

- [GitHub Documentation](https://docs.github.com/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Semantic Versioning](https://semver.org/)

