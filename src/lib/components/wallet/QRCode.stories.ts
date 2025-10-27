import type { Meta, StoryObj } from '@storybook/svelte';
import QRCode from './QRCode.svelte';

const meta = {
  title: 'Components/Wallet/QRCode',
  component: QRCode,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    size: { control: 'number' },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<QRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'https://example.com',
    size: 300,
  },
};

export const Small: Story = {
  args: {
    value: 'https://example.com',
    size: 150,
  },
};

export const Large: Story = {
  args: {
    value: 'https://example.com',
    size: 400,
  },
};

export const BitcoinAddress: Story = {
  args: {
    value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    size: 300,
  },
};

export const LightningInvoice: Story = {
  args: {
    value: 'lnbc10u1p3pj257pp5yztkwjcz5ftl5laxkav23zmzekaw37zk6kmv80pk4xaev5qhtz7qdpdwd3xger9wd5kwm36yprx7u3qd36kucmgyp5k7um0d93kqeter9eqs7cnpwf4',
    size: 300,
  },
};

export const NostrProfile: Story = {
  args: {
    value: 'nostr:npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m',
    size: 300,
  },
};

export const URL: Story = {
  args: {
    value: 'https://github.com/nostr-protocol/nostr',
    size: 300,
  },
};

export const ShortText: Story = {
  args: {
    value: 'Hello Nostr!',
    size: 200,
  },
};

export const LongText: Story = {
  args: {
    value: 'This is a longer piece of text that will be encoded into a QR code. QR codes can store quite a bit of data!',
    size: 350,
  },
};

export const SizesComparison: Story = {
  render: () => ({
    Component: QRCode,
  }),
  decorators: [
    () => ({
      template: `
        <div class="flex gap-4 items-end">
          <div class="flex flex-col items-center gap-2">
            <QRCode value="https://example.com" size={100} />
            <span class="text-xs">100px</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <QRCode value="https://example.com" size={200} />
            <span class="text-xs">200px</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <QRCode value="https://example.com" size={300} />
            <span class="text-xs">300px</span>
          </div>
        </div>
      `,
    }),
  ],
};
