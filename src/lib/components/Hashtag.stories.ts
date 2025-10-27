import type { Meta, StoryObj } from '@storybook/svelte';
import Hashtag from './Hashtag.svelte';

const meta = {
  title: 'Components/Hashtag',
  component: Hashtag,
  tags: ['autodocs'],
  argTypes: {
    hashtag: { control: 'text' },
    format: {
      control: { type: 'select' },
      options: ['inline', 'pill'],
    },
    class: { control: 'text' },
  },
  args: {
    hashtag: 'nostr',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<Hashtag>;

export default meta;
type Story = StoryObj<typeof meta>;

// Inline format stories
export const InlineDefault: Story = {
  args: {
    hashtag: 'nostr',
    format: 'inline',
  },
};

export const InlineBitcoin: Story = {
  args: {
    hashtag: 'bitcoin',
    format: 'inline',
  },
};

export const InlineLongHashtag: Story = {
  args: {
    hashtag: 'decentralization',
    format: 'inline',
  },
};

// Pill format stories
export const PillDefault: Story = {
  args: {
    hashtag: 'nostr',
    format: 'pill',
  },
};

export const PillBitcoin: Story = {
  args: {
    hashtag: 'bitcoin',
    format: 'pill',
  },
};

export const PillTechnology: Story = {
  args: {
    hashtag: 'technology',
    format: 'pill',
  },
};

export const PillNews: Story = {
  args: {
    hashtag: 'news',
    format: 'pill',
  },
};

export const PillCryptocurrency: Story = {
  args: {
    hashtag: 'cryptocurrency',
    format: 'pill',
  },
};

// Custom styling
export const CustomInline: Story = {
  args: {
    hashtag: 'custom',
    format: 'inline',
    class: 'text-lg font-bold',
  },
};

export const CustomPill: Story = {
  args: {
    hashtag: 'custom',
    format: 'pill',
    class: 'text-lg',
  },
};

// Multiple hashtags demonstration
export const MultipleHashtags: Story = {
  render: () => ({
    Component: Hashtag,
  }),
  decorators: [
    () => ({
      template: `
        <div class="flex flex-wrap gap-2">
          <Hashtag hashtag="nostr" format="pill" />
          <Hashtag hashtag="bitcoin" format="pill" />
          <Hashtag hashtag="technology" format="pill" />
          <Hashtag hashtag="decentralization" format="pill" />
          <Hashtag hashtag="privacy" format="pill" />
        </div>
      `,
    }),
  ],
};

// Inline text demonstration
export const InlineInText: Story = {
  render: () => ({
    Component: Hashtag,
  }),
  decorators: [
    () => ({
      template: `
        <p class="text-base">
          This is a post about <Hashtag hashtag="nostr" format="inline" /> and <Hashtag hashtag="bitcoin" format="inline" /> technology.
        </p>
      `,
    }),
  ],
};

// With click handler
export const WithClickHandler: Story = {
  args: {
    hashtag: 'clickme',
    format: 'pill',
    onClick: (hashtag: string) => {
      alert(`Clicked hashtag: ${hashtag}`);
    },
  },
};
