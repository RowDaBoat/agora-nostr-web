<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { ndk } from '$lib/ndk.svelte';
	import { decryptInvitePayload } from '$lib/utils/inviteEncryption';
	import { AGORA_RELAYS } from '$lib/utils/relayUtils';
	import { User } from '$lib/ndk/ui/user';
	import type { NDKEvent } from '@nostr-dev-kit/ndk';
	import { NDKKind, NDKSubscriptionCacheUsage, NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
	import { onboardingStore } from '$lib/stores/onboarding.svelte';
	import { t } from 'svelte-i18n';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	const code = $derived($page.params.code);
	const dTag = $derived(code ? code.slice(0, 12) : null);
	const encryptionKey = $derived(code && code.length > 12 ? code.slice(12) : null);

	// Subscribe to 513 invite events
	const inviteSubscription = ndk.$subscribe(() => ({
		filters: { kinds: [513], '#d': [dTag], limit: 1 },
		relayUrls: [...AGORA_RELAYS],
		subId: 'invite',
		cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
		closeOnEose: true
	}));

	// Extract the first 513 event (once)
	let invite513Event = $state<NDKEvent | null>(null);
	$effect(() => {
		invite513Event ??= inviteSubscription.events[0];
	});

	// Parse and decrypt the invite (once)
	let inviteData = $state<{
		welcomeMessage?: string;
		recipientName?: string;
		cashuToken?: string;
		inviter?: string;
		inviteEventId?: string;
		inviteRelay?: string;
		inviteCode?: string;
		validCodes?: string[];
	} | null>(null);

	$effect(() => {
		if (!invite513Event || !code || inviteData) return;

		(async () => {
			try {
				// Extract all code tags from the 513 event
				const codeTags = invite513Event.tags.filter(tag => tag[0] === 'code');
				const validCodes = codeTags.map(tag => tag[1]);

				if (validCodes.length === 0) return;

				// Get the relay where the event was found
				const relayUrl = invite513Event.relay?.url || Array.from(invite513Event.onRelays)[0]?.url;

				// Decrypt or parse content
				let payload;
				if (encryptionKey) {
					const decrypted = await decryptInvitePayload(invite513Event.content, encryptionKey);
					payload = JSON.parse(decrypted);
				} else {
					payload = JSON.parse(invite513Event.content);
				}

				// Show invite immediately with first code
				inviteData = {
					...payload,
					inviteEventId: invite513Event.id,
					inviteRelay: relayUrl,
					inviteCode: validCodes[0],
					validCodes
				};
			} catch (err) {
				console.error('Failed to parse invite:', err);
			}
		})();
	});

	// Fetch 514 redemptions to check available codes (once)
	let usedCodes = $state<Set<string>>(new Set());
	let redemptionsFetched = $state(false);

	$effect(() => {
		if (!invite513Event || !inviteData || redemptionsFetched) return;

		(async () => {
			redemptionsFetched = true;
			const relayUrl = inviteData.inviteRelay;
			if (!relayUrl) return;

			try {
				const redemptions = await ndk.guardrailOff().fetchEvents(
					{ kinds: [514 as NDKKind], '#e': [invite513Event.id] },
					{ relayUrls: [relayUrl], subId: 'invite-redemptions', cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY }
				);

				// Extract used codes
				const codes = new Set<string>();
				for (const redemption of redemptions) {
					const codeTag = redemption.tags.find(tag => tag[0] === 'code');
					if (codeTag?.[1]) {
						codes.add(codeTag[1]);
					}
				}
				usedCodes = codes;

				// Update invite with first available code
				const availableCodes = inviteData.validCodes?.filter(c => !codes.has(c)) || [];
				if (availableCodes.length > 0) {
					inviteData.inviteCode = availableCodes[0];
				}
			} catch (err) {
				console.error('Failed to fetch redemptions:', err);
			}
		})();
	});

	// Derived computed states
	const hasAvailableCodes = $derived.by(() => {
		if (!inviteData?.validCodes) return false;
		return inviteData.validCodes.some(c => !usedCodes.has(c));
	});

	let inviterProfile = $state<import('@nostr-dev-kit/ndk').NDKUserProfile | null>(null);

	$effect(() => {
		const inviter = inviteData?.inviter;
		if (!inviter) {
			inviterProfile = null;
			return;
		}
		ndk.fetchUser(inviter).then(u => {
			u?.fetchProfile().then(p => { inviterProfile = p; });
		});
	});

	const isLoading = $derived(!code || !inviteData);
	const error = $derived.by(() => {
		if (!code) return $t('onboarding.invite.inviteNotFound');
		if (inviteSubscription.events.length === 0 && inviteSubscription.eosed) return $t('onboarding.invite.inviteNotFound');
		// If we have invite data but no available codes after checking
		if (inviteData && !hasAvailableCodes && redemptionsFetched) {
			const inviterName = inviteData.inviter ? 'them' : 'the inviter';
			return $t('onboarding.invite.inviteReachedMax', { values: { inviter: inviterName } });
		}
		return null;
	});

	// Login state
	let showLoginForm = $state(false);
	let isLoggingIn = $state(false);
	let loginMethod = $state<'nip07' | 'nsec' | null>(null);
	let nsecInput = $state('');
	let loginError = $state('');

	function handleStartJourney() {
		if (!inviteData) return;

		// Store invite data in the onboarding store
		onboardingStore.setInvite({
			welcomeMessage: inviteData.welcomeMessage,
			recipientName: inviteData.recipientName,
			cashuToken: inviteData.cashuToken,
			inviter: inviteData.inviter,
			inviteEventId: inviteData.inviteEventId,
			inviteRelay: inviteData.inviteRelay,
			inviteCode: inviteData.inviteCode
		});

		goto('/onboarding');
	}

	function handleSignIn() {
		// Store invite data before showing login form
		if (inviteData) {
			onboardingStore.setInvite({
				welcomeMessage: inviteData.welcomeMessage,
				recipientName: inviteData.recipientName,
				cashuToken: inviteData.cashuToken,
				inviter: inviteData.inviter,
				inviteEventId: inviteData.inviteEventId,
				inviteRelay: inviteData.inviteRelay,
				inviteCode: inviteData.inviteCode
			});
		}
		showLoginForm = true;
	}

	async function loginWithNip07() {
		if (!window.nostr) {
			loginError = 'No Nostr extension found. Please install Alby or nos2x.';
			return;
		}

		if (!ndk.$sessions) {
			loginError = 'Sessions not available';
			return;
		}

		try {
			isLoggingIn = true;
			loginError = '';
			const signer = new NDKNip07Signer();
			await ndk.$sessions.login(signer);
			// After successful login, go to onboarding with invite context
			goto('/onboarding');
		} catch (err) {
			loginError = err instanceof Error ? err.message : 'Failed to login';
		} finally {
			isLoggingIn = false;
		}
	}

	async function loginWithNsec() {
		if (!nsecInput.trim()) {
			loginError = 'Please enter your nsec';
			return;
		}

		if (!ndk.$sessions) {
			loginError = 'Sessions not available';
			return;
		}

		try {
			isLoggingIn = true;
			loginError = '';
			const signer = new NDKPrivateKeySigner(nsecInput.trim());
			await ndk.$sessions.login(signer);
			// After successful login, go to onboarding with invite context
			goto('/onboarding');
		} catch (err) {
			loginError = err instanceof Error ? err.message : 'Invalid nsec';
		} finally {
			isLoggingIn = false;
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center p-4">
	<div class="w-full max-w-xl">
		{#if isLoading}
			<!-- Loading State -->
			<div class="relative bg-card dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden p-8">
				<div class="text-center">
					<div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-orange-600 mx-auto mb-4"></div>
					<p class="text-muted-foreground">{$t('onboarding.invite.loadingInvite')}</p>
				</div>
			</div>
		{:else if error}
			<!-- Error State -->
			<div class="relative bg-card dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden p-8">
				<div class="text-center">
					<div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
						<svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</div>
					<h2 class="text-xl font-bold text-foreground mb-2">{$t('onboarding.invite.inviteNotFound')}</h2>
					<p class="text-muted-foreground mb-6">{error}</p>
					<button
						onclick={() => goto('/')}
						class="px-6 py-2 bg-primary hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors"
					>
						{$t('onboarding.invite.goHome')}
					</button>
				</div>
			</div>
		{:else}
			<!-- Main Card -->
			<div class="relative bg-card dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden">
			<!-- Hero Banner -->
			<div class="h-32 bg-primary opacity-90"></div>

			<!-- Content Container -->
			<div class="px-8 pb-8 pt-12">
				{#if !showLoginForm}
					<!-- Inviter Profile -->
					{#if inviteData?.inviter}
						<div class="flex flex-col items-center mb-8 -mt-20">
							<div class="relative mb-4">
								<div class="w-24 h-24 rounded-full ring-4 ring-white dark:ring-neutral-900 overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
									<User.Root {ndk} pubkey={inviteData.inviter}>
										<User.Avatar class="w-full h-full object-cover [&>*]:w-full [&>*]:h-full [&>*]:object-cover" />
									</User.Root>
								</div>
							</div>
							<div class="text-center">
								<h2 class="text-xl font-bold text-foreground">
									{inviterProfile?.displayName || inviterProfile?.name || 'Someone'}
								</h2>
								<p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{$t('onboarding.invite.invitedYou')}</p>
							</div>
						</div>
					{/if}

					<!-- Welcome Message -->
					{#if inviteData?.welcomeMessage}
						<div class="mb-8 p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-border">
							<p class="text-foreground whitespace-pre-wrap leading-relaxed">
								{inviteData.welcomeMessage}
							</p>
						</div>
					{/if}

					<!-- Title Section -->
					<div class="text-center mb-8">
						<h1 class="text-3xl font-bold mb-3 text-foreground">
							{$t('onboarding.invite.yourVoiceMatters')}
						</h1>
						<p class="text-muted-foreground">
							{$t('onboarding.invite.joinGlobal')}
						</p>
					</div>

					<!-- Feature Points -->
					<div class="space-y-5 mb-10">
						<div class="flex items-start gap-4">
							<div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
								<svg class="w-6 h-6 text-primary dark:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div class="flex-1">
								<h3 class="font-semibold text-lg mb-1 text-foreground">
									{$t('onboarding.invite.ownYourVoice.title')}
								</h3>
								<p class="text-muted-foreground leading-relaxed">
									{$t('onboarding.invite.ownYourVoice.description')}
								</p>
							</div>
						</div>

						<div class="flex items-start gap-4">
							<div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
								<svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
							</div>
							<div class="flex-1">
								<h3 class="font-semibold text-lg mb-1 text-foreground">
									{$t('onboarding.invite.earnFromStories.title')}
								</h3>
								<p class="text-muted-foreground leading-relaxed">
									{$t('onboarding.invite.earnFromStories.description')}
								</p>
							</div>
						</div>

						<div class="flex items-start gap-4">
							<div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
								<svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
							</div>
							<div class="flex-1">
								<h3 class="font-semibold text-lg mb-1 text-foreground">
									{$t('onboarding.invite.connectCommunity.title')}
								</h3>
								<p class="text-muted-foreground leading-relaxed">
									{$t('onboarding.invite.connectCommunity.description')}
								</p>
							</div>
						</div>
					</div>

					<!-- CTA Buttons -->
					<div class="space-y-4">
						<button
							onclick={handleStartJourney}
							class="w-full py-3 text-lg font-semibold bg-primary hover:from-primary-700 hover:to-primary-800 text-white shadow-lg transition-all duration-200 hover:shadow-xl rounded-xl flex items-center justify-center gap-2"
						>
							{$t('onboarding.invite.startJourney')}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</button>

						<button
							onclick={handleSignIn}
							class="w-full text-center text-muted-foreground hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors py-2"
						>
							{$t('onboarding.invite.alreadyHaveAccount')}{' '}
							<span class="font-semibold underline">{$t('onboarding.invite.signInHere')}</span>
						</button>
					</div>

					<!-- Trust Signals -->
					<div class="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
						<p class="text-xs text-center text-neutral-500">
							{$t('onboarding.invite.trustSignals')}
						</p>
					</div>
				{:else}
					<!-- Login Form -->
					<div class="-mt-8">
						<h2 class="text-2xl font-bold text-foreground mb-2 text-center">Welcome Back</h2>
						<p class="text-muted-foreground mb-8 text-center">Sign in to accept your invite</p>

						<div class="space-y-3">
							{#if loginError}
								<div class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
									{loginError}
								</div>
							{/if}

							{#if !loginMethod}
								<Button
									variant="outline"
									onclick={() => {
										loginMethod = 'nip07';
										loginWithNip07();
									}}
									disabled={isLoggingIn}
									class="w-full p-4 h-auto justify-start"
								>
									<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
									<div class="flex-1 text-left">
										<div class="font-semibold">Browser Extension (NIP-07)</div>
										<div class="text-sm text-muted-foreground">Use Alby, nos2x, or similar</div>
									</div>
									{#if isLoggingIn && loginMethod === 'nip07'}
										<svg class="w-5 h-5 animate-spin ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
										</svg>
									{/if}
								</Button>

								<Button
									variant="outline"
									onclick={() => loginMethod = 'nsec'}
									disabled={isLoggingIn}
									class="w-full p-4 h-auto justify-start"
								>
									<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
									</svg>
									<div class="flex-1 text-left">
										<div class="font-semibold">Private Key</div>
										<div class="text-sm text-muted-foreground">Login with your nsec or hex key</div>
									</div>
								</Button>

								<div class="relative my-6">
									<div class="absolute inset-0 flex items-center">
										<span class="w-full border-t border-border"></span>
									</div>
									<div class="relative flex justify-center text-xs uppercase">
										<span class="bg-card px-2 text-muted-foreground">
											Don't have an account?
										</span>
									</div>
								</div>

								<Button
									variant="ghost"
									onclick={() => showLoginForm = false}
									class="w-full"
								>
									<span class="font-semibold underline">Create a new account</span>
								</Button>
							{:else if loginMethod === 'nsec'}
								<div class="space-y-4">
									<div class="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm flex gap-2">
										<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<div>
											Enter your private key (nsec or hex format). This will be stored locally in your browser.
										</div>
									</div>

									<Input
										type="password"
										bind:value={nsecInput}
										placeholder="nsec1... or hex key"
										disabled={isLoggingIn}
										onkeydown={(e) => {
											if (e.key === 'Enter' && nsecInput) {
												loginWithNsec();
											}
										}}
									/>

									<div class="flex gap-2">
										<Button
											variant="outline"
											onclick={() => loginMethod = null}
											disabled={isLoggingIn}
											class="flex-1"
										>
											Back
										</Button>
										<Button
											onclick={loginWithNsec}
											disabled={isLoggingIn || !nsecInput.trim()}
											class="flex-1"
										>
											{#if isLoggingIn}
												<svg class="w-4 h-4 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
												</svg>
												Logging in...
											{:else}
												<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
												</svg>
												Login
											{/if}
										</Button>
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
		{/if}
	</div>
</div>
