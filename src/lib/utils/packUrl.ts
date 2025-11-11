import type { NDKFollowPack } from '@nostr-dev-kit/ndk';

/**
 * Generate a URL for a pack
 */
export function getPackUrl(pack: NDKFollowPack): string {
  // Fallback to naddr format if no identifier
  return `/packs/${pack.encode()}`;
}
