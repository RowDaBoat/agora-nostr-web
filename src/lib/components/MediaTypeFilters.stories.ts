import type { Meta, StoryObj } from '@storybook/svelte';
import MediaTypeFilters from './MediaTypeFilters.svelte';

const meta = {
  title: 'Components/MediaTypeFilters',
  component: MediaTypeFilters,
  tags: ['autodocs'],
  argTypes: {
    selectedFilter: {
      control: { type: 'select' },
      options: ['conversations', 'images', 'videos', 'articles'],
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<MediaTypeFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Conversations: Story = {
  args: {
    selectedFilter: 'conversations',
    onFilterChange: (filter) => {
      console.log('Filter changed to:', filter);
    },
  },
};

export const Images: Story = {
  args: {
    selectedFilter: 'images',
    onFilterChange: (filter) => {
      console.log('Filter changed to:', filter);
    },
  },
};

export const Videos: Story = {
  args: {
    selectedFilter: 'videos',
    onFilterChange: (filter) => {
      console.log('Filter changed to:', filter);
    },
  },
};

export const Articles: Story = {
  args: {
    selectedFilter: 'articles',
    onFilterChange: (filter) => {
      console.log('Filter changed to:', filter);
    },
  },
};

export const Interactive: Story = {
  args: {
    selectedFilter: 'conversations',
    onFilterChange: (filter) => {
      alert(`Filter changed to: ${filter}`);
    },
  },
};
