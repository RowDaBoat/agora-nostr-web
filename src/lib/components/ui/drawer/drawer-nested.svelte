<script lang="ts">
	import { Drawer } from "vaul-svelte";

	let {
		shouldScaleBackground = true,
		open = $bindable(false),
		activeSnapPoint = $bindable(null),
		...restProps
	}: any = $props();
</script>

<Drawer.NestedRoot {shouldScaleBackground} bind:open bind:activeSnapPoint {...restProps} />
