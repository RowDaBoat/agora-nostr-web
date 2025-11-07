import { NDKKind } from '@nostr-dev-kit/ndk';
import { AGORA_RELAYS } from '$lib/utils/relayUtils';

// Community to relay mapping
// Maps community IDs to their dedicated relay URLs for fetching follow packs
export const COMMUNITY_RELAYS: Record<string, string[]> = {
  venezuela: [AGORA_RELAYS[1]], // ve.agorawlc.com
  nicaragua: [AGORA_RELAYS[2]], // ni.agorawlc.com
  // Other communities can be added here as they get their own relays
};

// Hardcoded follow pack naddr lists per community
// Communities with hardcoded packs will use these instead of fetching from relays
// Communities not listed here will fetch from their configured relay
export const HARDCODED_COMMUNITY_PACKS: Record<string, string[]> = {
	venezuela: [
		"naddr1qvzqqqyckypzp75v7yjjc7h7lzaf3gfvpck39mvcjmylz7aleup9mtutd5yrlxv7qythwumn8ghj7un9d3shjtnswf5k6ctv9ehx2ap0qythwumn8ghj7un9d3shjtnwdaehgu3wvfskuep0qqv4qmmv946xjcmp94tx2mn90f6k2mrp945kwart09hsc909n2",
	],
	// Other communities can be added here as needed
};

// Follow pack kind for subscription filters
export const FOLLOW_PACK_KIND = NDKKind.FollowPack; // 39089

// Community metadata - this will be shown while loading actual data
export const COMMUNITY_METADATA: Record<string, { name: string; description: string }> = {
  venezuela: {
    name: 'Venezuela',
    description: 'Connect with the Venezuelan community'
  },
  cambodia: {
    name: 'Cambodia',
    description: 'Join voices from the Kingdom of Wonder'
  },
  nicaragua: {
    name: 'Nicaragua',
    description: 'Unite with Nicaraguan changemakers'
  },
  zimbabwe: {
    name: 'Zimbabwe',
    description: 'Connect with Zimbabwe\'s innovators'
  },
  afghanistan: {
    name: 'Afghanistan',
    description: 'Support Afghan voices of hope'
  },
  iran: {
    name: 'Iran',
    description: 'Join the Persian community'
  }
};