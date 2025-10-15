import type { NDKUser } from '@nostr-dev-kit/ndk';

interface EncodableContent {
  encode: () => string;
  pubkey: string;
  tagValue: (tag: string) => string | undefined;
}

/**
 * Generate a URL for content (article, pack, etc.) using naddr encoding
 */
export function getContentUrl(content: EncodableContent, author?: NDKUser, fallbackPrefix = 'item'): string {
  // Use the encoded format (naddr for addressable events, nevent for regular events)
  return `/${fallbackPrefix}/${content.encode()}`;
}
