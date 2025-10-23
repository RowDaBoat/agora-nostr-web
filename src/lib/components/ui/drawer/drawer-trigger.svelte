<script lang="ts">
	import { Drawer } from "vaul-svelte";

	let { ref = $bindable(null), ...restProps }: Drawer.TriggerProps = $props();
</script>

<Drawer.Trigger bind:ref data-slot="drawer-trigger" {...restProps} />
