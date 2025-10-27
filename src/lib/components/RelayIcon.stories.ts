import type { Meta, StoryObj } from '@storybook/svelte';
import RelayIcon from './RelayIcon.svelte';

const meta = {
  title: 'Components/RelayIcon',
  component: RelayIcon,
  tags: ['autodocs'],
  argTypes: {
    relayUrl: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    class: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<RelayIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    relayUrl: 'wss://relay.damus.io',
    size: 'md',
  },
};

export const ExtraSmall: Story = {
  args: {
    relayUrl: 'wss://relay.damus.io',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    relayUrl: 'wss://relay.damus.io',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    relayUrl: 'wss://relay.damus.io',
    size: 'lg',
  },
};

export const DifferentRelays: Story = {
  render: () => ({
    Component: RelayIcon,
  }),
  decorators: [
    () => ({
      template: `
        <div class="flex gap-4 items-center">
          <div class="flex flex-col items-center gap-2">
            <RelayIcon relayUrl="wss://relay.damus.io" size="lg" />
            <span class="text-xs">Damus</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <RelayIcon relayUrl="wss://relay.nostr.band" size="lg" />
            <span class="text-xs">Nostr Band</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <RelayIcon relayUrl="wss://nos.lol" size="lg" />
            <span class="text-xs">nos.lol</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <RelayIcon relayUrl="wss://relay.snort.social" size="lg" />
            <span class="text-xs">Snort</span>
          </div>
        </div>
      `,
    }),
  ],
};

export const AllSizes: Story = {
  render: () => ({
    Component: RelayIcon,
  }),
  decorators: [
    () => ({
      template: `
        <div class="flex gap-4 items-end">
          <div class="flex flex-col items-center gap-2">
            <RelayIcon relayUrl="wss://relay.damus.io" size="xs" />
            <span class="text-xs">xs</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <RelayIcon relayUrl="wss://relay.damus.io" size="sm" />
            <span class="text-xs">sm</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <RelayIcon relayUrl="wss://relay.damus.io" size="md" />
            <span class="text-xs">md</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <RelayIcon relayUrl="wss://relay.damus.io" size="lg" />
            <span class="text-xs">lg</span>
          </div>
        </div>
      `,
    }),
  ],
};

export const WithCustomClass: Story = {
  args: {
    relayUrl: 'wss://relay.damus.io',
    size: 'lg',
    class: 'border-2 border-primary',
  },
};

export const FallbackIcon: Story = {
  args: {
    relayUrl: 'wss://example.com',
    size: 'lg',
  },
};
