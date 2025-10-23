<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';

	let open = $state(false);
	const isDesktop = new MediaQuery('(min-width: 768px)');
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 p-4">
	<div class="text-center">
		<h1 class="mb-8 text-4xl font-bold">Responsive Drawer/Dialog Test</h1>
		<p class="mb-4 text-gray-600">
			Resize your browser to see the component change between dialog (desktop) and drawer (mobile)
		</p>
		<p class="mb-8 text-sm text-gray-500">
			Current mode: <span class="font-semibold"
				>{isDesktop.current ? 'Desktop (Dialog)' : 'Mobile (Drawer)'}</span
			>
		</p>

		{#if isDesktop.current}
			<Dialog.Root bind:open>
				<Dialog.Trigger>
					<button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2">
						Edit Profile
					</button>
				</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Edit profile</Dialog.Title>
						<Dialog.Description>
							Make changes to your profile here. Click save when you're done.
						</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<label for="name" class="text-right">Name</label>
							<input id="name" value="Pedro Duarte" class="col-span-3 rounded border p-2" />
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<label for="username" class="text-right">Username</label>
							<input id="username" value="@peduarte" class="col-span-3 rounded border p-2" />
						</div>
					</div>
					<Dialog.Footer>
						<button type="submit" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2">
							Save changes
						</button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		{:else}
			<Drawer.Root bind:open>
				<Drawer.Trigger>
					<button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2">
						Edit Profile
					</button>
				</Drawer.Trigger>
				<Drawer.Content>
					<Drawer.Header class="text-left">
						<Drawer.Title>Edit profile</Drawer.Title>
						<Drawer.Description>
							Make changes to your profile here. Click save when you're done.
						</Drawer.Description>
					</Drawer.Header>
					<div class="grid gap-4 px-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<label for="name-drawer" class="text-right">Name</label>
							<input id="name-drawer" value="Pedro Duarte" class="col-span-3 rounded border p-2" />
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<label for="username-drawer" class="text-right">Username</label>
							<input id="username-drawer" value="@peduarte" class="col-span-3 rounded border p-2" />
						</div>
					</div>
					<Drawer.Footer class="pt-2">
						<button type="submit" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2">
							Save changes
						</button>
						<button type="button" onclick={() => (open = false)} class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border h-9 px-4 py-2">
							Cancel
						</button>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		{/if}
	</div>
</div>
