import type { Meta, StoryObj } from '@storybook/svelte';
import Mention from './Mention.svelte';
import { ndk } from '$lib/ndk.svelte';

const meta = {
  title: 'Components/Mention',
  component: Mention,
  tags: ['autodocs'],
  argTypes: {
    bech32: { control: 'text' },
    class: { control: 'text' },
  },
  args: {
    ndk,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<Mention>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    bech32: 'npub1lxw8x90x5ck7m8gruw6e9ncvd0e45fjfse72tty28j3hj7csw9cqv9z6sf',
  },
};

export const DifferentUser: Story = {
  args: {
    bech32: 'npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m',
  },
};

export const WithClickHandler: Story = {
  args: {
    bech32: 'npub1lxw8x90x5ck7m8gruw6e9ncvd0e45fjfse72tty28j3hj7csw9cqv9z6sf',
    onClick: (bech32: string) => {
      alert(`Clicked mention: ${bech32}`);
    },
  },
};

export const CustomStyling: Story = {
  args: {
    bech32: 'npub1lxw8x90x5ck7m8gruw6e9ncvd0e45fjfse72tty28j3hj7csw9cqv9z6sf',
    class: 'text-lg font-bold',
  },
};

export const InlineText: Story = {
  render: (args) => ({
    Component: Mention,
    props: args,
  }),
  decorators: [
    () => ({
      template: `
        <p class="text-base">
          Hey <Mention bech32="npub1lxw8x90x5ck7m8gruw6e9ncvd0e45fjfse72tty28j3hj7csw9cqv9z6sf" {ndk} />, check this out!
        </p>
      `,
    }),
  ],
};

export const MultipleMentions: Story = {
  render: (args) => ({
    Component: Mention,
    props: args,
  }),
  decorators: [
    () => ({
      template: `
        <p class="text-base">
          <Mention bech32="npub1lxw8x90x5ck7m8gruw6e9ncvd0e45fjfse72tty28j3hj7csw9cqv9z6sf" {ndk} /> and
          <Mention bech32="npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m" {ndk} /> were mentioned in this post.
        </p>
      `,
    }),
  ],
};
