<!--
  @component EventContent - Renders Nostr event content with rich parsing and entity detection

  Automatically detects and renders:
  - User mentions (npub, nprofile) with avatars
  - Event references (note, nevent, naddr)
  - Media (images, videos, YouTube embeds)
  - Custom emojis
  - Hashtags
  - Links

  Uses the createEventContent builder for parsing logic.
  Dependencies (mention-preview, hashtag-preview, embedded-event) are automatically
  installed when you add this component via the registry.

  @example
  ```svelte
  <EventContent {ndk} {event} />
  ```
-->
<script lang="ts">
  import type { NDKEvent, NDKSvelte } from '@nostr-dev-kit/ndk';
  import { createEventContent, isImage, isVideo, isYouTube, extractYouTubeId } from '@nostr-dev-kit/svelte';
  import MentionPreview from '$lib/components/ui/mention-preview.svelte';
  import HashtagPreview from '$lib/components/ui/hashtag-preview.svelte';
  import EmbeddedEvent from '$lib/components/ui/embedded-event.svelte';

  interface Props {
    /** NDKSvelte instance for fetching profiles and user data */
    ndk: NDKSvelte;
    /** NDKEvent to render. If provided, content and emojiTags will be extracted from it. */
    event?: NDKEvent;
    /** The content to render (ignored if event is provided) */
    content?: string;
    /** Additional CSS classes to apply to the container */
    class?: string;
    /** Emoji tags from the event (ignored if event is provided) */
    emojiTags?: string[][];
    /** Handler when a user mention (npub/nprofile) is clicked */
    onMentionClick?: (bech32: string) => void;
    /** Handler when an event reference (note1/nevent1/naddr1) is clicked */
    onEventClick?: (bech32: string, event: NDKEvent) => void;
    /** Handler when a hashtag is clicked */
    onHashtagClick?: (tag: string) => void;
    /** Handler when a regular URL link is clicked */
    onLinkClick?: (url: string) => void;
  }

  let {
    ndk,
    event,
    content = '',
    class: className = '',
    emojiTags = [],
    onMentionClick,
    onEventClick,
    onHashtagClick,
    onLinkClick,
  }: Props = $props();

  // Use the builder to get parsed segments
  const contentState = createEventContent({ ndk, event, content, emojiTags });

  function handleLinkClick(e: MouseEvent, url: string) {
    if (onLinkClick) {
      e.preventDefault();
      e.stopPropagation();
      onLinkClick(url);
    }
  }
</script>

<div class="content-renderer {className}">
  {#each contentState.segments as segment, index (index)}
    {#if segment.type === 'text'}
      <span class="whitespace-pre-wrap break-words">{segment.content}</span>
    {:else if segment.type === 'emoji'}
      <img
        src={segment.data as string}
        alt={`:${segment.content}:`}
        title={`:${segment.content}:`}
        class="custom-emoji"
        loading="lazy"
      />
    {:else if segment.type === 'hashtag'}
      <HashtagPreview
        hashtag={segment.content}
        onClick={onHashtagClick}
      />
    {:else if segment.type === 'npub' || segment.type === 'nprofile'}
      {@const bech32 = segment.data as string}
      <MentionPreview
        {ndk}
        {bech32}
        onClick={onMentionClick}
      />
    {:else if segment.type === 'event-ref'}
      {@const bech32 = segment.data as string}
      <EmbeddedEvent
        {ndk}
        {bech32}
        {onEventClick}
      />
    {:else if segment.type === 'link'}
      <a
        href={segment.content}
        target="_blank"
        rel="noopener noreferrer"
        class="link"
        onclick={(e) => handleLinkClick(e, segment.content)}
      >
        {segment.content}
      </a>
    {:else if segment.type === 'image-grid'}
      {@const images = segment.data as string[]}
      <div class="image-grid grid-{Math.min(images.length, 3)}">
        {#each images as imageUrl (imageUrl)}
          <img src={imageUrl} alt="" loading="lazy" class="grid-image" />
        {/each}
      </div>
    {:else if segment.type === 'media'}
      {@const url = segment.content}
      <div class="media-embed">
        {#if isYouTube(url)}
          {@const videoId = extractYouTubeId(url)}
          {#if videoId}
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="youtube-embed"
            ></iframe>
          {/if}
        {:else if isVideo(url)}
          <video src={url} controls class="video-embed">
            <track kind="captions" />
          </video>
        {:else}
          <img src={url} alt="" loading="lazy" class="image-embed" />
        {/if}
      </div>
    {/if}
  {/each}
</div>

<style>
  .content-renderer {
    line-height: 1.6;
  }

  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }

  .break-words {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .link {
    color: var(--link-color, #3b82f6);
    text-decoration: none;
    word-break: break-all;
    transition: opacity 0.2s;
  }

  .link:hover {
    opacity: 0.8;
    text-decoration: underline;
  }

  .media-embed {
    margin: 1rem 0;
    max-width: 100%;
  }

  .image-embed,
  .video-embed {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    display: block;
  }

  .youtube-embed {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 0.5rem;
  }

  .image-grid {
    display: grid;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .grid-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
    aspect-ratio: 1;
  }

  .custom-emoji {
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    vertical-align: middle;
    margin: 0 0.125rem;
  }
</style>
