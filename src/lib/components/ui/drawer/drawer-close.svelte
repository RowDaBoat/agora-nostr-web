<script lang="ts">
	import { Drawer } from "vaul-svelte";

	let { ref = $bindable(null), ...restProps }: Drawer.CloseProps = $props();
</script>

<Drawer.Close bind:ref data-slot="drawer-close" {...restProps} />
