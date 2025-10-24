<script lang="ts">
  import SelectedUserBadge from './SelectedUserBadge.svelte';
  import UserListItem from './UserListItem.svelte';

  interface Props {
    searchQuery: string;
    isIdentifierInput: boolean;
    selectedPubkeys: string[];
    filteredFollows: string[];
    multiple: boolean;
    onSearchQueryChange: (value: string) => void;
    onAddByIdentifier: () => void;
    onRemoveUser: (pubkey: string) => void;
    onToggleUser: (pubkey: string) => void;
  }

  let {
    searchQuery = $bindable(),
    isIdentifierInput,
    selectedPubkeys,
    filteredFollows,
    multiple,
    onSearchQueryChange,
    onAddByIdentifier,
    onRemoveUser,
    onToggleUser
  }: Props = $props();
</script>

<div class="flex flex-col max-h-[400px]">
  <!-- Header -->
  <div class="p-3 border-b border-border">
    <h3 class="font-semibold text-sm mb-2">Tag people</h3>
    <div class="relative">
      <svg class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search or paste npub/identifier..."
        class="w-full pl-8 pr-16 py-2 bg-muted border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        onkeydown={(e) => {
          if (e.key === 'Enter' && isIdentifierInput) {
            onAddByIdentifier();
          }
        }}
      />
      {#if isIdentifierInput}
        <button
          type="button"
          onclick={onAddByIdentifier}
          class="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded text-xs font-medium transition-colors"
        >
          Add
        </button>
      {/if}
    </div>
    {#if !searchQuery}
      <p class="text-xs text-muted-foreground mt-1.5">
        Search follows or paste npub/hex/NIP-05
      </p>
    {/if}
  </div>

  <!-- Selected users -->
  {#if selectedPubkeys.length > 0}
    <div class="px-3 py-2 border-b border-border bg-muted/30">
      <div class="text-xs font-medium text-muted-foreground mb-2">
        Selected ({selectedPubkeys.length})
      </div>
      <div class="flex flex-wrap gap-1.5">
        {#each selectedPubkeys as pubkey (pubkey)}
          <SelectedUserBadge {pubkey} onRemove={onRemoveUser} />
        {/each}
      </div>
    </div>
  {/if}

  <!-- Follows list -->
  <div class="overflow-y-auto flex-1">
    {#if filteredFollows.length === 0}
      <div class="text-center py-8 px-3 text-muted-foreground text-sm">
        {searchQuery ? 'No matches found' : 'You don\'t follow anyone yet'}
      </div>
    {:else}
      <div class="p-2 space-y-1">
        {#each filteredFollows as pubkey (pubkey)}
          <UserListItem
            {pubkey}
            isSelected={selectedPubkeys.includes(pubkey)}
            showCheckbox={multiple}
            onToggle={onToggleUser}
          />
        {/each}
      </div>
    {/if}
  </div>
</div>
