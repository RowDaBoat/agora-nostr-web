<script lang="ts">
  import { t } from 'svelte-i18n';

  interface Props {
    selectedPacks: string[];
    profileData: {
      name: string;
    };
    onComplete: () => void;
  }

  let { selectedPacks, profileData, onComplete }: Props = $props();

  const followCount = $derived(selectedPacks.length * 25);
</script>

<div class="min-h-screen flex items-center justify-center p-8">
  <div class="max-w-2xl w-full text-center">
    <div class="text-7xl mb-6">🎉</div>
    <h1 class="text-4xl font-bold mb-4">{$t('onboarding.step8Welcome.title', { values: { name: profileData.name || $t('onboarding.step8Welcome.friend') } })}</h1>
    <p class="text-xl text-muted-foreground mb-12">
      {$t('onboarding.step8Welcome.subtitle')}
    </p>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
      <div class="bg-neutral-50 dark:bg-card rounded-xl p-6">
        <div class="text-3xl font-bold mb-1">{followCount}</div>
        <div class="text-sm text-muted-foreground">{$t('onboarding.step8Welcome.stats.peopleFollowing')}</div>
      </div>
      <div class="bg-neutral-50 dark:bg-card rounded-xl p-6">
        <div class="text-3xl font-bold mb-1">{selectedPacks.length}</div>
        <div class="text-sm text-muted-foreground">{$t('onboarding.step8Welcome.stats.followPacks')}</div>
      </div>
      <div class="bg-neutral-50 dark:bg-card rounded-xl p-6">
        <div class="text-3xl font-bold mb-1">1</div>
        <div class="text-sm text-muted-foreground">{$t('onboarding.step8Welcome.stats.postPublished')}</div>
      </div>
    </div>

    <!-- What's next -->
    <div class="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-xl p-8 mb-8 text-left max-w-lg mx-auto">
      <h3 class="font-semibold mb-4">{$t('onboarding.step8Welcome.whatsNext.title')}</h3>
      <ul class="space-y-3 text-sm">
        <li class="flex items-start gap-3">
          <span class="text-green-500 mt-0.5">✓</span>
          <span>{$t('onboarding.step8Welcome.whatsNext.feedReady', { values: { count: followCount } })}</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-green-500 mt-0.5">✓</span>
          <span>{$t('onboarding.step8Welcome.whatsNext.marketplace')}</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-green-500 mt-0.5">✓</span>
          <span>{$t('onboarding.step8Welcome.whatsNext.p2pTrades')}</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-green-500 mt-0.5">✓</span>
          <span>{$t('onboarding.step8Welcome.whatsNext.earnSats')}</span>
        </li>
      </ul>
    </div>

    <button
      onclick={onComplete}
      class="bg-background dark:bg-white text-foreground dark:text-black px-12 py-4 rounded-lg font-medium text-lg hover:bg-muted dark:hover:bg-neutral-200 transition-colors"
    >
      {$t('onboarding.step8Welcome.enterAgora')} →
    </button>
  </div>
</div>
