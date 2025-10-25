import type { Decorator } from '@storybook/sveltekit';
import { init, addMessages, locale } from 'svelte-i18n';

// Initialize i18n for Storybook
addMessages('en', {
  profile: {
    follow: 'Follow',
    unfollow: 'Unfollow',
    follow_error: 'Error toggling follow',
  },
});

init({
  fallbackLocale: 'en',
  initialLocale: 'en',
});

// NDK decorator - uses real NDK instance from your app
// The NDK instance will be initialized when components import it
export const withNDK: Decorator = (story) => {
  return story();
};
