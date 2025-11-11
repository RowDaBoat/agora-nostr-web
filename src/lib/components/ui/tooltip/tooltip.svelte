<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  let {
    open = $bindable(),
    openDelay = 700,
    closeDelay = 0,
    children
  }: {
    open?: boolean;
    openDelay?: number;
    closeDelay?: number;
    children: Snippet;
  } = $props();
</script>

<TooltipPrimitive.Root bind:open delayDuration={openDelay}>
  {@render children()}
</TooltipPrimitive.Root>
