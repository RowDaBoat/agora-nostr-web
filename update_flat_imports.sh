#!/bin/bash

echo "Updating imports to flat structure..."

# Find all files with NDK imports
find src -type f \( -name "*.svelte" -o -name "*.ts" -o -name "*.js" \) -exec grep -l "from '\$lib/ndk" {} \; | while read file; do
  echo "Processing: $file"

  # Update nested paths to flat structure
  sed -i.bak \
    -e "s|from '\$lib/ndk/components/user/inputs/search'|from '\$lib/ndk/components/user-search'|g" \
    -e "s|from '\$lib/ndk/components/follow/buttons/basic/follow-button.svelte'|from '\$lib/ndk/components/follow-button/follow-button.svelte'|g" \
    -e "s|from '\$lib/ndk/components/reaction/buttons/basic/reaction-button.svelte'|from '\$lib/ndk/components/reaction-button/reaction-button.svelte'|g" \
    -e "s|from '\$lib/ndk/components/article/cards/basic/article-card-medium.svelte'|from '\$lib/ndk/components/article-card/article-card-medium.svelte'|g" \
    -e "s|from '\$lib/ndk/components/article/cards/hero/article-card-hero.svelte'|from '\$lib/ndk/components/article-card-hero/article-card-hero.svelte'|g" \
    -e "s|from '\$lib/ndk/components/article/cards/portrait/article-card-portrait.svelte'|from '\$lib/ndk/components/article-card-portrait/article-card-portrait.svelte'|g" \
    -e "s|from '\$lib/ndk/components/event/cards/compound'|from '\$lib/ndk/components/event-card'|g" \
    -e "s|from '\$lib/ndk/components/event/cards/classic/event-card-classic.svelte'|from '\$lib/ndk/components/event-card-classic/event-card-classic.svelte'|g" \
    -e "s|from '\$lib/ndk/components/follow/packs/compact'|from '\$lib/ndk/components/follow-pack-compact'|g" \
    -e "s|from '\$lib/ndk/builders/notification/index.svelte'|from '\$lib/ndk/builders/notification/index.svelte'|g" \
    -e "s|from '\$lib/ndk/builders/reaction-action.svelte'|from '\$lib/ndk/builders/reaction-action/index.svelte'|g" \
    -e "s|from '\$lib/ndk/builders/follow-action.svelte'|from '\$lib/ndk/builders/follow-action/index.svelte'|g" \
    -e "s|from '\$lib/ndk/builders/zap-action/zap-action.svelte'|from '\$lib/ndk/builders/zap-action/zap-action.svelte'|g" \
    "$file"

  # Remove backup file
  rm "${file}.bak"
done

echo "Import updates complete!"