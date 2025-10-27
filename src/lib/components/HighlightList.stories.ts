import type { Meta, StoryObj } from '@storybook/svelte';
import HighlightList from './HighlightList.svelte';
import { ndk } from '$lib/ndk.svelte';

const meta = {
  title: 'Components/Highlights/HighlightList',
  component: HighlightList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<HighlightList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RecentHighlights: Story = {
  render: () => {
    const highlightsSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [9802], limit: 10 }],
      closeOnEose: false,
    }));

    return {
      Component: HighlightList,
      props: {
        highlights: highlightsSubscription.events || [],
      },
    };
  },
};

export const Empty: Story = {
  args: {
    highlights: [],
    emptyMessage: 'No highlights found',
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    highlights: [],
    emptyMessage: 'Start highlighting interesting content!',
  },
};

export const FromSpecificAuthors: Story = {
  render: () => {
    const highlightsSubscription = ndk.$subscribe(() => ({
      filters: [{
        kinds: [9802],
        authors: [
          'fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52',
          '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2',
        ],
        limit: 20
      }],
      closeOnEose: false,
    }));

    return {
      Component: HighlightList,
      props: {
        highlights: highlightsSubscription.events || [],
      },
    };
  },
};
