<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ndk } from '$lib/ndk.svelte';
	import Avatar from '$lib/components/ndk/avatar.svelte';
	import UserHoverCard from './UserHoverCard.svelte';
    import type { NDKUserProfile, NDKUser } from '@nostr-dev-kit/ndk';

	interface Props {
		pubkey: string;
		variant?: 'avatar' | 'avatar-name' | 'avatar-name-handle' | 'avatar-name-bio' | 'avatar-name-meta';
		avatarSize?: string;
		nameSize?: string;
		handleSize?: string;
		bioSize?: string;
		meta?: Snippet;
		showHoverCard?: boolean;
		onclick?: (e: MouseEvent) => void;
		class?: string;
	}

	const {
		pubkey,
		variant = 'avatar',
		avatarSize = 'w-10 h-10',
		nameSize = 'text-base font-semibold',
		handleSize = 'text-sm text-muted-foreground',
		bioSize = 'text-sm text-muted-foreground',
		meta,
		showHoverCard = true,
		onclick,
		class: className = ''
	}: Props = $props();

	let user = $state<NDKUser | undefined>(undefined);
	let profile = $state<NDKUserProfile | null>(null);
	$effect(() => { ndk.fetchUser(pubkey).then(u => {
		user = u;
		u?.fetchProfile().then(p => { profile = p; });
	}) });

	let showUserHoverCard = $state(false);
	let hoverCardPosition = $state({ x: 0, y: 0 });
	let hoverTimer: ReturnType<typeof setTimeout> | null = null;
	let containerElement = $state<HTMLElement | null>(null);

	function handleClick(e: MouseEvent) {
		if (onclick) {
			onclick(e);
		} else {
			window.location.href = `/p/${user?.npub}`;
		}
	}

	function handleMouseEnter() {
		if (!showHoverCard) return;
		if (hoverTimer) clearTimeout(hoverTimer);

		hoverTimer = setTimeout(() => {
			if (containerElement) {
				const rect = containerElement.getBoundingClientRect();
				const viewportWidth = window.innerWidth;
				const cardWidth = 320; // w-80 = 320px
				const spacing = 16;

				let x = rect.right + spacing;

				if (x + cardWidth > viewportWidth - spacing) {
					x = rect.left - cardWidth - spacing;
				}

				const y = rect.top;

				hoverCardPosition = { x, y };
				showUserHoverCard = true;
			}
		}, 500);
	}

	function handleMouseLeave() {
		if (hoverTimer) {
			clearTimeout(hoverTimer);
			hoverTimer = null;
		}

		hoverTimer = setTimeout(() => {
			showUserHoverCard = false;
		}, 100);
	}

	function handleHoverCardMouseEnter() {
		if (hoverTimer) {
			clearTimeout(hoverTimer);
			hoverTimer = null;
		}
	}

	function handleHoverCardMouseLeave() {
		showUserHoverCard = false;
	}

	const displayName = $derived(profile?.displayName || profile?.name || `${pubkey?.slice(0, 8)}...`);
	const handle = $derived(profile?.name || pubkey?.slice(0, 8));
</script>

{#if variant === 'avatar'}
	<button
		bind:this={containerElement}
		type="button"
		onclick={handleClick}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		class="flex-shrink-0 {className}"
	>
		<Avatar {ndk} {pubkey} class="{avatarSize} cursor-pointer hover:opacity-80 transition-opacity" />
	</button>
{:else if variant === 'avatar-name'}
	<button
		bind:this={containerElement}
		type="button"
		onclick={handleClick}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		class="flex items-center gap-3 cursor-pointer {className}"
	>
		<Avatar {ndk} {pubkey} class="{avatarSize} hover:opacity-80 transition-opacity" />
		<p class="{nameSize} text-foreground truncate hover:underline flex-1 min-w-0 text-left">{displayName}</p>
	</button>
{:else if variant === 'avatar-name-handle'}
	<button
		bind:this={containerElement}
		type="button"
		onclick={handleClick}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		class="flex items-center gap-3 cursor-pointer text-left w-full {className}"
	>
		<Avatar {ndk} {pubkey} class="{avatarSize} hover:opacity-80 transition-opacity flex-shrink-0" />
		<div class="flex-1 min-w-0 flex flex-col">
			<p class="{nameSize} text-foreground truncate hover:underline">{displayName}</p>
			<p class="{handleSize} truncate">@{handle}</p>
		</div>
	</button>
{:else if variant === 'avatar-name-bio'}
	<button
		bind:this={containerElement}
		type="button"
		onclick={handleClick}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		class="flex items-center gap-3 cursor-pointer text-left w-full {className}"
	>
		<Avatar {ndk} {pubkey} class="{avatarSize} hover:opacity-80 transition-opacity flex-shrink-0" />
		<div class="flex-1 min-w-0">
			<p class="{nameSize} text-foreground truncate hover:underline">{displayName}</p>
			{#if profile?.about}
				<p class="{bioSize} truncate line-clamp-2">{profile.about}</p>
			{/if}
		</div>
	</button>
{:else if variant === 'avatar-name-meta'}
	<div
		bind:this={containerElement}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		class="flex items-center gap-3 {className}"
	>
		<button
			type="button"
			onclick={handleClick}
			class="flex-shrink-0"
		>
			<Avatar {ndk} {pubkey} class="{avatarSize} cursor-pointer hover:opacity-80 transition-opacity" />
		</button>
		<div class="flex-1 min-w-0">
			<button
				type="button"
				onclick={handleClick}
				class="text-left w-full min-w-0"
			>
				<p class="{nameSize} text-foreground truncate hover:underline">{displayName}</p>
			</button>
			{#if meta}
				{@render meta()}
			{/if}
		</div>
	</div>
{/if}

<!-- User Hover Card -->
<div
	onmouseenter={handleHoverCardMouseEnter}
	onmouseleave={handleHoverCardMouseLeave}
>
	<UserHoverCard
		{pubkey}
		isVisible={showUserHoverCard}
		position={hoverCardPosition}
	/>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
