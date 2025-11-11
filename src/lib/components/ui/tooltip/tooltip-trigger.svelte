<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  let {
    children
  }: {
    children: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();
</script>

<TooltipPrimitive.Trigger>
  {#snippet child({ props })}
    {@render children({ props })}
  {/snippet}
</TooltipPrimitive.Trigger>
