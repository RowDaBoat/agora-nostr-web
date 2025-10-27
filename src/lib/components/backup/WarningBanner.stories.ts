import type { Meta, StoryObj } from '@storybook/svelte';
import WarningBanner from './WarningBanner.svelte';

const meta = {
  title: 'Components/Backup/WarningBanner',
  component: WarningBanner,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['warning', 'danger'],
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<WarningBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  args: {
    title: 'Important Notice',
    description: 'Please read this information carefully before proceeding.',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    title: 'Critical Warning',
    description: 'This action cannot be undone. Make sure you understand the consequences.',
    variant: 'danger',
  },
};

export const PassphraseWarning: Story = {
  args: {
    title: 'Passphrase Warning',
    description: 'Your passphrase encrypts your key shards. If you forget it, your backup cannot be recovered. Write it down and store it securely.',
    variant: 'warning',
  },
};

export const BackupWarning: Story = {
  args: {
    title: 'Backup Your Keys',
    description: 'You must create a backup of your keys before proceeding. Without a backup, you may lose access to your account permanently.',
    variant: 'danger',
  },
};

export const LongDescription: Story = {
  args: {
    title: 'Security Notice',
    description: 'This is a longer description that explains the security implications in more detail. It provides additional context and information that users should be aware of before making important decisions about their account security and data.',
    variant: 'warning',
  },
};

export const ShortWarning: Story = {
  args: {
    title: 'Warning',
    description: 'This action requires confirmation.',
    variant: 'warning',
  },
};

export const CriticalError: Story = {
  args: {
    title: 'Account Deletion',
    description: 'Deleting your account is permanent and cannot be reversed. All your data will be lost forever.',
    variant: 'danger',
  },
};

export const MultipleBanners: Story = {
  render: () => ({
    Component: WarningBanner,
  }),
  decorators: [
    () => ({
      template: `
        <div class="space-y-4">
          <WarningBanner
            title="Warning"
            description="This is a warning message."
            variant="warning"
          />
          <WarningBanner
            title="Danger"
            description="This is a danger message."
            variant="danger"
          />
        </div>
      `,
    }),
  ],
};
