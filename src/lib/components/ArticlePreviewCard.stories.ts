import type { Meta, StoryObj } from '@storybook/svelte';
import ArticlePreviewCard from './ArticlePreviewCard.svelte';
import { ndk } from '$lib/ndk.svelte';
import { NDKKind } from '@nostr-dev-kit/ndk';

const meta = {
  title: 'Components/Articles/ArticlePreviewCard',
  component: ArticlePreviewCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact'],
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<ArticlePreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Fetch a single article for display
export const Default: Story = {
  render: () => {
    const articlesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Article], limit: 1 }],
      closeOnEose: false,
    }));

    const article = articlesSubscription.events?.[0];

    if (!article) return null;

    return {
      Component: ArticlePreviewCard,
      props: {
        article,
        variant: 'default',
      },
    };
  },
};

export const Compact: Story = {
  render: () => {
    const articlesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Article], limit: 1 }],
      closeOnEose: false,
    }));

    const article = articlesSubscription.events?.[0];

    if (!article) return null;

    return {
      Component: ArticlePreviewCard,
      props: {
        article,
        variant: 'compact',
      },
    };
  },
};

// Show multiple cards in different variants
export const Comparison: Story = {
  render: () => {
    const articlesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Article], limit: 3 }],
      closeOnEose: false,
    }));

    const articles = articlesSubscription.events || [];

    return {
      Component: ArticlePreviewCard,
    };
  },
  decorators: [
    () => ({
      template: `
        <div class="space-y-6">
          {#if articles.length > 0}
            <div>
              <h3 class="text-lg font-bold mb-4">Default Variant</h3>
              <ArticlePreviewCard article={articles[0]} variant="default" />
            </div>
            <div>
              <h3 class="text-lg font-bold mb-4">Compact Variant</h3>
              <div class="space-y-2">
                {#each articles as article}
                  <ArticlePreviewCard {article} variant="compact" />
                {/each}
              </div>
            </div>
          {/if}
        </div>
      `,
    }),
  ],
};
