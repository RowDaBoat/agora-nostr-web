import type { Meta, StoryObj } from '@storybook/svelte';
import HighlightCard from './HighlightCard.svelte';
import { ndk } from '$lib/ndk.svelte';

const meta = {
  title: 'Components/Highlights/HighlightCard',
  component: HighlightCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'feed', 'grid'],
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<HighlightCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Fetch highlights (kind 9802)
export const Default: Story = {
  render: () => {
    const highlightsSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [9802], limit: 1 }],
      closeOnEose: false,
    }));

    const highlight = highlightsSubscription.events?.[0];

    if (!highlight) return null;

    return {
      Component: HighlightCard,
      props: {
        event: highlight,
        variant: 'default',
      },
    };
  },
};

export const Feed: Story = {
  render: () => {
    const highlightsSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [9802], limit: 1 }],
      closeOnEose: false,
    }));

    const highlight = highlightsSubscription.events?.[0];

    if (!highlight) return null;

    return {
      Component: HighlightCard,
      props: {
        event: highlight,
        variant: 'feed',
      },
    };
  },
};

export const Compact: Story = {
  render: () => {
    const highlightsSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [9802], limit: 1 }],
      closeOnEose: false,
    }));

    const highlight = highlightsSubscription.events?.[0];

    if (!highlight) return null;

    return {
      Component: HighlightCard,
      props: {
        event: highlight,
        variant: 'compact',
      },
    };
  },
};

export const Grid: Story = {
  render: () => {
    const highlightsSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [9802], limit: 1 }],
      closeOnEose: false,
    }));

    const highlight = highlightsSubscription.events?.[0];

    if (!highlight) return null;

    return {
      Component: HighlightCard,
      props: {
        event: highlight,
        variant: 'grid',
      },
    };
  },
};

export const GridLayout: Story = {
  render: () => {
    const highlightsSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [9802], limit: 9 }],
      closeOnEose: false,
    }));

    const highlights = highlightsSubscription.events || [];

    return {
      Component: HighlightCard,
    };
  },
  decorators: [
    () => ({
      template: `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each highlights as highlight}
            <HighlightCard event={highlight} variant="grid" />
          {/each}
        </div>
      `,
    }),
  ],
};

export const CompactList: Story = {
  render: () => {
    const highlightsSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [9802], limit: 5 }],
      closeOnEose: false,
    }));

    const highlights = highlightsSubscription.events || [];

    return {
      Component: HighlightCard,
    };
  },
  decorators: [
    () => ({
      template: `
        <div class="space-y-2">
          {#each highlights as highlight}
            <HighlightCard event={highlight} variant="compact" />
          {/each}
        </div>
      `,
    }),
  ],
};
