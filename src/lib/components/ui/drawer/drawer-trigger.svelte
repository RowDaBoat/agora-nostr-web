<script lang="ts">
	import { Drawer } from "vaul-svelte";

	let {  ...restProps }: any = $props();
</script>

<Drawer.Trigger data-slot="drawer-trigger" {...restProps} />
