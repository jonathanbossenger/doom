# Doom WordPress Block Plugin - Copilot Instructions

## Project Overview

This is a **WordPress Block Plugin** that integrates the classic Doom game directly into WordPress posts and pages using JS-DOS emulation. The plugin allows content creators to embed a playable Doom game instance anywhere on their WordPress site through the block editor.

### Key Features
- 🎮 Embeddable Doom game via WordPress block editor
- 📱 Responsive design with mobile compatibility
- 🎯 Easy-to-use block editor integration
- 🔧 No external API dependencies
- 🎨 Customizable styling with fullscreen support

## Architecture & Technical Stack

### Core Technologies
- **WordPress Block API v3** - Modern block registration and management
- **JS-DOS v3 Emulator** - WebAssembly-based DOS emulation engine
- **@wordpress/scripts** - Build toolchain and development workflow
- **Ultimate Doom (Shareware)** - Bundled game ROM
- **React/JSX** - Block editor UI components
- **SCSS** - Styling with editor and frontend variants

### File Structure
```
doom/
├── doom.php                    # Main plugin file with registration logic
├── package.json                # Build dependencies and scripts
├── README.md                   # Project documentation
├── assets/jsdoom/              # Game emulation assets
│   ├── jsdoom-engine.js       # Custom JS-DOS wrapper and game initialization
│   ├── jsdoom-style.css       # Game-specific styling
│   ├── components/js-dos-apiv3.js  # JS-DOS emulator core
│   └── roms/ultimate-doom.zip # Game ROM file
├── src/doom/                   # Source files (pre-build)
│   ├── block.json             # Block metadata and configuration
│   ├── index.js               # Block registration entry point
│   ├── edit.js                # Editor component (preview)
│   ├── save.js                # Frontend save component
│   ├── view.js                # Frontend initialization script
│   ├── style.scss             # Shared styles (editor + frontend)
│   └── editor.scss            # Editor-only styles
└── build/                     # Built/compiled assets (auto-generated)
```

## Development Guidelines

### Plugin Architecture

**Main Plugin File (`doom.php`)**
- Uses WordPress 6.7+ block metadata collection for improved performance
- Conditional asset enqueuing (only loads on pages with the block)
- Provides plugin data to frontend via `wp_localize_script`
- Implements progressive enhancement for different WP versions

**Block Registration (`src/doom/block.json`)**
- API version 3 for modern block features
- Category: "games" with gaming-related keywords
- Supports wide/full alignment and spacing controls
- Separate editor/frontend scripts and styles

### Frontend Integration

**Game Initialization Flow:**
1. `view.js` detects Doom blocks on page load
2. Dynamically loads `jsdoom-engine.js` if not present
3. Creates unique dosbox instances for multiple blocks
4. Initializes JS-DOS with Ultimate Doom ROM
5. Provides fullscreen toggle functionality

**Key Implementation Details:**
- Uses `window.doomPluginData` for plugin URL and nonce
- Supports multiple game instances on same page
- Lazy-loads game engine to improve page performance
- Creates unique container IDs to prevent conflicts

### Styling Architecture

**Three-layer styling approach:**
1. **`style.scss`** - Shared styles for both editor and frontend
2. **`editor.scss`** - Editor-specific preview styling
3. **`jsdoom-style.css`** - Game-specific visual enhancements

**Design Principles:**
- Responsive design with mobile-first approach
- Dark theme with gaming aesthetic
- Smooth transitions and hover effects
- Fullscreen support with proper controls

## Code Patterns & Best Practices

### WordPress Block Development

**Editor Component (`edit.js`):**
```javascript
// Always use useBlockProps for proper block wrapper
const blockProps = useBlockProps({
    className: 'wp-block-jonathanbossenger-doom',
});

// Provide clear preview with internationalization
return (
    <div { ...blockProps }>
        { __( '🎮 Doom Game Block', 'doom' ) }
    </div>
);
```

**Save Component (`save.js`):**
```javascript
// Save minimal markup, let view.js handle initialization
const blockProps = useBlockProps.save({
    className: 'wp-block-jonathanbossenger-doom',
});

return (
    <div { ...blockProps }>
        <div id="dosbox"></div>
        {/* Minimal UI elements */}
    </div>
);
```

### JavaScript Patterns

**DOM Ready Detection:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Always check for block presence before initialization
    const doomBlocks = document.querySelectorAll('.wp-block-jonathanbossenger-doom');
    if (doomBlocks.length === 0) return;
});
```

**Dynamic Script Loading:**
```javascript
// Check for existing library before loading
if (typeof window.Dosbox === 'undefined') {
    const script = document.createElement('script');
    script.src = window.doomPluginData.pluginUrl + 'assets/jsdoom/jsdoom-engine.js';
    script.onload = function() { initializeDoom(); };
    document.head.appendChild(script);
}
```

### PHP Patterns

**Conditional Asset Loading:**
```php
function jonathanbossenger_doom_enqueue_assets() {
    // Performance optimization - only load on pages with the block
    if ( has_block( 'jonathanbossenger/doom' ) ) {
        wp_enqueue_style( /* ... */ );
        wp_localize_script( /* ... */ );
    }
}
```

**Modern Block Registration:**
```php
// Support WordPress 6.7+ performance improvements
if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
    wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
    return;
}
```

## Development Workflow

### Build Process
```bash
# Development mode with hot reload
npm run start

# Production build with optimization
npm run build

# Code quality checks
npm run lint:js
npm run lint:css
npm run format
```

### Plugin Deployment
```bash
# Create distribution package
npm run plugin-zip
```

## Common Modification Scenarios

### Adding New Game Features

**To add game controls or options:**
1. Modify `save.js` to include new UI elements
2. Update `view.js` to handle new interactions
3. Extend `jsdoom-style.css` for styling
4. Update `edit.js` for editor preview

**To support different games:**
1. Add ROM files to `assets/jsdoom/roms/`
2. Update `view.js` initialization logic
3. Consider adding block attributes for game selection
4. Update `block.json` with new keywords/description

### Styling Customizations

**Editor appearance:**
- Modify `editor.scss` for block editor preview
- Update `edit.js` inline styles for editor layout

**Frontend appearance:**
- Edit `jsdoom-style.css` for game-specific styling
- Modify `style.scss` for block container styling

### Performance Optimizations

**Loading optimizations:**
- Implement progressive loading in `view.js`
- Add preloading hints in `doom.php`
- Optimize ROM file size or compression

**Multi-instance support:**
- Ensure unique IDs in `view.js`
- Test memory usage with multiple blocks
- Consider lazy initialization patterns

## Browser Compatibility

**Requirements:**
- Modern browsers with Canvas and WebAssembly support
- Mobile browsers with touch input support
- Minimum screen resolution: 320px width

**Known Limitations:**
- WebAssembly required for JS-DOS emulation
- Large ROM file size (~4MB) affects initial load
- Fullscreen API may not work on all mobile browsers

## Security Considerations

- ROM files are served as static assets (no server-side processing)
- Nonce verification available via `doomPluginData.nonce`
- No user input processed server-side
- Client-side emulation contains no network functionality

## Testing Guidelines

**Block Editor Testing:**
- Test block insertion/deletion
- Verify editor preview appearance
- Check multiple blocks per page
- Test wide/full alignment options

**Frontend Testing:**
- Verify game loads correctly
- Test fullscreen functionality
- Check responsive behavior
- Test multiple instances interaction

**Performance Testing:**
- Monitor memory usage during gameplay
- Test initial load times
- Verify asset caching behavior
- Check mobile device performance

This plugin represents a modern WordPress block implementation with game emulation capabilities, following WordPress coding standards and modern JavaScript practices.
