import type { Meta, StoryObj } from '@storybook/svelte';
import SplashScreen from './SplashScreen.svelte';

const meta = {
  title: 'Components/SplashScreen',
  component: SplashScreen,
  tags: ['autodocs'],
  argTypes: {
    visible: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<SplashScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  args: {
    visible: true,
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
  },
};
