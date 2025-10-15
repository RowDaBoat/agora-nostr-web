<script lang="ts">
  import { NDKBlossom } from '@nostr-dev-kit/blossom';
  import { useBlossomUpload } from '@nostr-dev-kit/svelte';
  import { ndk } from '$lib/ndk.svelte';
  import { Button } from '$lib/components/ui/button';
  import { toast } from '$lib/stores/toast.svelte';
  import UserSelector from '$lib/components/UserSelector.svelte';
  import MentionPicker from '$lib/components/MentionPicker.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    value?: string;
    placeholder?: string;
    autofocus?: boolean;
    disabled?: boolean;
    class?: string;
    relayButton?: Snippet;
    selectedMentions?: string[];
    onMentionsChange?: (mentions: string[]) => void;
  }

  let {
    value = $bindable(''),
    placeholder = "What's on your mind?",
    autofocus = false,
    disabled = false,
    class: className = '',
    relayButton,
    selectedMentions = $bindable([]),
    onMentionsChange
  }: Props = $props();

  const blossom = new NDKBlossom(ndk);
  const upload = useBlossomUpload(blossom);

  let textareaElement: HTMLTextAreaElement;
  let fileInput: HTMLInputElement;
  let isDragging = $state(false);
  let uploadedImages = $state<Array<{ url: string; preview: string }>>([]);
  let isUploading = $state(false);

  // Mention picker state
  let showMentionPicker = $state(false);
  let mentionSearchQuery = $state('');
  let mentionStartIndex = $state(0);
  let mentionPickerPosition = $state({ top: 0, left: 0 });

  async function handleFileSelect(file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    // Add to images array with preview
    const imageIndex = uploadedImages.length;
    uploadedImages = [...uploadedImages, { url: '', preview: previewUrl }];

    isUploading = true;
    try {
      await upload.upload(file, {
        fallbackServer: 'https://blossom.primal.net'
      });

      if (upload.result?.url) {
        // Update the image with the actual URL
        uploadedImages[imageIndex] = {
          url: upload.result.url,
          preview: previewUrl
        };

        // Add image URL to content at cursor position
        insertImageUrl(upload.result.url);
        toast.success('Image uploaded');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload image');
      // Remove the failed upload
      uploadedImages = uploadedImages.filter((_, i) => i !== imageIndex);
    } finally {
      isUploading = false;
    }
  }

  function insertImageUrl(url: string) {
    const textarea = textareaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const imageMarkdown = `\n${url}\n`;

    value = value.slice(0, start) + imageMarkdown + value.slice(end);

    // Set cursor position after the inserted URL
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + imageMarkdown.length;
      textarea.focus();
    }, 0);
  }

  function removeImage(index: number) {
    const image = uploadedImages[index];

    // Remove the URL from the content
    if (image.url) {
      value = value.replace(`\n${image.url}\n`, '').replace(image.url, '');
    }

    // Revoke the preview URL to free memory
    URL.revokeObjectURL(image.preview);

    // Remove from array
    uploadedImages = uploadedImages.filter((_, i) => i !== index);
  }

  function handleFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input so the same file can be selected again
    input.value = '';
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    isDragging = true;
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
    isDragging = false;
  }

  async function handleDrop(event: DragEvent) {
    event.preventDefault();
    isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      // Handle multiple files
      for (const file of Array.from(files)) {
        if (file.type.startsWith('image/')) {
          await handleFileSelect(file);
        }
      }
    }
  }

  async function handlePaste(event: ClipboardEvent) {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        event.preventDefault();
        const file = item.getAsFile();
        if (file) {
          await handleFileSelect(file);
        }
      }
    }
  }

  function triggerFileInput() {
    fileInput?.click();
  }

  function getCaretCoordinates() {
    if (!textareaElement) return { top: 0, left: 0 };

    const textarea = textareaElement;
    const cursorPosition = textarea.selectionStart;

    // Create a mirror div to calculate position
    const div = document.createElement('div');
    const styles = window.getComputedStyle(textarea);
    const properties = [
      'boxSizing', 'width', 'height', 'overflowX', 'overflowY',
      'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
      'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
      'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize',
      'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent',
      'textDecoration', 'letterSpacing', 'wordSpacing'
    ];

    properties.forEach(prop => {
      div.style[prop as any] = styles[prop as any];
    });

    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.whiteSpace = 'pre-wrap';
    div.style.wordWrap = 'break-word';

    document.body.appendChild(div);

    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    div.textContent = textBeforeCursor;

    const span = document.createElement('span');
    span.textContent = textarea.value.substring(cursorPosition) || '.';
    div.appendChild(span);

    const rect = textarea.getBoundingClientRect();
    const coordinates = {
      top: rect.top + span.offsetTop + parseInt(styles.borderTopWidth) - textarea.scrollTop + 20,
      left: rect.left + span.offsetLeft + parseInt(styles.borderLeftWidth)
    };

    document.body.removeChild(div);
    return coordinates;
  }

  function handleInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);

    // Find the last @ before cursor
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      // Check if there's a space between @ and cursor
      const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);

      // Only show picker if:
      // 1. @ is at start or preceded by whitespace/newline
      // 2. No spaces after @ (still typing the mention)
      const charBeforeAt = lastAtIndex > 0 ? textBeforeCursor[lastAtIndex - 1] : ' ';
      const hasSpaceAfterAt = textAfterAt.includes(' ') || textAfterAt.includes('\n');

      if ((charBeforeAt === ' ' || charBeforeAt === '\n' || lastAtIndex === 0) && !hasSpaceAfterAt) {
        mentionStartIndex = lastAtIndex;
        mentionSearchQuery = textAfterAt;
        mentionPickerPosition = getCaretCoordinates();
        showMentionPicker = true;
        return;
      }
    }

    // Close picker if no valid @ found
    showMentionPicker = false;
  }

  function insertMention(nprofile: string) {
    const textarea = textareaElement;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;

    // Replace from @ to cursor with the nprofile
    const beforeMention = value.substring(0, mentionStartIndex);
    const afterMention = value.substring(cursorPosition);

    value = beforeMention + nprofile + ' ' + afterMention;

    // Set cursor position after the mention
    const newCursorPos = mentionStartIndex + nprofile.length + 1;
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = newCursorPos;
      textarea.focus();
    }, 0);

    showMentionPicker = false;
    mentionSearchQuery = '';
  }

  function closeMentionPicker() {
    showMentionPicker = false;
    mentionSearchQuery = '';
  }
</script>

<div class="relative flex-1 flex flex-col {className}">
  <input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    multiple
    onchange={handleFileInputChange}
    class="hidden"
  />

  <div
    class="flex-1 flex flex-col {isDragging ? 'ring-2 ring-primary ring-offset-2 rounded-lg' : ''}"
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
  >
    <textarea
      bind:this={textareaElement}
      bind:value={value}
      {placeholder}
      {autofocus}
      {disabled}
      oninput={handleInput}
      onpaste={handlePaste}
      class="w-full min-h-[120px] max-md:flex-1 max-md:min-h-0 bg-transparent text-foreground placeholder-neutral-500 resize-none focus:outline-none focus:ring-0 text-lg"
    ></textarea>

    <!-- Image previews -->
    {#if uploadedImages.length > 0}
      <div class="flex flex-wrap gap-2 mt-2">
        {#each uploadedImages as image, index (image.preview)}
          <div class="relative group">
            <img
              src={image.preview}
              alt="Upload preview"
              class="w-20 h-20 object-cover rounded-lg border border {image.url ? '' : 'opacity-50 animate-pulse'}"
            />
            {#if !image.url}
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            {:else}
              <button
                type="button"
                onclick={() => removeImage(index)}
                class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                aria-label="Remove image"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Toolbar -->
  <div class="flex items-center gap-2 mt-2 pt-2 border-t border-border">
    {#if relayButton}
      {@render relayButton()}
    {/if}
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onclick={triggerFileInput}
      disabled={disabled || isUploading}
      class="h-8 w-8"
      title="Add image"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </Button>
    <UserSelector
      bind:selectedPubkeys={selectedMentions}
      onSelect={onMentionsChange}
      {disabled}
    />
  </div>
</div>

{#if showMentionPicker}
  <MentionPicker
    position={mentionPickerPosition}
    searchQuery={mentionSearchQuery}
    onSelect={insertMention}
    onClose={closeMentionPicker}
  />
{/if}
