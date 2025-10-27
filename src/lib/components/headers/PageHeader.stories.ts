import type { Meta, StoryObj } from '@storybook/svelte';
import PageHeader from './PageHeader.svelte';

const meta = {
  title: 'Components/Headers/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page Title',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Settings',
    subtitle: 'Manage your account preferences and settings',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Wallet',
    subtitle: 'Manage your Bitcoin wallet',
    icon: () => `
      <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    `,
  },
};

export const WithActions: Story = {
  args: {
    title: 'Notifications',
    subtitle: 'Stay updated with your activity',
    actions: () => `
      <button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        Mark all as read
      </button>
    `,
  },
};

export const WithIconAndActions: Story = {
  args: {
    title: 'Messages',
    subtitle: '12 unread conversations',
    icon: () => `
      <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    `,
    actions: () => `
      <button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        New Message
      </button>
    `,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a very long page title that might wrap on smaller screens',
    subtitle: 'And this is a subtitle that provides additional context about the page',
  },
};

export const MultipleActions: Story = {
  args: {
    title: 'Profile',
    subtitle: 'View and edit your profile',
    actions: () => `
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
          Cancel
        </button>
        <button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>
    `,
  },
};

export const Minimal: Story = {
  args: {
    title: 'About',
  },
};
