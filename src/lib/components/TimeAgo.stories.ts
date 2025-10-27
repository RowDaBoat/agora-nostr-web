import type { Meta, StoryObj } from '@storybook/svelte';
import TimeAgo from './TimeAgo.svelte';

const meta = {
  title: 'Components/TimeAgo',
  component: TimeAgo,
  tags: ['autodocs'],
  argTypes: {
    timestamp: { control: 'number' },
    class: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<TimeAgo>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = Math.floor(Date.now() / 1000);

export const JustNow: Story = {
  args: {
    timestamp: now - 5, // 5 seconds ago
  },
};

export const OneMinuteAgo: Story = {
  args: {
    timestamp: now - 60, // 1 minute ago
  },
};

export const FiveMinutesAgo: Story = {
  args: {
    timestamp: now - 300, // 5 minutes ago
  },
};

export const OneHourAgo: Story = {
  args: {
    timestamp: now - 3600, // 1 hour ago
  },
};

export const TwoHoursAgo: Story = {
  args: {
    timestamp: now - 7200, // 2 hours ago
  },
};

export const OneDayAgo: Story = {
  args: {
    timestamp: now - 86400, // 1 day ago
  },
};

export const ThreeDaysAgo: Story = {
  args: {
    timestamp: now - 259200, // 3 days ago
  },
};

export const OneWeekAgo: Story = {
  args: {
    timestamp: now - 604800, // 1 week ago
  },
};

export const OneMonthAgo: Story = {
  args: {
    timestamp: now - 2592000, // ~30 days ago
  },
};

export const OneYearAgo: Story = {
  args: {
    timestamp: now - 31536000, // ~365 days ago
  },
};

export const CustomStyling: Story = {
  args: {
    timestamp: now - 3600,
    class: 'text-lg font-bold text-blue-500',
  },
};
