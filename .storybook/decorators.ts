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

// Mock NDK for components that use it
export const withNDKMock: Decorator = (story) => {
  // This is a basic mock - you may need to expand this based on your needs
  return story();
};
