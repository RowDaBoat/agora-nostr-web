import type { Meta, StoryObj } from '@storybook/svelte';
import NoteCard from './NoteCard.svelte';
import { ndk } from '$lib/ndk.svelte';
import { NDKKind } from '@nostr-dev-kit/ndk';

const meta = {
  title: 'Components/Notes/NoteCard',
  component: NoteCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'thread-parent', 'thread-main', 'thread-reply'],
    },
    showActions: { control: 'boolean' },
    showThreadLine: { control: 'boolean' },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<NoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Fetch regular notes (kind 1)
export const Default: Story = {
  render: () => {
    const notesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Text], limit: 1 }],
      closeOnEose: false,
    }));

    const note = notesSubscription.events?.[0];

    if (!note) return null;

    return {
      Component: NoteCard,
      props: {
        event: note,
        showActions: true,
        variant: 'default',
      },
    };
  },
};

export const WithoutActions: Story = {
  render: () => {
    const notesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Text], limit: 1 }],
      closeOnEose: false,
    }));

    const note = notesSubscription.events?.[0];

    if (!note) return null;

    return {
      Component: NoteCard,
      props: {
        event: note,
        showActions: false,
      },
    };
  },
};

export const ThreadParent: Story = {
  render: () => {
    const notesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Text], limit: 1 }],
      closeOnEose: false,
    }));

    const note = notesSubscription.events?.[0];

    if (!note) return null;

    return {
      Component: NoteCard,
      props: {
        event: note,
        variant: 'thread-parent',
        showThreadLine: true,
      },
    };
  },
};

export const ThreadMain: Story = {
  render: () => {
    const notesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Text], limit: 1 }],
      closeOnEose: false,
    }));

    const note = notesSubscription.events?.[0];

    if (!note) return null;

    return {
      Component: NoteCard,
      props: {
        event: note,
        variant: 'thread-main',
      },
    };
  },
};

export const ThreadReply: Story = {
  render: () => {
    const notesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Text], limit: 1 }],
      closeOnEose: false,
    }));

    const note = notesSubscription.events?.[0];

    if (!note) return null;

    return {
      Component: NoteCard,
      props: {
        event: note,
        variant: 'thread-reply',
        showThreadLine: true,
      },
    };
  },
};

export const Feed: Story = {
  render: () => {
    const notesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Text], limit: 10 }],
      closeOnEose: false,
    }));

    const notes = notesSubscription.events || [];

    return {
      Component: NoteCard,
    };
  },
  decorators: [
    () => ({
      template: `
        <div class="divide-y divide-border">
          {#each notes as note}
            <NoteCard event={note} />
          {/each}
        </div>
      `,
    }),
  ],
};

export const FromSpecificAuthor: Story = {
  render: () => {
    const notesSubscription = ndk.$subscribe(() => ({
      filters: [{
        kinds: [NDKKind.Text],
        authors: ['fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52'],
        limit: 5
      }],
      closeOnEose: false,
    }));

    const notes = notesSubscription.events || [];

    return {
      Component: NoteCard,
    };
  },
  decorators: [
    () => ({
      template: `
        <div class="divide-y divide-border">
          {#each notes as note}
            <NoteCard event={note} />
          {/each}
        </div>
      `,
    }),
  ],
};
