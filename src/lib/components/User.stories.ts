import type { Meta, StoryObj } from '@storybook/svelte';
import User from './User.svelte';

const meta = {
  title: 'Components/User',
  component: User,
  tags: ['autodocs'],
  argTypes: {
    pubkey: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['avatar', 'avatar-name', 'avatar-name-handle', 'avatar-name-bio', 'avatar-name-meta'],
    },
    avatarSize: { control: 'text' },
    nameSize: { control: 'text' },
    handleSize: { control: 'text' },
    bioSize: { control: 'text' },
    showHoverCard: { control: 'boolean' },
  },
  args: {
    // Using a real Nostr pubkey for testing
    pubkey: 'fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52',
    showHoverCard: true,
  },
  parameters: {
    layout: 'centered',
    // Add extra space for hover card
    docs: {
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
} satisfies Meta<User>;

export default meta;
type Story = StoryObj<typeof meta>;

// Avatar only variant
export const AvatarOnly: Story = {
  args: {
    variant: 'avatar',
    avatarSize: 'w-10 h-10',
  },
};

export const AvatarOnlyLarge: Story = {
  args: {
    variant: 'avatar',
    avatarSize: 'w-16 h-16',
  },
};

export const AvatarOnlySmall: Story = {
  args: {
    variant: 'avatar',
    avatarSize: 'w-8 h-8',
  },
};

// Avatar + Name variant
export const AvatarName: Story = {
  args: {
    variant: 'avatar-name',
    avatarSize: 'w-10 h-10',
    nameSize: 'text-base font-semibold',
  },
};

export const AvatarNameLarge: Story = {
  args: {
    variant: 'avatar-name',
    avatarSize: 'w-12 h-12',
    nameSize: 'text-lg font-bold',
  },
};

export const AvatarNameSmall: Story = {
  args: {
    variant: 'avatar-name',
    avatarSize: 'w-8 h-8',
    nameSize: 'text-sm font-medium',
  },
};

// Avatar + Name + Handle variant
export const AvatarNameHandle: Story = {
  args: {
    variant: 'avatar-name-handle',
    avatarSize: 'w-10 h-10',
    nameSize: 'text-base font-semibold',
    handleSize: 'text-sm text-muted-foreground',
  },
};

export const AvatarNameHandleLarge: Story = {
  args: {
    variant: 'avatar-name-handle',
    avatarSize: 'w-14 h-14',
    nameSize: 'text-lg font-bold',
    handleSize: 'text-base text-muted-foreground',
  },
};

// Avatar + Name + Bio variant
export const AvatarNameBio: Story = {
  args: {
    variant: 'avatar-name-bio',
    avatarSize: 'w-12 h-12',
    nameSize: 'text-base font-semibold',
    bioSize: 'text-sm text-muted-foreground',
  },
};

export const AvatarNameBioCompact: Story = {
  args: {
    variant: 'avatar-name-bio',
    avatarSize: 'w-10 h-10',
    nameSize: 'text-sm font-semibold',
    bioSize: 'text-xs text-muted-foreground',
  },
};

// Avatar + Name + Meta variant
export const AvatarNameMeta: Story = {
  args: {
    variant: 'avatar-name-meta',
    avatarSize: 'w-10 h-10',
    nameSize: 'text-base font-semibold',
  },
};

// Without hover card
export const WithoutHoverCard: Story = {
  args: {
    variant: 'avatar-name-handle',
    showHoverCard: false,
  },
};

// Different Nostr users for variety
export const DifferentUser1: Story = {
  args: {
    variant: 'avatar-name-handle',
    pubkey: 'npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m',
  },
};

export const DifferentUser2: Story = {
  args: {
    variant: 'avatar-name-bio',
    pubkey: 'npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6',
  },
};

// Custom styling
export const CustomStyling: Story = {
  args: {
    variant: 'avatar-name',
    class: 'p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors',
  },
};

// Multiple sizes demonstration
export const SizeComparison: Story = {
  args: {
    variant: 'avatar-name-handle',
  },
  render: (args) => ({
    Component: User,
    props: args,
  }),
};
