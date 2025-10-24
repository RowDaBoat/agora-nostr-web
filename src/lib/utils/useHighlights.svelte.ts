import type { NDKArticle } from '@nostr-dev-kit/ndk';
import type { NDKSvelte } from '@nostr-dev-kit/svelte';

/**
 * Composable for managing article highlights
 */
export function createHighlightsManager(ndk: NDKSvelte, article: NDKArticle | null) {
  let showHighlightToolbar = $state(false);
  let selectedText = $state('');
  let selectedRange = $state<Range | null>(null);
  let toolbarPosition = $state({ x: 0, y: 0 });

  const highlights = ndk.$fetchEvents(() => {
    if (!article) return undefined;
    const articleTag = article.tagId();
    return {
      filters: {
        kinds: [9802], // NIP-84 Highlight kind
        '#a': [articleTag],
      }
    };
  });

  function handleTextSelected(text: string, range: Range) {
    selectedText = text;
    selectedRange = range;

    const rect = range.getBoundingClientRect();
    toolbarPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + window.scrollY,
    };

    showHighlightToolbar = true;
  }

  function handleHighlightCreated() {
    showHighlightToolbar = false;
    selectedText = '';
    selectedRange = null;

    // Clear the text selection
    window.getSelection()?.removeAllRanges();
  }

  function handleCancelHighlight() {
    showHighlightToolbar = false;
    selectedText = '';
    selectedRange = null;

    // Clear the text selection
    window.getSelection()?.removeAllRanges();
  }

  return {
    highlights,
    get showHighlightToolbar() {
      return showHighlightToolbar;
    },
    get selectedText() {
      return selectedText;
    },
    get toolbarPosition() {
      return toolbarPosition;
    },
    handleTextSelected,
    handleHighlightCreated,
    handleCancelHighlight
  };
}
