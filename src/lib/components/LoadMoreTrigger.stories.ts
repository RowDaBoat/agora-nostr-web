import type { Meta, StoryObj } from '@storybook/svelte';
import LoadMoreTrigger from './LoadMoreTrigger.svelte';

const meta = {
  title: 'Components/LoadMoreTrigger',
  component: LoadMoreTrigger,
  tags: ['autodocs'],
  argTypes: {
    hasMore: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<LoadMoreTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasMore: true,
    isLoading: false,
    onIntersect: () => {
      console.log('Load more triggered');
    },
  },
};

export const Loading: Story = {
  args: {
    hasMore: true,
    isLoading: true,
    onIntersect: () => {
      console.log('Load more triggered');
    },
  },
};

export const NoMoreContent: Story = {
  args: {
    hasMore: false,
    isLoading: false,
    onIntersect: () => {
      console.log('Load more triggered');
    },
  },
};

export const WithAlert: Story = {
  args: {
    hasMore: true,
    isLoading: false,
    onIntersect: () => {
      alert('Load more triggered!');
    },
  },
};

export const InScrollContainer: Story = {
  render: (args) => ({
    Component: LoadMoreTrigger,
    props: args,
  }),
  args: {
    hasMore: true,
    isLoading: false,
    onIntersect: () => {
      console.log('Load more triggered');
    },
  },
  decorators: [
    () => ({
      template: `
        <div class="h-96 overflow-y-auto border border-border rounded-lg p-4">
          <div class="space-y-4">
            <div class="p-4 bg-card rounded">Item 1</div>
            <div class="p-4 bg-card rounded">Item 2</div>
            <div class="p-4 bg-card rounded">Item 3</div>
            <div class="p-4 bg-card rounded">Item 4</div>
            <div class="p-4 bg-card rounded">Item 5</div>
            <div class="p-4 bg-card rounded">Item 6</div>
            <div class="p-4 bg-card rounded">Item 7</div>
            <div class="p-4 bg-card rounded">Item 8</div>
            <LoadMoreTrigger {...args} />
          </div>
        </div>
      `,
    }),
  ],
};
