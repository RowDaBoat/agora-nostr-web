<script lang="ts">
	import { Drawer } from "vaul-svelte";

	let {
		shouldScaleBackground = true,
		open = $bindable(false),
		activeSnapPoint = $bindable(null),
		...restProps
	}: Drawer.RootProps = $props();
</script>

<Drawer.Root {shouldScaleBackground} bind:open bind:activeSnapPoint {...restProps} />
