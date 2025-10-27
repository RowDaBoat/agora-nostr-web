import type { Meta, StoryObj } from '@storybook/svelte';
import RelayCard from './RelayCard.svelte';

const meta = {
  title: 'Components/Relays/RelayCard',
  component: RelayCard,
  tags: ['autodocs'],
  argTypes: {
    relayUrl: { control: 'text' },
    pubkeys: { control: 'object' },
    isFavorite: { control: 'boolean' },
    showFavoriteIcon: { control: 'boolean' },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<RelayCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    relayUrl: 'wss://relay.damus.io',
  },
};

export const WithDescription: Story = {
  args: {
    relayUrl: 'wss://relay.primal.net',
  },
};

export const WithPubkeys: Story = {
  args: {
    relayUrl: 'wss://relay.damus.io',
    pubkeys: [
      'fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52',
      '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2',
      '3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d',
    ],
  },
};

export const WithManyPubkeys: Story = {
  args: {
    relayUrl: 'wss://nos.lol',
    pubkeys: [
      'fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52',
      '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2',
      '3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d',
      '32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245',
      'c4eabae1be3cf657bc1855ee05e69de9f059cb7a059227168b80b89761cbc4e0',
      'a341f45ff9758f570a21b000c17d4e53a3a497c8397f26c0e6d61e5acffc7a98',
      'b0635a8c1b177fcad3d6e3c5e82b4d26f3e1c7d8a9b0e4f5a6c7d8e9f0a1b2c3',
    ],
  },
};

export const Favorited: Story = {
  args: {
    relayUrl: 'wss://relay.damus.io',
    isFavorite: true,
    showFavoriteIcon: true,
  },
};

export const WithFavoriteButton: Story = {
  args: {
    relayUrl: 'wss://relay.nostr.band',
    isFavorite: false,
    showFavoriteIcon: false,
    onFavoriteClick: (e: MouseEvent) => {
      console.log('Favorite clicked', e);
    },
  },
};

export const WithFavoriteButtonActive: Story = {
  args: {
    relayUrl: 'wss://relay.nostr.band',
    isFavorite: true,
    showFavoriteIcon: false,
    onFavoriteClick: (e: MouseEvent) => {
      console.log('Unfavorite clicked', e);
    },
  },
};

export const Clickable: Story = {
  args: {
    relayUrl: 'wss://relay.damus.io',
    pubkeys: [
      'fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52',
      '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2',
    ],
    onclick: () => {
      console.log('Relay card clicked');
    },
  },
};

export const FullFeatured: Story = {
  args: {
    relayUrl: 'wss://relay.primal.net',
    pubkeys: [
      'fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52',
      '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2',
      '3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d',
    ],
    isFavorite: true,
    showFavoriteIcon: true,
    onclick: () => {
      console.log('Relay card clicked');
    },
    onFavoriteClick: (e: MouseEvent) => {
      console.log('Favorite toggled', e);
    },
  },
};

export const RelayGrid: Story = {
  render: () => {
    const relays = [
      'wss://relay.damus.io',
      'wss://relay.primal.net',
      'wss://nos.lol',
      'wss://relay.nostr.band',
    ];

    const samplePubkeys = [
      'fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52',
      '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2',
    ];

    return {
      Component: RelayCard,
    };
  },
  decorators: [
    () => ({
      template: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RelayCard relayUrl="wss://relay.damus.io" />
          <RelayCard relayUrl="wss://relay.primal.net" />
          <RelayCard
            relayUrl="wss://nos.lol"
            pubkeys={['fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52', '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2']}
          />
          <RelayCard
            relayUrl="wss://relay.nostr.band"
            isFavorite={true}
            showFavoriteIcon={true}
          />
        </div>
      `,
    }),
  ],
};

export const RelayList: Story = {
  render: () => {
    return {
      Component: RelayCard,
    };
  },
  decorators: [
    () => ({
      template: `
        <div class="space-y-3">
          <RelayCard relayUrl="wss://relay.damus.io" />
          <RelayCard relayUrl="wss://relay.primal.net" />
          <RelayCard relayUrl="wss://nos.lol" />
          <RelayCard relayUrl="wss://relay.nostr.band" />
          <RelayCard relayUrl="wss://purplepag.es" />
        </div>
      `,
    }),
  ],
};
