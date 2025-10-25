# Storybook Setup for Svelte 5

This project uses Storybook 9.1.15 with full Svelte 5 support via the `@storybook/addon-svelte-csf` addon.

## Installation

Storybook has been configured with the following packages:

- `storybook@^9.1.15`
- `@storybook/sveltekit@^9.1.15` - SvelteKit framework support
- `@storybook/addon-svelte-csf@^5.0.10` - Svelte 5 CSF (Component Story Format) support
- `@storybook/addon-docs@^9.1.15` - Auto-documentation
- `@storybook/addon-a11y@^9.1.15` - Accessibility testing
- `@storybook/addon-vitest@^9.1.15` - Component testing

## Running Storybook

To start Storybook in development mode:

```bash
bun run storybook
# or
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### Potential esbuild Issue

If you encounter an esbuild error (`Error: The service was stopped: write EPIPE`), try these workarounds:

1. Simply retry - the issue is often transient
2. Run directly with node: `node ./node_modules/.bin/storybook dev -p 6006`
3. Use npx: `npx storybook dev -p 6006`

## Writing Stories with Svelte 5

Storybook uses the modern Svelte CSF format with Svelte 5's new syntax. Here's an example:

```svelte
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MyComponent from './MyComponent.svelte';

  const { Story } = defineMeta({
    title: 'Components/MyComponent',
    component: MyComponent,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['default', 'primary', 'secondary'],
      },
    },
  });
</script>

<!-- Simple story with args -->
<Story name="Default" args={{ variant: 'default', label: 'Click me' }} />

<!-- Story with custom rendering using snippets -->
<Story name="WithCustomContent" args={{ variant: 'primary' }}>
  {#snippet template(args)}
    <MyComponent {...args}>
      <span>Custom nested content</span>
    </MyComponent>
  {/snippet}
</Story>
```

### Key Svelte 5 Changes from Svelte 4

- Replace `Meta` and `Template` components with `defineMeta` function
- Use Svelte 5's snippet syntax instead of slots for custom templates
- Event handlers changed from `on:click` to prop-based callbacks
- Use `tags: ['autodocs']` instead of the old `autodocs` parameter

## NDK Integration

The Storybook preview is configured to use **real NDK connections** (not mocks). Components that use NDK will connect to actual Nostr relays as defined in `src/lib/ndk.svelte.ts`.

This means:
- Components will connect to real relays
- You can test with real Nostr data
- Authentication and session management work as in the app

### Configuration Files

- `.storybook/main.js` - Storybook configuration
- `.storybook/preview.ts` - Global decorators, parameters, and styles
- `.storybook/decorators.ts` - NDK and i18n initialization

## File Structure

Stories should be placed alongside your components:

```
src/
  lib/
    components/
      FollowButton.svelte
      FollowButton.stories.svelte  ← Story file
```

## Example Story

See `src/lib/components/FollowButton.stories.svelte` for a complete example demonstrating:
- Multiple story variants
- Using args to control props
- Testing different component states
- Custom styling per story

## Building Storybook

To build a static version of Storybook:

```bash
npm run build-storybook
```

This creates a static site in `storybook-static/` that can be deployed.

## Additional Resources

- [Storybook for SvelteKit Documentation](https://storybook.js.org/docs/get-started/frameworks/sveltekit)
- [Svelte CSF Addon](https://storybook.js.org/addons/@storybook/addon-svelte-csf)
- [Svelte 5 Migration Guide](https://svelte.dev/docs/svelte/v5-migration-guide)
