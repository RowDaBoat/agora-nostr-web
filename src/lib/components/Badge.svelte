<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'primary' | 'secondary';
    size?: 'xs' | 'sm';
    indicator?: boolean;
    class?: string;
    children?: Snippet;
  }

  const { variant = 'primary', size = 'sm', indicator = false, class: className = '', children }: Props = $props();

  const variantClasses = $derived({
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-primary/20 text-primary'
  }[variant]);

  const sizeClasses = $derived(
    indicator
      ? 'w-2 h-2'
      : {
          xs: 'min-w-[18px] h-[18px] px-1 text-[10px] font-bold',
          sm: 'px-2 py-1 text-xs font-medium'
        }[size]
  );
</script>

<span
  class="rounded-full flex items-center justify-center {variantClasses} {sizeClasses} {className}"
>
  {#if !indicator && children}
    {@render children()}
  {/if}
</span>
