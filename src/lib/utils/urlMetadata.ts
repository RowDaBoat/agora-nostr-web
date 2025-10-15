export interface UrlMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

const metadataCache = new Map<string, UrlMetadata | null>();

export async function fetchUrlMetadata(url: string): Promise<UrlMetadata | null> {
  // Check cache first
  if (metadataCache.has(url)) {
    return metadataCache.get(url) ?? null;
  }

  try {
    // Use CORS proxy to fetch the page
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      metadataCache.set(url, null);
      return null;
    }

    const data = await response.json();
    const html = data.contents;
    const metadata = parseMetadata(html);

    metadataCache.set(url, metadata);
    return metadata;
  } catch (error) {
    console.error('Failed to fetch URL metadata:', error);
    metadataCache.set(url, null);
    return null;
  }
}

function parseMetadata(html: string): UrlMetadata {
  const metadata: UrlMetadata = {};

  // Parse Open Graph tags
  const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  const ogDescription = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
  const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  const ogSiteName = html.match(/<meta\s+property=["']og:site_name["']\s+content=["']([^"']+)["']/i);

  // Fallback to regular title tag
  const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i);

  metadata.title = ogTitle?.[1] || titleTag?.[1];
  metadata.description = ogDescription?.[1];
  metadata.image = ogImage?.[1];
  metadata.siteName = ogSiteName?.[1];

  return metadata;
}
