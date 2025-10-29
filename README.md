# 🌙 Simple Dark Mode - Chrome Extension

A lightweight, privacy-focused Chrome extension that adds a dark mode toggle to any website with a single click or keyboard shortcut.

## ✨ Features

- **🎯 One-Click Toggle** - Enable/disable dark mode instantly with a simple button click
- **⌨️ Keyboard Shortcut** - Quick toggle with `Cmd+Shift+D` (Mac) or `Ctrl+Shift+D` (Windows/Linux)
- **🌐 Per-Website Control** - Each website has its own independent dark mode setting
- **💾 Persistent Settings** - Your preferences are saved and automatically applied when you revisit websites
- **🎨 Visual Feedback** - Extension icon changes color to show dark mode status:
  - **White icon** = Dark mode OFF
  - **Green icon** = Dark mode ON
- **⚡ Lightweight** - Minimal resource usage, no bloat
- **🔒 100% Private** - No data collection, no tracking, no analytics

## 🚀 Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked" and select the extension folder
5. The extension icon will appear in your Chrome toolbar

## 📖 How to Use

### Method 1: Extension Icon
1. Click the extension icon in your Chrome toolbar
2. Click the "Enable Dark Mode" button
3. The current website will switch to dark mode
4. Click again to toggle it off

### Method 2: Keyboard Shortcut
- Press `Cmd+Shift+D` (Mac) or `Ctrl+Shift+D` (Windows/Linux)
- Dark mode toggles instantly on the current website

### Per-Website Settings
- Each website remembers its own dark mode preference
- `google.com` can be in dark mode while `github.com` stays in light mode
- Settings persist across browser sessions
- When you revisit a website, your preference is automatically applied

## 🔧 How It Works

The extension uses CSS filters to invert colors on web pages:
- Applies `invert(1)` and `hue-rotate(180deg)` to the entire page
- Reverts the filter on images, videos, and iframes to maintain their original appearance
- Stores your preferences locally using Chrome's storage API

## 🔒 Privacy & Security

**This extension is 100% private and respects your data:**

- ✅ **No Data Collection** - We don't collect, store, or transmit any of your browsing data
- ✅ **No Analytics** - No tracking, no telemetry, no usage statistics
- ✅ **No External Servers** - Everything runs locally in your browser
- ✅ **No Ads** - Completely ad-free
- ✅ **Open Source** - All code is visible and auditable
- ✅ **Minimal Permissions** - Only requests necessary permissions:
  - `activeTab` - To apply dark mode to the current tab
  - `scripting` - To inject the dark mode CSS
  - `storage` - To save your preferences locally
  - `tabs` - To detect tab changes and update the icon

Your dark mode preferences are stored locally on your device using Chrome's `storage.sync` API and are never sent anywhere.

## 📁 Project Structure

```
dark-mode-extension/
├── manifest.json       # Extension configuration
├── background.js       # Background service worker (handles shortcuts & icon updates)
├── content.js          # Content script (applies dark mode to pages)
├── popup.html          # Extension popup UI
├── popup.js            # Popup logic
├── styles.css          # Popup styling
└── images/             # Extension icons
    ├── icon16.png
    ├── icon48.png
    ├── icon128.png
    ├── icon-active16.png
    ├── icon-active48.png
    └── icon-active128.png
```

## 🛠️ Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: `activeTab`, `scripting`, `storage`, `tabs`
- **Dark Mode Method**: CSS filter inversion with hue rotation
- **Storage**: Chrome's `storage.sync` API for cross-device sync
- **Compatibility**: Works on all websites (some may require page refresh)

## 🐛 Known Limitations

- Some websites with complex CSS may not render perfectly in dark mode
- Websites that already have a native dark mode might look unusual when inverted
- Chrome extension pages and local files cannot be modified due to browser security restrictions

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

Built with simplicity and privacy in mind. No frameworks, no dependencies, just vanilla JavaScript.

---

**Made with ❤️ for a better browsing experience**
