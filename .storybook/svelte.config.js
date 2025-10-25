import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		// Don't enforce runes globally - let files opt-in with svelte-options
		runes: undefined
	},
	onwarn: (warning, handler) => {
		// Suppress all legacy export warnings from node_modules
		if (warning.code === 'legacy_export_invalid' && warning.filename?.includes('node_modules')) {
			return;
		}
		handler(warning);
	}
};

export default config;
