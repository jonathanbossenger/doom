#!/bin/bash
# Build and package the WordPress plugin for release

set -e

echo "🔨 Building WordPress plugin..."

# Clean up previous builds
rm -rf temp-plugin doom.zip

# Install dependencies and build
npm ci
npm run build

# Create plugin package
echo "📦 Creating plugin package..."
mkdir -p temp-plugin/doom

# Copy built files
cp -r build temp-plugin/doom/

# Copy essential plugin files
cp doom.php temp-plugin/doom/
cp README.md temp-plugin/doom/
cp readme.txt temp-plugin/doom/

# Copy assets directory (contains game files)
cp -r assets temp-plugin/doom/

# Create the zip file
cd temp-plugin
zip -r ../doom.zip doom/
cd ..

# Verify zip contents
echo "📋 Plugin package contents:"
unzip -l doom.zip | grep -E '(Length|^  *[0-9]|^-)'

echo "✅ Plugin package created: doom.zip"
echo "📊 File size: $(ls -lh doom.zip | awk '{print $5}')"

# Cleanup
rm -rf temp-plugin

echo "🎉 Ready for release!"