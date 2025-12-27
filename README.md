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

## 📦 Installation

```bash
npm install strapi-plugin-copy-any-component
```

That's it! The plugin will be automatically detected by Strapi.

> **Note:** No need to add anything to `config/plugins.ts` - Strapi automatically picks up plugins installed via npm.

### Set Permissions

After installation, you need to enable permissions:

1. Go to **Settings > Users & Permissions > Roles** in Strapi admin
2. Select your role (e.g., Super Admin, Editor)
3. Find **Copy Any Component** section
4. Enable all permissions:
   - Access Component Copy pages
   - Copy components
   - Update page sections
   - Publish pages
5. Save

### Restart Strapi

```bash
npm run develop
```

## 🚀 Usage

1. Go to **Plugins > Copy Any Component** in Strapi admin panel
2. Click **⚙️ Content Type Settings** to select your content type and dynamic zone
3. Select **Source Page** (left) and **Target Page** (right)
4. Drag components from Source to Target
5. Reorder by dragging within Target
6. Click **Publish** to save

## 🔧 Optional Configuration

If you want to set default content type, add to `config/plugins.ts`:

```typescript
export default () => ({
  'copy-any-component': {
    enabled: true,
    config: {
      contentType: 'api::page.page',
      dynamicZoneField: 'sections',
    },
  },
});
```

## Requirements

- Strapi 5.0.0 or higher
- Node.js 18.x or higher

## ⚠️ Troubleshooting

### Version Mismatch / Build Errors

If you see errors like `useAIAvailability` or other export errors after installing the plugin:

```bash
# 1. Remove the plugin temporarily
npm uninstall strapi-plugin-copy-any-component

# 2. Clean everything
rm -rf node_modules package-lock.json .cache dist

# 3. Update React versions in package.json to ^18.2.0

# 4. Reinstall all dependencies
npm install

# 5. Install plugin again
npm install strapi-plugin-copy-any-component

# 6. Build and run
npm run build
npm run develop
```

### `flushSync` Error

If you see:
```
SyntaxError: The requested module 'react-dom' does not provide an export named 'flushSync'
```

Update your project's React version in `package.json`:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### Plugin not visible

- Check permissions in Settings > Roles
- Restart Strapi: `npm run develop`
- Clear cache: `rm -rf .cache dist`

## License

MIT

## Support

For issues, please open an issue on [GitHub](https://github.com/metehankasapp/strapi-plugin-copy-any-component/issues).
