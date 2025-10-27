import type { Meta, StoryObj } from '@storybook/svelte';
import SecurePasswordField from './SecurePasswordField.svelte';

const meta = {
  title: 'Components/Backup/SecurePasswordField',
  component: SecurePasswordField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    isValid: { control: 'boolean' },
    touched: { control: 'boolean' },
    successMessage: { control: 'text' },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<SecurePasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Password',
    value: '',
    placeholder: 'Enter your password',
    onChange: (value: string) => {
      console.log('Password changed:', value);
    },
  },
};

export const WithValue: Story = {
  args: {
    label: 'Password',
    value: 'mySecurePassword123',
    placeholder: 'Enter your password',
    onChange: (value: string) => {
      console.log('Password changed:', value);
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    value: 'weak',
    placeholder: 'Enter your password',
    onChange: (value: string) => {
      console.log('Password changed:', value);
    },
    isValid: false,
    touched: true,
    errors: ['Password must be at least 8 characters'],
  },
};

export const WithMultipleErrors: Story = {
  args: {
    label: 'Password',
    value: 'abc',
    placeholder: 'Enter your password',
    onChange: (value: string) => {
      console.log('Password changed:', value);
    },
    isValid: false,
    touched: true,
    errors: [
      'Password must be at least 8 characters',
      'Password must contain at least one number',
      'Password must contain at least one uppercase letter',
    ],
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Password',
    value: 'MySecurePassword123!',
    placeholder: 'Enter your password',
    onChange: (value: string) => {
      console.log('Password changed:', value);
    },
    isValid: true,
    touched: true,
    successMessage: 'Strong password',
  },
};

export const Passphrase: Story = {
  args: {
    label: 'Passphrase',
    value: '',
    placeholder: 'Enter a strong passphrase',
    onChange: (value: string) => {
      console.log('Passphrase changed:', value);
    },
  },
};

export const ConfirmPassword: Story = {
  args: {
    label: 'Confirm Password',
    value: 'MySecurePassword123!',
    placeholder: 'Confirm your password',
    onChange: (value: string) => {
      console.log('Confirm password changed:', value);
    },
    isValid: true,
    touched: true,
    successMessage: 'Passwords match',
  },
};

export const ConfirmPasswordMismatch: Story = {
  args: {
    label: 'Confirm Password',
    value: 'DifferentPassword',
    placeholder: 'Confirm your password',
    onChange: (value: string) => {
      console.log('Confirm password changed:', value);
    },
    isValid: false,
    touched: true,
    errors: ['Passwords do not match'],
  },
};

export const Untouched: Story = {
  args: {
    label: 'Password',
    value: 'weak',
    placeholder: 'Enter your password',
    onChange: (value: string) => {
      console.log('Password changed:', value);
    },
    isValid: false,
    touched: false,
    errors: ['Password must be at least 8 characters'],
  },
};

export const LongLabel: Story = {
  args: {
    label: 'Enter your master passphrase for backup encryption',
    value: '',
    placeholder: 'Passphrase',
    onChange: (value: string) => {
      console.log('Password changed:', value);
    },
  },
};
