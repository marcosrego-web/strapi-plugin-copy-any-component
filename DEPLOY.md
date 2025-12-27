# Deployment Guide

This guide explains how to publish the plugin to npm and set up the GitHub repository.

## 📦 Publishing to NPM

### Prerequisites

1. NPM account (sign up at [npmjs.com](https://www.npmjs.com/signup))
2. NPM CLI installed: `npm install -g npm`
3. Logged in to npm: `npm login`

### Step 1: Update Package Information

Before publishing, update the following in `package.json`:

1. **Repository URL**: Replace `YOUR_USERNAME` with your GitHub username
2. **Author**: Update with your name and email
3. **Version**: Use semantic versioning (e.g., 1.0.0, 1.0.1, 1.1.0)

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/strapi-plugin-copy-any-component.git"
  },
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  }
}
```

### Step 2: Build Check (Optional)

If your plugin has build steps, make sure everything is built:

```bash
npm run build  # If you have a build script
```

### Step 3: Test Locally

Test the package locally before publishing:

```bash
# In the plugin directory
npm pack

# This creates a .tgz file. Test it in another Strapi project:
cd /path/to/test/strapi
npm install /path/to/plugin/copy-any-component-1.0.0.tgz
```

### Step 4: Publish to NPM

```bash
# Make sure you're in the plugin directory
cd src/plugins/my-simple-plugin

# Dry run first (shows what would be published without actually publishing)
npm publish --dry-run

# If everything looks good, publish
npm publish --access public
```

> **Note**: The `--access public` flag is required if your npm account is not part of an organization, or if the package name doesn't start with `@yourusername/`.

### Step 5: Verify Publication

1. Check npm: `https://www.npmjs.com/package/@strapi/plugin-copy-any-component`
2. Try installing: `npm install @strapi/plugin-copy-any-component`

## 🔄 Updating the Package

When making updates:

1. Update version in `package.json` (following [semantic versioning](https://semver.org/)):
   - **Patch** (1.0.0 → 1.0.1): Bug fixes
   - **Minor** (1.0.0 → 1.1.0): New features (backwards compatible)
   - **Major** (1.0.0 → 2.0.0): Breaking changes

2. Update CHANGELOG.md (if you have one)

3. Publish:
   ```bash
   npm publish --access public
   ```

## 🐙 GitHub Repository Setup

### Step 1: Create Repository

1. Go to [GitHub](https://github.com/new)
2. Repository name: `strapi-plugin-copy-any-component`
3. Description: `A powerful Strapi plugin for copying components between pages with drag & drop`
4. Visibility: **Public** (for open source)
5. **Don't** initialize with README, .gitignore, or license (we already have them)

### Step 2: Initialize Git

```bash
# Navigate to plugin directory
cd src/plugins/my-simple-plugin

# Initialize git (if not already done)
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Copy Any Component plugin"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/strapi-plugin-copy-any-component.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Update Package.json Repository URL

Update `package.json` with the correct repository URL:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/strapi-plugin-copy-any-component.git"
  }
}
```

### Step 4: Add GitHub Badges to README

Update README.md to include badges (replace YOUR_USERNAME):

```markdown
[![npm version](https://img.shields.io/npm/v/@strapi/plugin-copy-any-component.svg)](https://www.npmjs.com/package/@strapi/plugin-copy-any-component)
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/strapi-plugin-copy-any-component.svg)](https://github.com/YOUR_USERNAME/strapi-plugin-copy-any-component)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

### Step 5: GitHub Repository Settings

1. **Topics**: Add topics for discoverability:
   - `strapi`
   - `strapi-plugin`
   - `cms`
   - `content-management`
   - `drag-and-drop`
   - `components`

2. **Description**: `A powerful Strapi plugin for copying components between pages with drag & drop`

3. **Website** (optional): Link to your documentation or demo

4. **Social Preview**: Add a preview image if you have one

## 📝 Additional Files (Optional)

### CHANGELOG.md

Create a CHANGELOG.md file:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-01-XX

### Added
- Initial release
- Drag & drop component copying
- Automatic content type detection
- Admin panel configuration
- Support for all dynamic zones
```

### LICENSE

Make sure you have a LICENSE file. MIT license is recommended:

```text
MIT License

Copyright (c) 2024 YOUR_NAME

Permission is hereby granted, free of charge, to any person obtaining a copy
...
```

## ✅ Checklist Before Publishing

- [ ] Package.json updated with correct author and repository
- [ ] README.md is complete and accurate
- [ ] All dependencies listed in package.json
- [ ] .npmignore includes unnecessary files
- [ ] .gitignore includes sensitive/development files
- [ ] Code is tested and working
- [ ] Version number follows semantic versioning
- [ ] GitHub repository created and pushed
- [ ] NPM account is logged in

## 🚀 Post-Publication

1. **Share on social media** (Twitter, LinkedIn, etc.)
2. **Submit to Strapi community** (Discord, Forum)
3. **Add to awesome-strapi** (if applicable)
4. **Monitor issues** and respond to users

## 📚 Resources

- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)

