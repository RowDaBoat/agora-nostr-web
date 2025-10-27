import type { Meta, StoryObj } from '@storybook/svelte';
import FeaturedArticleCard from './FeaturedArticleCard.svelte';
import { ndk } from '$lib/ndk.svelte';
import { NDKKind } from '@nostr-dev-kit/ndk';

const meta = {
  title: 'Components/Articles/FeaturedArticleCard',
  component: FeaturedArticleCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<FeaturedArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const articlesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Article], limit: 1 }],
      closeOnEose: false,
    }));

    const article = articlesSubscription.events?.[0];

    if (!article) return null;

    return {
      Component: FeaturedArticleCard,
      props: {
        article,
      },
    };
  },
};

export const MultipleCards: Story = {
  render: () => {
    const articlesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Article], limit: 4 }],
      closeOnEose: false,
    }));

    const articles = articlesSubscription.events || [];

    return {
      Component: FeaturedArticleCard,
    };
  },
  decorators: [
    () => ({
      template: `
        <div class="flex gap-4 overflow-x-auto p-4">
          {#each articles as article}
            <FeaturedArticleCard {article} />
          {/each}
        </div>
      `,
    }),
  ],
};
