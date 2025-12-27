# Copy Any Component Plugin for Strapi 5

[![npm version](https://img.shields.io/npm/v/strapi-plugin-copy-any-component.svg)](https://www.npmjs.com/package/strapi-plugin-copy-any-component)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful Strapi plugin that allows you to copy and reorder components (sections) between pages using an intuitive drag-and-drop interface. **No code required!** Works with any content type and dynamic zone.

## ✨ Features

- 🎯 **Drag & Drop Interface**: Intuitive visual interface for copying components
- 📋 **Component Copying**: Copy components from one page to another
- 🔄 **Component Reordering**: Reorder components within a page
- 🔍 **Auto-Detection**: Automatically detects all content types and dynamic zones
- ⚙️ **Zero-Code Configuration**: Configure via admin panel - settings persist across restarts
- 📸 **Media Support**: Properly handles media files and images
- 💾 **Draft/Publish System**: Changes are saved as drafts, publish when ready
- ✅ **Detailed Feedback**: See exactly what fields and media were copied
- 🌐 **Universal**: Works with any content type (Page, Article, Blog, etc.) and any dynamic zone field

## 🔍 Automatic Content Type Detection

This plugin works with **any content type** and **any dynamic zone**! The plugin automatically:

- Detects all custom content types (Page, Article, Blog, LandingPage, etc.)
- Finds all fields containing dynamic zones (sections, blocks, content, etc.)
- Provides a dropdown interface in the admin panel for easy selection

### Admin Panel Configuration (No Code Required!)

1. Go to the plugin page
2. Click the **⚙️ Content Type Settings** button in the top right
3. Select your desired **Content Type** and **Dynamic Zone**
4. Click **💾 Save**

Settings are **automatically saved** and persist even after Strapi restarts! No need to edit code.

## 📖 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Hızlı başlangıç rehberi (önerilen)
- **[INSTALLATION.md](./INSTALLATION.md)** - Detaylı kurulum rehberi
- **[USAGE.md](./USAGE.md)** - Kullanım rehberi ve örnekler
- **[TESTING.md](./TESTING.md)** - Test rehberi

## ✨ Features

- 🎯 **Drag & Drop Interface**: Intuitive visual interface for copying components
- 📋 **Component Copying**: Copy components from one page to another
- 🔄 **Component Reordering**: Reorder components within a page
- 🔍 **Auto-Detection**: Automatically detects all content types and dynamic zones
- ⚙️ **Zero-Code Configuration**: Configure via admin panel - settings persist across restarts
- 📸 **Media Support**: Properly handles media files and images
- 💾 **Draft/Publish System**: Changes are saved as drafts, publish when ready
- ✅ **Detailed Feedback**: See exactly what fields and media were copied
- 🌐 **Universal**: Works with any content type (Page, Article, Blog, etc.) and any dynamic zone field

## 📦 Installation

### NPM Install (Recommended)

```bash
npm install @strapi/plugin-copy-any-component
```

### Manual Install

1. **Install the plugin:**
   ```bash
   npm install @strapi/plugin-copy-any-component
   ```

2. **Register the plugin** in `config/plugins.ts`:
   ```typescript
   export default () => ({
     'copy-any-component': {
       enabled: true,
       resolve: './node_modules/@strapi/plugin-copy-any-component',
       // Optional: Set defaults (can be changed via admin panel)
       config: {
         contentType: 'api::page.page',
         dynamicZoneField: 'sections',
       },
     },
   });
   ```

3. **Set permissions:**
   - Go to **Settings > Users & Permissions > Roles** in Strapi admin
   - Enable permissions for **Copy Any Component** section:
     - Access Component Copy pages
     - Copy components
     - Update page sections
     - Publish pages

4. **Restart Strapi:**
   ```bash
   npm run develop
   ```

### Configuration

The plugin can be configured in two ways:

1. **Via Admin Panel (Recommended)**: No code required! Settings persist automatically.
2. **Via Config File**: Edit `config/plugins.ts` as shown above.

For detailed installation instructions, see [INSTALLATION.md](./INSTALLATION.md).

## 🚀 Usage

For detailed usage instructions, see [USAGE.md](./USAGE.md).

### Basic Usage

1. Go to **Plugins > Copy Any Component** in Strapi admin panel
2. **Source Page** (left panel) - Select the page you want to copy components from
3. **Target Page** (right panel) - Select the page you want to copy components to
4. Drag components from Source Page and drop them on Target Page
5. Reorder components in Target Page by dragging them
6. Click **Publish** to save changes

### Configuration via Admin Panel

1. Click **⚙️ Content Type Settings** button in the plugin page
2. Select your **Content Type** (e.g., Page, Article, Blog)
3. Select your **Dynamic Zone Field** (e.g., sections, blocks, content)
4. Click **💾 Save** - settings persist automatically!

## 🔌 API Endpoints

### Admin Routes

- `GET /admin/plugins/copy-any-component/pages` - List all pages
- `GET /admin/plugins/copy-any-component/pages/:pageId/sections` - Get page sections
- `GET /admin/plugins/copy-any-component/content-types` - List available content types
- `PUT /admin/plugins/copy-any-component/config` - Update plugin configuration
- `POST /admin/plugins/copy-any-component/pages/:sourcePageId/copy-to/:targetPageId` - Copy sections
- `PUT /admin/plugins/copy-any-component/pages/:pageId/sections` - Update page sections (reorder)
- `POST /admin/plugins/copy-any-component/pages/:pageId/publish` - Publish page

### Content API Routes

- `GET /api/copy-any-component/pages/:pageId/sections` - Get page sections
- `POST /api/copy-any-component/pages/:sourcePageId/copy-to/:targetPageId` - Copy sections

## Permissions

Make sure to grant permissions in **Settings > Users & Permissions > Roles**:
- Access Component Copy pages
- Copy components
- Update page sections
- Publish pages

## Requirements

- Strapi 5.0.0 or higher
- Node.js 20.x or higher

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

