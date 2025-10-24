<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FollowButton from './FollowButton.svelte';
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/FollowButton',
    component: FollowButton,
    tags: ['autodocs'],
    argTypes: {
      pubkey: { control: 'text' },
      variant: {
        control: { type: 'select' },
        options: ['default', 'outline', 'primary'],
      },
      showIcon: { control: 'boolean' },
    },
    args: {
      pubkey: 'npub1testpubkey123456789',
      variant: 'default',
      showIcon: true,
    }
  });
</script>

<!-- Default variant - not following -->
<Story name="Default Not Following"
  args={{
    pubkey: 'npub1testpubkey1',
    variant: 'default',
  }}
/>

<!-- Default variant - following -->
<Story name="Default Following"
  args={{
    pubkey: 'npub1testpubkey2',
    variant: 'default',
  }}
/>

<!-- Primary variant - not following -->
<Story name="Primary Not Following"
  args={{
    pubkey: 'npub1testpubkey3',
    variant: 'primary',
  }}
/>

<!-- Primary variant - following -->
<Story name="Primary Following"
  args={{
    pubkey: 'npub1testpubkey4',
    variant: 'primary',
  }}
/>

<!-- Without icon -->
<Story name="Without Icon"
  args={{
    pubkey: 'npub1testpubkey5',
    variant: 'primary',
    showIcon: false,
  }}
/>

<!-- With custom class -->
<Story name="Custom Styling"
  args={{
    pubkey: 'npub1testpubkey6',
    class: 'bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600',
  }}
/>
