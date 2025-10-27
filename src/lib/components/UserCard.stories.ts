import type { Meta, StoryObj } from '@storybook/svelte';
import UserCard from './UserCard.svelte';

const meta = {
  title: 'Components/UserCard',
  component: UserCard,
  tags: ['autodocs'],
  argTypes: {
    pubkey: { control: 'text' },
    showFollow: { control: 'boolean' },
    showAbout: { control: 'boolean' },
    joinedAt: { control: 'number' },
    inviterPubkey: { control: 'text' },
    clickable: { control: 'boolean' },
    class: { control: 'text' },
  },
  args: {
    pubkey: 'fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52',
    showFollow: true,
    showAbout: true,
    clickable: true,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = Math.floor(Date.now() / 1000);

export const Default: Story = {
  args: {},
};

export const WithJoinedDate: Story = {
  args: {
    joinedAt: now - 86400 * 7, // 1 week ago
  },
};

export const WithInviter: Story = {
  args: {
    inviterPubkey: '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2',
  },
};

export const WithJoinedAndInviter: Story = {
  args: {
    joinedAt: now - 86400 * 30, // 30 days ago
    inviterPubkey: '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2',
  },
};

export const WithoutFollowButton: Story = {
  args: {
    showFollow: false,
  },
};

export const WithoutAbout: Story = {
  args: {
    showAbout: false,
  },
};

export const NotClickable: Story = {
  args: {
    clickable: false,
  },
};

export const MinimalCard: Story = {
  args: {
    showFollow: false,
    showAbout: false,
  },
};

export const RecentlyJoined: Story = {
  args: {
    joinedAt: now - 3600, // 1 hour ago
    inviterPubkey: '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2',
  },
};

export const DifferentUser: Story = {
  args: {
    pubkey: '3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d',
    joinedAt: now - 86400 * 90, // 90 days ago
  },
};

export const CustomStyling: Story = {
  args: {
    class: 'bg-blue-50 border-blue-200',
  },
};
