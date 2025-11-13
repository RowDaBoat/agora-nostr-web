import { a as attr_class, s as stringify, e as ensure_array_like, b as attr } from './index2-DpBdzO5t.js';
import { W as getContext, n as setContext } from './context-D7LG2f18.js';
import 'clsx';
import { nip19 } from '@nostr-dev-kit/ndk';
import { e as escape_html } from './escaping-CqgfEcN3.js';

class ContentRenderer {
  /**
   * Global configuration for NSFW content blocking
   * When true, content with content-warning tags will be blurred by default
   */
  blockNsfw = true;
  /**
   * Component for rendering npub/nprofile mentions
   * If null, renders raw bech32 string
   */
  mentionComponent = null;
  /**
   * Component for rendering hashtags
   * If null, renders raw #tag
   */
  hashtagComponent = null;
  /**
   * Component for rendering links
   * If null, renders raw URL
   */
  linkComponent = null;
  /**
   * Component for rendering media (images, videos)
   * If null, renders raw URL
   */
  mediaComponent = null;
  /**
   * Fallback component for rendering embedded events with no registered kind handler
   * If null, renders raw bech32 string
   * Users can register generic-embedded or any other component as the fallback
   */
  fallbackComponent = null;
  /**
   * Registry of embedded event kind handlers
   * Maps event kind → { component, wrapper, priority }
   */
  handlers = /* @__PURE__ */ new Map();
  /**
   * Priority tracking for inline components
   */
  mentionPriority = 0;
  hashtagPriority = 0;
  linkPriority = 0;
  mediaPriority = 0;
  fallbackPriority = 0;
  /**
   * Register a handler for one or more event kinds
   *
   * Supports two patterns:
   * 1. NDK wrapper classes (automatic kind extraction + wrapping)
   * 2. Manual kind arrays (for kinds without wrapper classes)
   *
   * @param target - NDK wrapper class (with .kinds and .from()) or array of kind numbers
   * @param component - Svelte component to render this kind
   * @param priority - Priority for this handler (default: 1). Higher priority handlers replace lower ones.
   *
   * @example With NDK wrapper class:
   * ```ts
   * import { NDKArticle } from '@nostr-dev-kit/ndk';
   * import ArticleEmbedded from './article-embedded.svelte';
   *
   * defaultContentRenderer.addKind(NDKArticle, ArticleEmbedded, 10);
   * // Auto-registers kind 30023, wraps with NDKArticle.from()
   * ```
   *
   * @example With manual kinds:
   * ```ts
   * import NoteEmbedded from './note-embedded.svelte';
   *
   * defaultContentRenderer.addKind([1, 1111], NoteEmbedded, 5);
   * // Registers kinds 1 and 1111 without wrapping
   * ```
   */
  addKind(target, component, priority = 1) {
    if (Array.isArray(target)) {
      for (const kind of target) {
        const existing = this.handlers.get(kind);
        if (!existing || priority >= existing.priority) {
          this.handlers.set(kind, { component, wrapper: null, priority });
        }
      }
    } else {
      const kinds = target.kinds || [];
      const wrapper = target.from ? target : null;
      for (const kind of kinds) {
        const existing = this.handlers.get(kind);
        if (!existing || priority >= existing.priority) {
          this.handlers.set(kind, { component, wrapper, priority });
        }
      }
    }
  }
  /**
   * Set the mention component with priority
   * @param component - Component to render mentions
   * @param priority - Priority for this component (default: 1)
   */
  setMentionComponent(component, priority = 1) {
    if (priority >= this.mentionPriority) {
      this.mentionComponent = component;
      this.mentionPriority = priority;
    }
  }
  /**
   * Set the hashtag component with priority
   * @param component - Component to render hashtags
   * @param priority - Priority for this component (default: 1)
   */
  setHashtagComponent(component, priority = 1) {
    if (priority >= this.hashtagPriority) {
      this.hashtagComponent = component;
      this.hashtagPriority = priority;
    }
  }
  /**
   * Set the link component with priority
   * @param component - Component to render links
   * @param priority - Priority for this component (default: 1)
   */
  setLinkComponent(component, priority = 1) {
    if (priority >= this.linkPriority) {
      this.linkComponent = component;
      this.linkPriority = priority;
    }
  }
  /**
   * Set the media component with priority
   * @param component - Component to render media
   * @param priority - Priority for this component (default: 1)
   */
  setMediaComponent(component, priority = 1) {
    if (priority >= this.mediaPriority) {
      this.mediaComponent = component;
      this.mediaPriority = priority;
    }
  }
  /**
   * Set the fallback component with priority
   * @param component - Component to render unhandled events
   * @param priority - Priority for this component (default: 1)
   */
  setFallbackComponent(component, priority = 1) {
    if (priority >= this.fallbackPriority) {
      this.fallbackComponent = component;
      this.fallbackPriority = priority;
    }
  }
  /**
   * Get handler information for a specific event kind
   *
   * @returns Handler info with component and optional wrapper, or undefined if not registered
   */
  getKindHandler(kind) {
    if (kind === void 0) return void 0;
    return this.handlers.get(kind);
  }
  /**
   * Check if a kind has a registered handler
   *
   * @param kind - Event kind number
   * @returns true if handler exists, false otherwise
   */
  hasKindHandler(kind) {
    if (kind === void 0) return false;
    return this.handlers.has(kind);
  }
  /**
   * Get all registered kinds (for debugging)
   *
   * @returns Sorted array of registered kind numbers
   */
  getRegisteredKinds() {
    return Array.from(this.handlers.keys()).sort((a, b) => a - b);
  }
  /**
   * Get current priorities for inline components (for debugging)
   *
   * @returns Object with component names and their priorities
   */
  getInlinePriorities() {
    return {
      mention: this.mentionPriority,
      hashtag: this.hashtagPriority,
      link: this.linkPriority,
      media: this.mediaPriority,
      fallback: this.fallbackPriority
    };
  }
  /**
   * Get current priorities for event kind handlers (for debugging)
   *
   * @returns Map of kind numbers to their priorities
   */
  getKindPriorities() {
    const priorities = /* @__PURE__ */ new Map();
    for (const [kind, info] of this.handlers) {
      priorities.set(kind, info.priority);
    }
    return priorities;
  }
  /**
   * Clear all registered handlers (useful for testing)
   */
  clear() {
    this.handlers.clear();
    this.mentionComponent = null;
    this.hashtagComponent = null;
    this.linkComponent = null;
    this.mediaComponent = null;
    this.fallbackComponent = null;
    this.mentionPriority = 0;
    this.hashtagPriority = 0;
    this.linkPriority = 0;
    this.mediaPriority = 0;
    this.fallbackPriority = 0;
  }
}
const defaultContentRenderer = new ContentRenderer();
const CONTENT_RENDERER_CONTEXT_KEY = Symbol("content-renderer");
const ENTITY_CLICK_CONTEXT_KEY = Symbol.for("entity-click");
const PATTERNS = {
  EMOJI_SHORTCODE: /:([a-zA-Z0-9_]+):/g,
  NOSTR_URI: /nostr:(npub1[a-z0-9]{58}|nprofile1[a-z0-9]+|note1[a-z0-9]{58}|nevent1[a-z0-9]+|naddr1[a-z0-9]+)/gi,
  HASHTAG: /(^|\s)#([a-zA-Z0-9_\u0080-\uFFFF]+)(?=\s|$|[^\w])/g,
  MEDIA_FILE: /https?:\/\/[^\s<>"]+\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov)(\?[^\s<>"]*)?/gi,
  YOUTUBE: /https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})[^\s<>"]*/gi,
  URL: /https?:\/\/[^\s<>"]+/gi
};
function buildEmojiMap(tags) {
  const emojiMap = /* @__PURE__ */ new Map();
  if (!Array.isArray(tags)) {
    console.warn(
      "[buildEmojiMap] Expected tags to be an array, got:",
      typeof tags
    );
    return emojiMap;
  }
  for (const [type, shortcode, url] of tags) {
    if (type === "emoji" && shortcode && url) {
      emojiMap.set(shortcode, url);
    }
  }
  return emojiMap;
}
function createEmojiSegment(shortcode, emojiMap) {
  const url = emojiMap.get(shortcode);
  return url ? { type: "emoji", content: shortcode, data: url } : { type: "text", content: `:${shortcode}:` };
}
function decodeNostrUri(uri) {
  try {
    const prefix = uri.substring(0, uri.indexOf("1") + 1);
    nip19.decode(uri);
    if (prefix === "npub1") {
      return { type: "npub", content: uri, data: uri };
    }
    if (prefix === "nprofile1") {
      return { type: "nprofile", content: uri, data: uri };
    }
    if (prefix === "note1" || prefix === "nevent1" || prefix === "naddr1") {
      return { type: "event-ref", content: uri, data: uri };
    }
  } catch {
    console.warn("[EventContent] Failed to decode Nostr URI:", uri);
  }
  return { type: "text", content: `nostr:${uri}` };
}
function isImage(url) {
  return /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(url);
}
function isVideo(url) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}
function isYouTube(url) {
  return /youtube\.com|youtu\.be/i.test(url);
}
function classifyMatch(text, emojiMap) {
  const hashtagMatch = text.match(/^(\s)?#([a-zA-Z0-9_\u0080-\uFFFF]+)$/);
  if (hashtagMatch) {
    const [, whitespace, tag] = hashtagMatch;
    if (whitespace) {
      return { type: "hashtag", content: tag, data: tag };
    }
    return { type: "hashtag", content: tag, data: tag };
  }
  if (text.startsWith(":") && text.endsWith(":")) {
    const shortcode = text.slice(1, -1);
    return createEmojiSegment(shortcode, emojiMap);
  }
  if (text.startsWith("nostr:")) {
    return decodeNostrUri(text.slice(6));
  }
  if (isImage(text) || isVideo(text) || isYouTube(text)) {
    return { type: "media", content: text };
  }
  if (text.startsWith("http")) {
    return { type: "link", content: text };
  }
  return { type: "text", content: text };
}
function collectMatches(content) {
  const matches = [];
  for (const pattern of Object.values(PATTERNS)) {
    pattern.lastIndex = 0;
    let match = pattern.exec(content);
    while (match !== null) {
      matches.push({ match, index: match.index });
      match = pattern.exec(content);
    }
  }
  return matches.sort((a, b) => a.index - b.index);
}
function parseContentToSegments(content, emojiMap) {
  const segments = [];
  const matches = collectMatches(content);
  let lastIndex = 0;
  for (const { match, index } of matches) {
    if (index < lastIndex) continue;
    if (index > lastIndex) {
      segments.push({
        type: "text",
        content: content.slice(lastIndex, index)
      });
    }
    if (match[0].match(/^\s?#[a-zA-Z0-9_\u0080-\uFFFF]+$/)) {
      const hashtagMatch = match[0].match(
        /^(\s)?#([a-zA-Z0-9_\u0080-\uFFFF]+)$/
      );
      if (hashtagMatch) {
        const [, whitespace, tag] = hashtagMatch;
        if (whitespace) {
          segments.push({ type: "text", content: whitespace });
        }
        segments.push({ type: "hashtag", content: tag, data: tag });
      }
    } else {
      segments.push(classifyMatch(match[0], emojiMap));
    }
    lastIndex = index + match[0].length;
  }
  if (lastIndex < content.length) {
    segments.push({
      type: "text",
      content: content.slice(lastIndex)
    });
  }
  return segments;
}
function isWhitespaceOnly(text) {
  return /^\s*$/.test(text);
}
function groupConsecutiveImages(segments) {
  const result = [];
  let imageBuffer = [];
  let whitespaceBuffer = [];
  function flushImages() {
    if (imageBuffer.length === 0) return;
    if (imageBuffer.length === 1) {
      result.push({ type: "media", content: imageBuffer[0] });
    } else {
      result.push({
        type: "image-grid",
        content: "",
        data: imageBuffer
      });
    }
    imageBuffer = [];
    whitespaceBuffer = [];
  }
  function flushWhitespace() {
    for (const segment of whitespaceBuffer) {
      result.push(segment);
    }
    whitespaceBuffer = [];
  }
  for (const segment of segments) {
    if (segment.type === "media" && isImage(segment.content)) {
      imageBuffer.push(segment.content);
    } else if (segment.type === "text" && isWhitespaceOnly(segment.content) && imageBuffer.length > 0) {
      whitespaceBuffer.push(segment);
    } else {
      flushImages();
      flushWhitespace();
      result.push(segment);
    }
  }
  flushImages();
  return result;
}
function groupConsecutiveLinks(segments) {
  const result = [];
  let linkBuffer = [];
  let whitespaceBuffer = [];
  function flushLinks() {
    if (linkBuffer.length === 0) return;
    if (linkBuffer.length === 1) {
      result.push({ type: "link", content: linkBuffer[0] });
    } else {
      result.push({
        type: "link-group",
        content: "",
        data: linkBuffer
      });
    }
    linkBuffer = [];
    whitespaceBuffer = [];
  }
  function flushWhitespace() {
    for (const segment of whitespaceBuffer) {
      result.push(segment);
    }
    whitespaceBuffer = [];
  }
  for (const segment of segments) {
    if (segment.type === "link") {
      linkBuffer.push(segment.content);
    } else if (segment.type === "text" && isWhitespaceOnly(segment.content) && linkBuffer.length > 0) {
      whitespaceBuffer.push(segment);
    } else {
      flushLinks();
      flushWhitespace();
      result.push(segment);
    }
  }
  flushLinks();
  return result;
}
function createEventContent(config) {
  return {
    get segments() {
      const actualContent = String(config().event?.content ?? config().content ?? "");
      const event = config().event;
      const actualEmojiTags = event?.tags && Array.isArray(event.tags) ? event.tags.filter((t) => t[0] === "emoji") : config().emojiTags ?? [];
      const emojiMap = buildEmojiMap(actualEmojiTags);
      const parsedSegments = parseContentToSegments(actualContent, emojiMap);
      const groupedImages = groupConsecutiveImages(parsedSegments);
      return groupConsecutiveLinks(groupedImages);
    },
    get content() {
      const actualContent = String(config().event?.content ?? config().content ?? "");
      return actualContent.trim();
    },
    get emojiMap() {
      const event = config().event;
      const actualEmojiTags = event?.tags && Array.isArray(event.tags) ? event.tags.filter((t) => t[0] === "emoji") : config().emojiTags ?? [];
      return buildEmojiMap(actualEmojiTags);
    }
  };
}
function Embedded_event($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { renderer: rendererProp, class: className = "" } = $$props;
    const rendererContext = getContext(CONTENT_RENDERER_CONTEXT_KEY);
    const renderer = rendererProp ?? rendererContext?.renderer ?? defaultContentRenderer;
    getContext(ENTITY_CLICK_CONTEXT_KEY);
    setContext(CONTENT_RENDERER_CONTEXT_KEY, {
      get renderer() {
        return renderer;
      }
    });
    let event = void 0;
    const embedded = { event };
    let handlerInfo = renderer.getKindHandler(embedded.event?.kind);
    handlerInfo?.component;
    renderer.fallbackComponent;
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`flex items-center gap-2 p-3 rounded-lg border border-border bg-muted text-sm ${stringify(className)}`)}><div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div> <span>Loading event...</span></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Event_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk,
      event,
      content: contentProp,
      emojiTags,
      renderer: rendererProp,
      class: className = ""
    } = $$props;
    const rendererContext = getContext(CONTENT_RENDERER_CONTEXT_KEY);
    const renderer = rendererProp ?? rendererContext?.renderer ?? defaultContentRenderer;
    setContext(CONTENT_RENDERER_CONTEXT_KEY, {
      get renderer() {
        return renderer;
      }
    });
    const parsed = createEventContent(() => ({ event, content: contentProp, emojiTags }));
    $$renderer2.push(`<div${attr_class(`whitespace-pre-wrap wrap-break-words leading-relaxed ${stringify(className)}`)}><!--[-->`);
    const each_array = ensure_array_like(parsed.segments);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let segment = each_array[i];
      if (segment.type === "text") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`${escape_html(segment.content)}`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (segment.type === "npub" || segment.type === "nprofile") {
          $$renderer2.push("<!--[-->");
          if (segment.data && typeof segment.data === "string") {
            $$renderer2.push("<!--[-->");
            if (renderer.mentionComponent) {
              $$renderer2.push("<!--[-->");
              const Component = renderer.mentionComponent;
              $$renderer2.push(`<!---->`);
              Component($$renderer2, { ndk, bech32: segment.data });
              $$renderer2.push(`<!---->`);
            } else {
              $$renderer2.push("<!--[!-->");
              $$renderer2.push(`${escape_html(segment.content)}`);
            }
            $$renderer2.push(`<!--]-->`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (segment.type === "event-ref") {
            $$renderer2.push("<!--[-->");
            if (segment.data && typeof segment.data === "string") {
              $$renderer2.push("<!--[-->");
              Embedded_event($$renderer2, { bech32: segment.data });
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]-->`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (segment.type === "hashtag") {
              $$renderer2.push("<!--[-->");
              if (segment.data && typeof segment.data === "string") {
                $$renderer2.push("<!--[-->");
                if (renderer.hashtagComponent) {
                  $$renderer2.push("<!--[-->");
                  const Component = renderer.hashtagComponent;
                  $$renderer2.push(`<!---->`);
                  Component($$renderer2, { ndk, tag: segment.data });
                  $$renderer2.push(`<!---->`);
                } else {
                  $$renderer2.push("<!--[!-->");
                  $$renderer2.push(`#${escape_html(segment.data)}`);
                }
                $$renderer2.push(`<!--]-->`);
              } else {
                $$renderer2.push("<!--[!-->");
              }
              $$renderer2.push(`<!--]-->`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (segment.type === "link") {
                $$renderer2.push("<!--[-->");
                if (renderer.linkComponent) {
                  $$renderer2.push("<!--[-->");
                  const Component = renderer.linkComponent;
                  $$renderer2.push(`<!---->`);
                  Component($$renderer2, { url: segment.content });
                  $$renderer2.push(`<!---->`);
                } else {
                  $$renderer2.push("<!--[!-->");
                  $$renderer2.push(`${escape_html(segment.content)}`);
                }
                $$renderer2.push(`<!--]-->`);
              } else {
                $$renderer2.push("<!--[!-->");
                if (segment.type === "media") {
                  $$renderer2.push("<!--[-->");
                  if (renderer.mediaComponent) {
                    $$renderer2.push("<!--[-->");
                    const Component = renderer.mediaComponent;
                    $$renderer2.push(`<!---->`);
                    Component($$renderer2, { url: segment.content });
                    $$renderer2.push(`<!---->`);
                  } else {
                    $$renderer2.push("<!--[!-->");
                    $$renderer2.push(`${escape_html(segment.content)}`);
                  }
                  $$renderer2.push(`<!--]-->`);
                } else {
                  $$renderer2.push("<!--[!-->");
                  if (segment.type === "emoji") {
                    $$renderer2.push("<!--[-->");
                    if (typeof segment.data === "string") {
                      $$renderer2.push("<!--[-->");
                      $$renderer2.push(`<img${attr("src", segment.data)}${attr("alt", `:${stringify(segment.content)}:`)} class="inline-block w-[1.25em] h-[1.25em] align-middle mx-[0.1em]"/>`);
                    } else {
                      $$renderer2.push("<!--[!-->");
                    }
                    $$renderer2.push(`<!--]-->`);
                  } else {
                    $$renderer2.push("<!--[!-->");
                    if (segment.type === "image-grid") {
                      $$renderer2.push("<!--[-->");
                      if (segment.data && Array.isArray(segment.data)) {
                        $$renderer2.push("<!--[-->");
                        if (renderer.mediaComponent) {
                          $$renderer2.push("<!--[-->");
                          const Component = renderer.mediaComponent;
                          $$renderer2.push(`<!---->`);
                          Component($$renderer2, { url: segment.data });
                          $$renderer2.push(`<!---->`);
                        } else {
                          $$renderer2.push("<!--[!-->");
                          $$renderer2.push(`<!--[-->`);
                          const each_array_1 = ensure_array_like(segment.data);
                          for (let j = 0, $$length2 = each_array_1.length; j < $$length2; j++) {
                            let url = each_array_1[j];
                            $$renderer2.push(`<img${attr("src", url)} alt="" class="w-full h-auto object-cover rounded-lg aspect-square"/>`);
                          }
                          $$renderer2.push(`<!--]-->`);
                        }
                        $$renderer2.push(`<!--]-->`);
                      } else {
                        $$renderer2.push("<!--[!-->");
                      }
                      $$renderer2.push(`<!--]-->`);
                    } else {
                      $$renderer2.push("<!--[!-->");
                      if (segment.type === "link-group") {
                        $$renderer2.push("<!--[-->");
                        if (segment.data && Array.isArray(segment.data)) {
                          $$renderer2.push("<!--[-->");
                          if (renderer.linkComponent) {
                            $$renderer2.push("<!--[-->");
                            const Component = renderer.linkComponent;
                            $$renderer2.push(`<!---->`);
                            Component($$renderer2, { url: segment.data });
                            $$renderer2.push(`<!---->`);
                          } else {
                            $$renderer2.push("<!--[!-->");
                            $$renderer2.push(`<!--[-->`);
                            const each_array_2 = ensure_array_like(segment.data);
                            for (let j = 0, $$length2 = each_array_2.length; j < $$length2; j++) {
                              let url = each_array_2[j];
                              $$renderer2.push(`<!---->${escape_html(url)}`);
                            }
                            $$renderer2.push(`<!--]-->`);
                          }
                          $$renderer2.push(`<!--]-->`);
                        } else {
                          $$renderer2.push("<!--[!-->");
                        }
                        $$renderer2.push(`<!--]-->`);
                      } else {
                        $$renderer2.push("<!--[!-->");
                      }
                      $$renderer2.push(`<!--]-->`);
                    }
                    $$renderer2.push(`<!--]-->`);
                  }
                  $$renderer2.push(`<!--]-->`);
                }
                $$renderer2.push(`<!--]-->`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}

export { CONTENT_RENDERER_CONTEXT_KEY as C, ENTITY_CLICK_CONTEXT_KEY as E, Event_content as a, defaultContentRenderer as d };
//# sourceMappingURL=event-content-COF8hoaI.js.map
