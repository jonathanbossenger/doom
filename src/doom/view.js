/**
 * JSdoom integration for WordPress block
 * Initializes the Doom game when the block is loaded on the frontend
 */

document.addEventListener('DOMContentLoaded', function() {
	// Check if we have jsdoom blocks on the page
	const doomBlocks = document.querySelectorAll('.wp-block-jonathanbossenger-doom');

	if (doomBlocks.length === 0) {
		return;
	}

	// Load jsdoom engine if not already loaded
	if (typeof window.Dosbox === 'undefined') {
		const script = document.createElement('script');
		script.src = window.doomPluginData.pluginUrl + 'assets/jsdoom/jsdoom-engine.js';
		script.onload = function() {
			initializeDoom();
		};
		document.head.appendChild(script);
	} else {
		initializeDoom();
	}

	function initializeDoom() {
		// Initialize Doom for each block
		doomBlocks.forEach(function(block, index) {
			const dosboxContainer = block.querySelector('#dosbox');

			if (!dosboxContainer) {
				return;
			}

			// Create unique ID for multiple instances
			const uniqueId = 'dosbox-' + index;
			dosboxContainer.id = uniqueId;

			// Initialize Dosbox
			window.dosbox = new Dosbox({
				id: uniqueId,
				onload: function(dosbox) {
					const pluginUrl = window.doomPluginData.pluginUrl;
					const romPath = pluginUrl + 'assets/jsdoom/roms/ultimate-doom.zip';
					dosbox.run(romPath, './UltDoom/DOOM.EXE');
				},
				onrun: function(dosbox, app) {
					console.log("Doom '" + app + "' is running");
				}
			});
		});
	}
});
