import { NDKKind, wrapEvent, mapImetaTag, NDKEvent } from '@nostr-dev-kit/ndk';
import { d as createDebug } from './ndk.svelte-BfhDBrJw.js';
import 'clsx';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import 'tty';
import 'util';
import 'os';

const ErrorCodes = {
  // Server Errors
  SERVER_UNAVAILABLE: "SERVER_UNAVAILABLE",
  SERVER_ERROR: "SERVER_ERROR",
  SERVER_REJECTED: "SERVER_REJECTED",
  SERVER_TIMEOUT: "SERVER_TIMEOUT",
  SERVER_LIST_EMPTY: "SERVER_LIST_EMPTY",
  SERVER_INVALID_RESPONSE: "SERVER_INVALID_RESPONSE",
  // Auth Errors
  NO_SIGNER: "NO_SIGNER",
  AUTH_REQUIRED: "AUTH_REQUIRED",
  AUTH_INVALID: "AUTH_INVALID",
  AUTH_EXPIRED: "AUTH_EXPIRED",
  AUTH_REJECTED: "AUTH_REJECTED",
  // Upload Errors
  UPLOAD_TOO_LARGE: "UPLOAD_TOO_LARGE",
  UPLOAD_INVALID_TYPE: "UPLOAD_INVALID_TYPE",
  UPLOAD_FAILED: "UPLOAD_FAILED",
  ALL_SERVERS_FAILED: "ALL_SERVERS_FAILED",
  // Not Found Errors
  BLOB_NOT_FOUND: "BLOB_NOT_FOUND",
  USER_SERVER_LIST_NOT_FOUND: "USER_SERVER_LIST_NOT_FOUND",
  // Optimization Errors
  SERVER_UNSUPPORTED: "SERVER_UNSUPPORTED",
  FORMAT_UNSUPPORTED: "FORMAT_UNSUPPORTED",
  // SHA256 Calculator Errors
  NO_SHA256_CALCULATOR: "NO_SHA256_CALCULATOR"
};
const BLOSSOM_AUTH_EVENT_KIND = 24242;
const DEFAULT_RETRY_OPTIONS = {
  maxRetries: 3,
  retryDelay: 1e3,
  backoffFactor: 1.5,
  retryableStatusCodes: [408, 429, 500, 502, 503, 504]
};
const DEFAULT_HEADERS = {
  Accept: "application/json"
};
const DEBUG_NAMESPACE = "ndk:blossom";
const SERVER_ERROR_STATUS_CODES = [500, 501, 502, 503, 504, 505];
class NDKBlossomError extends Error {
  constructor(message, code, serverUrl, cause) {
    super(message);
    this.name = "NDKBlossomError";
    this.code = code;
    this.serverUrl = serverUrl;
    this.cause = cause;
  }
}
class NDKBlossomUploadError extends NDKBlossomError {
  constructor(message, code, serverUrl, cause) {
    super(message, code, serverUrl, cause);
    this.name = "NDKBlossomUploadError";
  }
}
class NDKBlossomServerError extends NDKBlossomError {
  constructor(message, code, serverUrl, status, cause) {
    super(message, code, serverUrl, cause);
    this.name = "NDKBlossomServerError";
    this.status = status;
  }
}
class NDKBlossomAuthError extends NDKBlossomError {
  constructor(message, code, serverUrl, cause) {
    super(message, code, serverUrl, cause);
    this.name = "NDKBlossomAuthError";
  }
}
class NDKBlossomNotFoundError extends NDKBlossomError {
  constructor(message, code, serverUrl, cause) {
    super(message, code, serverUrl, cause);
    this.name = "NDKBlossomNotFoundError";
  }
}
class NDKBlossomOptimizationError extends NDKBlossomError {
  constructor(message, code, serverUrl, cause) {
    super(message, code, serverUrl, cause);
    this.name = "NDKBlossomOptimizationError";
  }
}
class DebugLogger {
  constructor(namespace = DEBUG_NAMESPACE) {
    this.debugger = createDebug(namespace);
  }
  error(message, data) {
    this.log("error", message, data);
  }
  warn(message, data) {
    this.log("warn", message, data);
  }
  info(message, data) {
    this.log("info", message, data);
  }
  debug(message, data) {
    this.log("debug", message, data);
  }
  log(level, message, data) {
    const formattedMessage = `[${level.toUpperCase()}] ${message}`;
    if (data !== void 0) {
      this.debugger(formattedMessage, data);
    } else {
      this.debugger(formattedMessage);
    }
  }
}
class CustomLogger {
  constructor(logFunction) {
    this.logFunction = logFunction;
  }
  error(message, data) {
    this.logFunction("error", message, data);
  }
  warn(message, data) {
    this.logFunction("warn", message, data);
  }
  info(message, data) {
    this.logFunction("info", message, data);
  }
  debug(message, data) {
    this.logFunction("debug", message, data);
  }
}
const logger$2 = new DebugLogger("ndk:blossom:auth");
async function createAuthEvent(ndk, action, options = {}) {
  try {
    const authEvent = new NDKEvent(ndk);
    authEvent.kind = BLOSSOM_AUTH_EVENT_KIND;
    authEvent.created_at = Math.floor(Date.now() / 1e3);
    authEvent.content = options.content || `${action.charAt(0).toUpperCase() + action.slice(1)} blob`;
    const tags = [
      ["t", action]
      // Action tag (required)
    ];
    if (options.sha256) {
      const hashes = Array.isArray(options.sha256) ? options.sha256 : [options.sha256];
      hashes.forEach((hash) => {
        tags.push(["x", hash]);
      });
    }
    const expirationSeconds = options.expirationSeconds || 3600;
    const expiration = Math.floor(Date.now() / 1e3) + expirationSeconds;
    tags.push(["expiration", expiration.toString()]);
    authEvent.tags = tags;
    const signer = options.signer ?? ndk.signer;
    await authEvent.sign(signer);
    logger$2.debug(`Created Blossom auth event for action: ${action}`);
    return authEvent;
  } catch (error) {
    if (error instanceof NDKBlossomAuthError) {
      throw error;
    }
    throw new NDKBlossomAuthError(`Failed to create auth event: ${error.message}`, ErrorCodes.AUTH_REQUIRED, void 0, error);
  }
}
function addAuthHeaders(headers, authEvent) {
  const serializedEvent = JSON.stringify(authEvent.rawEvent());
  const encodedEvent = btoa(serializedEvent);
  return {
    ...headers,
    Authorization: `Nostr ${encodedEvent}`
  };
}
async function createAuthenticatedFetchOptions(ndk, action, options = {}) {
  const authEvent = await createAuthEvent(ndk, action, {
    sha256: options.sha256,
    content: options.content,
    expirationSeconds: options.expirationSeconds,
    signer: options.signer
  });
  const headers = addAuthHeaders(options.fetchOptions?.headers || {}, authEvent);
  return {
    ...options.fetchOptions || {},
    headers
  };
}
const auth = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAuthHeaders,
  createAuthEvent,
  createAuthenticatedFetchOptions
}, Symbol.toStringTag, { value: "Module" }));
const defaultLogger = new DebugLogger();
async function fetchWithRetry(url, options = {}, retryOptions = {}, logger2 = defaultLogger) {
  const retry = {
    ...DEFAULT_RETRY_OPTIONS,
    ...retryOptions
  };
  const headers = {
    ...DEFAULT_HEADERS,
    ...options.headers || {}
  };
  let attempts = 0;
  const getNextDelay = () => retry.retryDelay * retry.backoffFactor ** attempts;
  while (attempts <= retry.maxRetries) {
    try {
      const response = await fetch(url, {
        ...options,
        headers
      });
      if (!response.ok && retry.retryableStatusCodes.includes(response.status) && attempts < retry.maxRetries) {
        attempts++;
        const delay = getNextDelay();
        logger2.warn(`Request failed with status ${response.status}, retrying in ${delay}ms (attempt ${attempts}/${retry.maxRetries})`, { url });
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      return response;
    } catch (error) {
      if (attempts < retry.maxRetries) {
        attempts++;
        const delay = getNextDelay();
        logger2.warn(`Network error, retrying in ${delay}ms (attempt ${attempts}/${retry.maxRetries})`, {
          url,
          error
        });
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new NDKBlossomServerError(`Network request failed after ${retry.maxRetries} retries: ${error.message}`, ErrorCodes.SERVER_UNAVAILABLE, url, void 0, error);
      }
    }
  }
  throw new NDKBlossomServerError(`Request failed after ${retry.maxRetries} retries`, ErrorCodes.SERVER_UNAVAILABLE, url);
}
async function checkResourceExists(url, options = {}, retryOptions = {}) {
  try {
    const response = await fetchWithRetry(url, {
      ...options,
      method: "HEAD"
    }, retryOptions);
    return response.ok;
  } catch (error) {
    return false;
  }
}
async function checkBlobExists(serverUrl, hash, retryOptions = {}) {
  const baseUrl = serverUrl.endsWith("/") ? serverUrl.slice(0, -1) : serverUrl;
  const url = `${baseUrl}/${hash}`;
  return checkResourceExists(url, { method: "HEAD" }, retryOptions);
}
async function extractResponseJson(response, serverUrl) {
  if (!response.ok) {
    if (SERVER_ERROR_STATUS_CODES.includes(response.status)) {
      throw new NDKBlossomServerError(`Server error: ${response.status} ${response.statusText}`, ErrorCodes.SERVER_ERROR, serverUrl, response.status);
    } else {
      throw new NDKBlossomServerError(`Request rejected: ${response.status} ${response.statusText}`, ErrorCodes.SERVER_REJECTED, serverUrl, response.status);
    }
  }
  try {
    return await response.json();
  } catch (error) {
    throw new NDKBlossomServerError(`Invalid JSON response: ${error.message}`, ErrorCodes.SERVER_INVALID_RESPONSE, serverUrl, response.status, error);
  }
}
const logger$1 = new DebugLogger("ndk:blossom:uploader");
async function uploadToServer(ndk, file, serverUrl, options = {}) {
  logger$1.debug(`Uploading file to ${serverUrl}`, { fileName: file.name, fileType: file.type, fileSize: file.size });
  if (!options.sha256Calculator) {
    throw new NDKBlossomUploadError("SHA256Calculator is required for upload. Please provide one in options.", "NO_SHA256_CALCULATOR", serverUrl);
  }
  const sha256Calculator = options.sha256Calculator;
  const hash = await sha256Calculator.calculateSha256(file);
  logger$1.debug(`File hash: ${hash}`);
  try {
    const baseUrl = serverUrl.endsWith("/") ? serverUrl.slice(0, -1) : serverUrl;
    const uploadUrl = `${baseUrl}/upload`;
    const authOptions = await createAuthenticatedFetchOptions(ndk, "upload", {
      sha256: hash,
      content: `Upload ${file.name}`,
      signer: options.signer,
      fetchOptions: {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type || "application/octet-stream",
          ...options.headers
        }
      }
    });
    if (options.onProgress) {
      const originalBody = authOptions.body;
      if (originalBody instanceof File || originalBody instanceof Blob) {
        const xhr = new XMLHttpRequest();
        const uploadPromise = new Promise((resolve, reject) => {
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              options.onProgress?.({
                loaded: event.loaded,
                total: event.total
              });
            }
          });
          xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const parsedResponse = JSON.parse(xhr.responseText);
                resolve(parsedResponse);
              } catch (error) {
                reject(new NDKBlossomServerError(`Invalid response from server: ${error.message}`, ErrorCodes.SERVER_INVALID_RESPONSE, serverUrl, xhr.status, error));
              }
            } else {
              reject(new NDKBlossomServerError(`Upload failed with status ${xhr.status}`, ErrorCodes.SERVER_REJECTED, serverUrl, xhr.status));
            }
          });
          xhr.addEventListener("error", () => {
            reject(new NDKBlossomServerError("Network error during upload", ErrorCodes.SERVER_UNAVAILABLE, serverUrl));
          });
          xhr.addEventListener("abort", () => {
            reject(new NDKBlossomServerError("Upload aborted", ErrorCodes.UPLOAD_FAILED, serverUrl));
          });
          xhr.open("PUT", uploadUrl);
          for (const [key, value] of Object.entries(authOptions.headers || {})) {
            xhr.setRequestHeader(key, value);
          }
          xhr.send(originalBody);
        });
        return await uploadPromise;
      }
    }
    const response = await fetchWithRetry(uploadUrl, authOptions, {
      maxRetries: options.maxRetries,
      retryDelay: options.retryDelay
    });
    await extractResponseJson(response, serverUrl);
    const url = `${baseUrl}/${hash}`;
    return {
      url,
      size: file.size.toString(),
      m: file.type,
      x: hash
    };
  } catch (error) {
    if (error instanceof NDKBlossomServerError || error instanceof NDKBlossomAuthError) {
      throw error;
    }
    throw new NDKBlossomUploadError(`Upload failed: ${error.message}`, ErrorCodes.UPLOAD_FAILED, serverUrl, error);
  }
}
async function uploadFile(ndkBlossom, file, options = {}) {
  logger$1.debug(`Starting file upload`, { fileName: file.name, fileType: file.type, fileSize: file.size });
  logger$1.debug(`Upload options:`, {
    hasServer: !!options.server,
    hasFallbackServer: !!options.fallbackServer,
    fallbackServer: options.fallbackServer,
    allOptions: options
  });
  if (options.server) {
    try {
      const result = await uploadToServer(ndkBlossom.ndk, file, options.server, options);
      logger$1.debug(`Upload successful to specified server ${options.server}`);
      return result;
    } catch (error) {
      logger$1.error(`Upload to specified server ${options.server} failed:`, error);
      throw new NDKBlossomUploadError(`Upload failed on specified server: ${options.server}: ${error.message}`, ErrorCodes.UPLOAD_FAILED);
    }
  }
  const serverList = await ndkBlossom.getServerList();
  let serverUrls = [];
  if (serverList && Array.isArray(serverList.servers)) {
    serverUrls = serverList.servers;
  }
  const errors = [];
  for (const serverUrl of serverUrls) {
    try {
      const result = await uploadToServer(ndkBlossom.ndk, file, serverUrl, options);
      logger$1.debug(`Upload successful to ${serverUrl}`);
      return result;
    } catch (error) {
      logger$1.error(`Upload to ${serverUrl} failed:`, error);
      errors.push({ serverUrl, error });
      if (options.onServerError && error instanceof NDKBlossomServerError) {
        const action = options.onServerError(error, serverUrl);
        if (action === "retry") {
          try {
            const result = await uploadToServer(ndkBlossom.ndk, file, serverUrl, options);
            logger$1.debug(`Retry upload successful to ${serverUrl}`);
            return result;
          } catch (retryError) {
            logger$1.error(`Retry upload to ${serverUrl} failed:`, retryError);
            errors.push({ serverUrl, error: retryError });
          }
        }
      }
    }
  }
  if (options.fallbackServer) {
    try {
      const result = await uploadToServer(ndkBlossom.ndk, file, options.fallbackServer, options);
      logger$1.debug(`Upload successful to fallback server ${options.fallbackServer}`);
      return result;
    } catch (error) {
      logger$1.error(`Upload to fallback server ${options.fallbackServer} failed:`, error);
      errors.push({ serverUrl: options.fallbackServer, error });
    }
  }
  const errorDetails = errors.map((e) => {
    const err = e.error;
    let details = `${e.serverUrl}: ${err.message}`;
    if (err instanceof NDKBlossomServerError) {
      details += ` (status: ${err.status}, code: ${err.code})`;
      if (err.cause) {
        details += ` - ${err.cause.message}`;
      }
    } else if (err instanceof NDKBlossomAuthError) {
      details += ` (auth error, code: ${err.code})`;
    } else if (err instanceof NDKBlossomUploadError) {
      details += ` (code: ${err.code})`;
      if (err.cause) {
        details += ` - cause: ${err.cause.message}`;
      }
    }
    return details;
  });
  const errorMessage = serverUrls.length === 0 ? `No blossom servers configured. Please add servers to your profile or provide a fallbackServer. ${options.fallbackServer ? `Fallback server also failed: ${errorDetails[0] || "unknown error"}` : ""}` : `Upload failed on all ${serverUrls.length} configured server(s)${options.fallbackServer ? " and fallback server" : ""}:
${errorDetails.join("\n")}`;
  logger$1.error(errorMessage);
  throw new NDKBlossomUploadError(errorMessage, ErrorCodes.ALL_SERVERS_FAILED);
}
async function findHashInNostr(ndk, hash) {
  logger$1.debug(`Searching for hash ${hash} in nostr events`);
  const filter = {
    "#x": [hash],
    limit: 10
  };
  try {
    const events = await ndk.fetchEvents(filter);
    if (events.size === 0) {
      return [];
    }
    const foundUrls = /* @__PURE__ */ new Set();
    for (const event of events) {
      for (const tag of event.tags) {
        if (tag[0] === "imeta") {
          const imetaTag = mapImetaTag(tag);
          if (imetaTag.url && imetaTag.x === hash) {
            foundUrls.add(imetaTag.url);
          }
        }
        if (tag[0] === "url" && tag[1]) {
          const urlHash = extractHashFromUrl(tag[1]);
          if (urlHash === hash) {
            foundUrls.add(tag[1]);
          }
        }
      }
    }
    return Array.from(foundUrls);
  } catch (error) {
    logger$1.error(`Error searching for hash in nostr:`, error);
    return [];
  }
}
const logger = new DebugLogger("ndk:blossom:url-healing");
function extractHashFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    const hash = lastPart.includes(".") ? lastPart.split(".")[0] : lastPart;
    if (/^[a-f0-9]{64}$/i.test(hash)) {
      return hash;
    }
    return void 0;
  } catch (error) {
    logger.error(`Error extracting hash from URL ${url}:`, error);
    return void 0;
  }
}
async function tryUrls(urls, skipUrl) {
  if (urls.length === 0)
    return void 0;
  const filteredUrls = skipUrl ? urls.filter((url) => url !== skipUrl) : urls;
  if (filteredUrls.length === 0)
    return void 0;
  for (const url of filteredUrls) {
    try {
      const exists = await checkBlobExists(url, "");
      if (exists) {
        logger.debug(`Found working URL: ${url}`);
        return url;
      }
    } catch (error) {
      logger.debug(`URL check failed for ${url}:`, error);
    }
  }
  logger.debug(`No working URLs found, returning first URL: ${filteredUrls[0]}`);
  return filteredUrls[0];
}
async function fixUrl(ndk, user, url) {
  logger.debug(`Fixing URL: ${url}`);
  const hash = extractHashFromUrl(url);
  if (!hash) {
    logger.debug(`Invalid URL, no hash found: ${url}`);
    return url;
  }
  try {
    const exists = await checkBlobExists(url, "");
    if (exists) {
      logger.debug(`Original URL works, no need to fix: ${url}`);
      return url;
    }
  } catch (error) {
    logger.debug(`Original URL check failed: ${error}`);
  }
  try {
    const filter = { kinds: [NDKKind.BlossomList], authors: [user.pubkey] };
    const event = await ndk.fetchEvent(filter);
    let serverUrls = [];
    if (event) {
      const wrappedEvent = wrapEvent(event);
      serverUrls = wrappedEvent.servers;
    }
    if (serverUrls.length === 0) {
      logger.debug(`No servers found for user ${user.pubkey}`);
      const nostrUrls2 = await findHashInNostr(ndk, hash);
      const workingUrl2 = await tryUrls(nostrUrls2, url);
      if (workingUrl2) {
        return workingUrl2;
      }
      return url;
    }
    for (const serverUrl of serverUrls) {
      try {
        const baseUrl = serverUrl.endsWith("/") ? serverUrl.slice(0, -1) : serverUrl;
        const newUrl = `${baseUrl}/${hash}`;
        const exists = await checkBlobExists(serverUrl, hash);
        if (exists) {
          logger.debug(`Found alternative server: ${newUrl}`);
          return newUrl;
        }
      } catch (error) {
        logger.debug(`Server check failed for ${serverUrl}:`, error);
      }
    }
    const nostrUrls = await findHashInNostr(ndk, hash);
    const workingUrl = await tryUrls(nostrUrls, url);
    if (workingUrl) {
      return workingUrl;
    }
    logger.debug(`Could not fix URL: ${url}`);
    return url;
  } catch (error) {
    logger.debug(`Error fixing URL: ${error}`);
    return url;
  }
}
async function getBlobUrlByHash(ndk, user, hash) {
  logger.debug(`Getting blob URL for hash: ${hash}`);
  try {
    const filter = { kinds: [NDKKind.BlossomList], authors: [user.pubkey] };
    const event = await ndk.fetchEvent(filter);
    let serverUrls = [];
    if (event) {
      serverUrls = event.tags.filter((tag) => tag[0] === "server" && tag[1]).map((tag) => tag[1]);
    }
    if (serverUrls.length === 0) {
      logger.debug(`No servers found for user ${user.pubkey}`);
      const nostrUrls = await findHashInNostr(ndk, hash);
      const workingUrl = await tryUrls(nostrUrls);
      if (workingUrl) {
        return workingUrl;
      }
      throw new NDKBlossomNotFoundError(`No servers found for user ${user.pubkey}`, ErrorCodes.USER_SERVER_LIST_NOT_FOUND);
    }
    for (const serverUrl of serverUrls) {
      try {
        const baseUrl = serverUrl.endsWith("/") ? serverUrl.slice(0, -1) : serverUrl;
        const url = `${baseUrl}/${hash}`;
        const exists = await checkBlobExists(serverUrl, hash);
        if (exists) {
          logger.debug(`Found blob on server: ${url}`);
          return url;
        }
      } catch (error) {
        logger.debug(`Server check failed for ${serverUrl}:`, error);
      }
    }
    throw new NDKBlossomNotFoundError(`Blob with hash ${hash} not found on any of user's servers`, ErrorCodes.BLOB_NOT_FOUND);
  } catch (error) {
    if (error instanceof NDKBlossomNotFoundError) {
      throw error;
    }
    const nostrUrls = await findHashInNostr(ndk, hash);
    const workingUrl = await tryUrls(nostrUrls);
    if (workingUrl) {
      return workingUrl;
    }
    throw new NDKBlossomNotFoundError(`Failed to get blob URL: ${error.message}`, ErrorCodes.BLOB_NOT_FOUND, void 0, error);
  }
}

export { CustomLogger as C, DEFAULT_RETRY_OPTIONS as D, NDKBlossomError as N, DebugLogger as a, NDKBlossomUploadError as b, fetchWithRetry as c, NDKBlossomNotFoundError as d, NDKBlossomAuthError as e, fixUrl as f, getBlobUrlByHash as g, checkBlobExists as h, NDKBlossomOptimizationError as i, auth as j, uploadFile as u };
//# sourceMappingURL=url-healing-Vba5GwtC.js.map
