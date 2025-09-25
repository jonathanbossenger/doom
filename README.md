# Doom WordPress Block Plugin

A WordPress block plugin that integrates the classic Doom game directly into WordPress posts and pages using JS-DOS emulation.

## Features

- 🎮 Play classic Doom directly in WordPress
- 📱 Responsive design with mobile support
- 🎯 Easy-to-use block editor integration
- 🔧 No external dependencies required
- 🎨 Customizable styling

## Installation

1. Upload the plugin files to `/wp-content/plugins/doom/`
2. Activate the plugin through the WordPress admin
3. Add the "Doom" block to any post or page

## Usage

1. In the block editor, search for "Doom" or find it in the "Games" category
2. Insert the block into your post or page
3. The block will show a preview in the editor
4. On the frontend, visitors can click "Click to start" to begin playing

## Technical Details

### Files Structure
```
doom/
├── assets/jsdoom/          # Game assets
│   ├── components/         # JS-DOS emulator
│   ├── roms/              # Game ROMs
│   ├── jsdoom-engine.js   # Game engine
│   └── jsdoom-style.css   # Styling
├── src/doom/              # Source files
├── build/doom/            # Built files
└── doom.php              # Main plugin file
```

### Integration Details

- **Engine**: JS-DOS v3 emulator
- **Game**: Ultimate Doom (shareware version)
- **Framework**: WordPress Block API v3
- **Build Tool**: @wordpress/scripts

## Browser Compatibility

- Modern browsers with Canvas support
- WebAssembly support required
- Mobile devices supported

## License

GPL-2.0-or-later

## Credits

- Based on [jsdoom](https://github.com/jonathanbossenger/jsdoom)
- Uses [JS-DOS](http://js-dos.com) emulator
- Built with WordPress Create Block tool