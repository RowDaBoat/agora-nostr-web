import type { Meta, StoryObj } from '@storybook/svelte';
import Button from './button.svelte';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default variants
export const Default: Story = {
  args: {
    children: () => 'Default Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: () => 'Destructive Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: () => 'Outline Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: () => 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: () => 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: () => 'Link Button',
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: 'sm',
    children: () => 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: () => 'Large Button',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: () => `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    `,
  },
};

export const IconSmall: Story = {
  args: {
    size: 'icon-sm',
    children: () => `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    `,
  },
};

export const IconLarge: Story = {
  args: {
    size: 'icon-lg',
    children: () => `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    `,
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: () => 'Disabled Button',
  },
};

export const DisabledDestructive: Story = {
  args: {
    variant: 'destructive',
    disabled: true,
    children: () => 'Disabled Destructive',
  },
};

// With icons
export const WithLeftIcon: Story = {
  args: {
    children: () => `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <span>Add Item</span>
    `,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: () => `
      <span>Continue</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    `,
  },
};

// As link
export const AsLink: Story = {
  args: {
    href: '/some-page',
    children: () => 'Link Button',
  },
};

export const AsLinkOutline: Story = {
  args: {
    href: '/some-page',
    variant: 'outline',
    children: () => 'Link Button Outline',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => ({
    Component: Button,
  }),
  decorators: [
    () => ({
      template: `
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 flex-wrap">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div class="flex gap-2 items-center flex-wrap">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
          <div class="flex gap-2 items-center flex-wrap">
            <Button size="icon-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </Button>
            <Button size="icon">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </Button>
            <Button size="icon-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </div>
        </div>
      `,
    }),
  ],
};
