import 'clsx';
import NDKCacheSqliteWasm from '@nostr-dev-kit/cache-sqlite-wasm';
import { NDKWalletStatus, NDKCashuWallet } from '@nostr-dev-kit/wallet';
import { NDKWoT, rankByWoT } from '@nostr-dev-kit/wot';
import NDK, { NDKEvent, NDKKind, NDKRelayFeedList, NDKNutzap, NDKRelayStatus, zapInvoiceFromEvent, NDKBlossomList, NDKInterestList } from '@nostr-dev-kit/ndk';
import { LocalStorage, NDKSessionManager } from '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import require$$1 from 'tty';
import require$$1$1 from 'util';
import require$$0 from 'os';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var src = {exports: {}};

var browser = {exports: {}};

/**
 * Helpers.
 */

var ms;
var hasRequiredMs;

function requireMs () {
	if (hasRequiredMs) return ms;
	hasRequiredMs = 1;
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	ms = function (val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isFinite(val)) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}
	return ms;
}

var common;
var hasRequiredCommon;

function requireCommon () {
	if (hasRequiredCommon) return common;
	hasRequiredCommon = 1;
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */

	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = requireMs();
		createDebug.destroy = destroy;

		Object.keys(env).forEach(key => {
			createDebug[key] = env[key];
		});

		/**
		* The currently active debug mode names, and names to skip.
		*/

		createDebug.names = [];
		createDebug.skips = [];

		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};

		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;

			for (let i = 0; i < namespace.length; i++) {
				hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
				hash |= 0; // Convert to 32bit integer
			}

			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;

		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;

			function debug(...args) {
				// Disabled?
				if (!debug.enabled) {
					return;
				}

				const self = debug;

				// Set `diff` timestamp
				const curr = Number(new Date());
				const ms = curr - (prevTime || curr);
				self.diff = ms;
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;

				args[0] = createDebug.coerce(args[0]);

				if (typeof args[0] !== 'string') {
					// Anything else let's inspect with %O
					args.unshift('%O');
				}

				// Apply any `formatters` transformations
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					// If we encounter an escaped % then don't increase the array index
					if (match === '%%') {
						return '%';
					}
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === 'function') {
						const val = args[index];
						match = formatter.call(self, val);

						// Now we need to remove `args[index]` since it's inlined in the `format`
						args.splice(index, 1);
						index--;
					}
					return match;
				});

				// Apply env-specific formatting (colors, etc.)
				createDebug.formatArgs.call(self, args);

				const logFn = self.log || createDebug.log;
				logFn.apply(self, args);
			}

			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

			Object.defineProperty(debug, 'enabled', {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) {
						return enableOverride;
					}
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}

					return enabledCache;
				},
				set: v => {
					enableOverride = v;
				}
			});

			// Env-specific initialization logic for debug instances
			if (typeof createDebug.init === 'function') {
				createDebug.init(debug);
			}

			return debug;
		}

		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}

		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;

			createDebug.names = [];
			createDebug.skips = [];

			const split = (typeof namespaces === 'string' ? namespaces : '')
				.trim()
				.replace(/\s+/g, ',')
				.split(',')
				.filter(Boolean);

			for (const ns of split) {
				if (ns[0] === '-') {
					createDebug.skips.push(ns.slice(1));
				} else {
					createDebug.names.push(ns);
				}
			}
		}

		/**
		 * Checks if the given string matches a namespace template, honoring
		 * asterisks as wildcards.
		 *
		 * @param {String} search
		 * @param {String} template
		 * @return {Boolean}
		 */
		function matchesTemplate(search, template) {
			let searchIndex = 0;
			let templateIndex = 0;
			let starIndex = -1;
			let matchIndex = 0;

			while (searchIndex < search.length) {
				if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
					// Match character or proceed with wildcard
					if (template[templateIndex] === '*') {
						starIndex = templateIndex;
						matchIndex = searchIndex;
						templateIndex++; // Skip the '*'
					} else {
						searchIndex++;
						templateIndex++;
					}
				} else if (starIndex !== -1) { // eslint-disable-line no-negated-condition
					// Backtrack to the last '*' and try to match more characters
					templateIndex = starIndex + 1;
					matchIndex++;
					searchIndex = matchIndex;
				} else {
					return false; // No match
				}
			}

			// Handle trailing '*' in template
			while (templateIndex < template.length && template[templateIndex] === '*') {
				templateIndex++;
			}

			return templateIndex === template.length;
		}

		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [
				...createDebug.names,
				...createDebug.skips.map(namespace => '-' + namespace)
			].join(',');
			createDebug.enable('');
			return namespaces;
		}

		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			for (const skip of createDebug.skips) {
				if (matchesTemplate(name, skip)) {
					return false;
				}
			}

			for (const ns of createDebug.names) {
				if (matchesTemplate(name, ns)) {
					return true;
				}
			}

			return false;
		}

		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) {
				return val.stack || val.message;
			}
			return val;
		}

		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}

		createDebug.enable(createDebug.load());

		return createDebug;
	}

	common = setup;
	return common;
}

/* eslint-env browser */

var hasRequiredBrowser;

function requireBrowser () {
	if (hasRequiredBrowser) return browser.exports;
	hasRequiredBrowser = 1;
	(function (module, exports) {
		/**
		 * This is the web browser implementation of `debug()`.
		 */

		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.storage = localstorage();
		exports.destroy = (() => {
			let warned = false;

			return () => {
				if (!warned) {
					warned = true;
					console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
				}
			};
		})();

		/**
		 * Colors.
		 */

		exports.colors = [
			'#0000CC',
			'#0000FF',
			'#0033CC',
			'#0033FF',
			'#0066CC',
			'#0066FF',
			'#0099CC',
			'#0099FF',
			'#00CC00',
			'#00CC33',
			'#00CC66',
			'#00CC99',
			'#00CCCC',
			'#00CCFF',
			'#3300CC',
			'#3300FF',
			'#3333CC',
			'#3333FF',
			'#3366CC',
			'#3366FF',
			'#3399CC',
			'#3399FF',
			'#33CC00',
			'#33CC33',
			'#33CC66',
			'#33CC99',
			'#33CCCC',
			'#33CCFF',
			'#6600CC',
			'#6600FF',
			'#6633CC',
			'#6633FF',
			'#66CC00',
			'#66CC33',
			'#9900CC',
			'#9900FF',
			'#9933CC',
			'#9933FF',
			'#99CC00',
			'#99CC33',
			'#CC0000',
			'#CC0033',
			'#CC0066',
			'#CC0099',
			'#CC00CC',
			'#CC00FF',
			'#CC3300',
			'#CC3333',
			'#CC3366',
			'#CC3399',
			'#CC33CC',
			'#CC33FF',
			'#CC6600',
			'#CC6633',
			'#CC9900',
			'#CC9933',
			'#CCCC00',
			'#CCCC33',
			'#FF0000',
			'#FF0033',
			'#FF0066',
			'#FF0099',
			'#FF00CC',
			'#FF00FF',
			'#FF3300',
			'#FF3333',
			'#FF3366',
			'#FF3399',
			'#FF33CC',
			'#FF33FF',
			'#FF6600',
			'#FF6633',
			'#FF9900',
			'#FF9933',
			'#FFCC00',
			'#FFCC33'
		];

		/**
		 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
		 * and the Firebug extension (any Firefox version) are known
		 * to support "%c" CSS customizations.
		 *
		 * TODO: add a `localStorage` variable to explicitly enable/disable colors
		 */

		// eslint-disable-next-line complexity
		function useColors() {
			// NB: In an Electron preload script, document will be defined but not fully
			// initialized. Since we know we're in Chrome, we'll just detect this case
			// explicitly
			if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
				return true;
			}

			// Internet Explorer and Edge do not support colors.
			if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
				return false;
			}

			let m;

			// Is webkit? http://stackoverflow.com/a/16459606/376773
			// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
			// eslint-disable-next-line no-return-assign
			return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
				// Is firebug? http://stackoverflow.com/a/398120/376773
				(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
				// Is firefox >= v31?
				// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
				(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
				// Double check webkit in userAgent just in case we are in a worker
				(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
		}

		/**
		 * Colorize log arguments if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			args[0] = (this.useColors ? '%c' : '') +
				this.namespace +
				(this.useColors ? ' %c' : ' ') +
				args[0] +
				(this.useColors ? '%c ' : ' ') +
				'+' + module.exports.humanize(this.diff);

			if (!this.useColors) {
				return;
			}

			const c = 'color: ' + this.color;
			args.splice(1, 0, c, 'color: inherit');

			// The final "%c" is somewhat tricky, because there could be other
			// arguments passed either before or after the %c, so we need to
			// figure out the correct index to insert the CSS into
			let index = 0;
			let lastC = 0;
			args[0].replace(/%[a-zA-Z%]/g, match => {
				if (match === '%%') {
					return;
				}
				index++;
				if (match === '%c') {
					// We only are interested in the *last* %c
					// (the user may have provided their own)
					lastC = index;
				}
			});

			args.splice(lastC, 0, c);
		}

		/**
		 * Invokes `console.debug()` when available.
		 * No-op when `console.debug` is not a "function".
		 * If `console.debug` is not available, falls back
		 * to `console.log`.
		 *
		 * @api public
		 */
		exports.log = console.debug || console.log || (() => {});

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			try {
				if (namespaces) {
					exports.storage.setItem('debug', namespaces);
				} else {
					exports.storage.removeItem('debug');
				}
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */
		function load() {
			let r;
			try {
				r = exports.storage.getItem('debug') || exports.storage.getItem('DEBUG') ;
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}

			// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
			if (!r && typeof process !== 'undefined' && 'env' in process) {
				r = process.env.DEBUG;
			}

			return r;
		}

		/**
		 * Localstorage attempts to return the localstorage.
		 *
		 * This is necessary because safari throws
		 * when a user disables cookies/localstorage
		 * and you attempt to access it.
		 *
		 * @return {LocalStorage}
		 * @api private
		 */

		function localstorage() {
			try {
				// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
				// The Browser also has localStorage in the global context.
				return localStorage;
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		module.exports = requireCommon()(exports);

		const {formatters} = module.exports;

		/**
		 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
		 */

		formatters.j = function (v) {
			try {
				return JSON.stringify(v);
			} catch (error) {
				return '[UnexpectedJSONParseError]: ' + error.message;
			}
		}; 
	} (browser, browser.exports));
	return browser.exports;
}

var node = {exports: {}};

var hasFlag;
var hasRequiredHasFlag;

function requireHasFlag () {
	if (hasRequiredHasFlag) return hasFlag;
	hasRequiredHasFlag = 1;

	hasFlag = (flag, argv = process.argv) => {
		const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
		const position = argv.indexOf(prefix + flag);
		const terminatorPosition = argv.indexOf('--');
		return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
	};
	return hasFlag;
}

var supportsColor_1;
var hasRequiredSupportsColor;

function requireSupportsColor () {
	if (hasRequiredSupportsColor) return supportsColor_1;
	hasRequiredSupportsColor = 1;
	const os = require$$0;
	const tty = require$$1;
	const hasFlag = requireHasFlag();

	const {env} = process;

	let forceColor;
	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false') ||
		hasFlag('color=never')) {
		forceColor = 0;
	} else if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		forceColor = 1;
	}

	if ('FORCE_COLOR' in env) {
		if (env.FORCE_COLOR === 'true') {
			forceColor = 1;
		} else if (env.FORCE_COLOR === 'false') {
			forceColor = 0;
		} else {
			forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
		}
	}

	function translateLevel(level) {
		if (level === 0) {
			return false;
		}

		return {
			level,
			hasBasic: true,
			has256: level >= 2,
			has16m: level >= 3
		};
	}

	function supportsColor(haveStream, streamIsTTY) {
		if (forceColor === 0) {
			return 0;
		}

		if (hasFlag('color=16m') ||
			hasFlag('color=full') ||
			hasFlag('color=truecolor')) {
			return 3;
		}

		if (hasFlag('color=256')) {
			return 2;
		}

		if (haveStream && !streamIsTTY && forceColor === undefined) {
			return 0;
		}

		const min = forceColor || 0;

		if (env.TERM === 'dumb') {
			return min;
		}

		if (process.platform === 'win32') {
			// Windows 10 build 10586 is the first Windows release that supports 256 colors.
			// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
			const osRelease = os.release().split('.');
			if (
				Number(osRelease[0]) >= 10 &&
				Number(osRelease[2]) >= 10586
			) {
				return Number(osRelease[2]) >= 14931 ? 3 : 2;
			}

			return 1;
		}

		if ('CI' in env) {
			if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
				return 1;
			}

			return min;
		}

		if ('TEAMCITY_VERSION' in env) {
			return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
		}

		if (env.COLORTERM === 'truecolor') {
			return 3;
		}

		if ('TERM_PROGRAM' in env) {
			const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

			switch (env.TERM_PROGRAM) {
				case 'iTerm.app':
					return version >= 3 ? 3 : 2;
				case 'Apple_Terminal':
					return 2;
				// No default
			}
		}

		if (/-256(color)?$/i.test(env.TERM)) {
			return 2;
		}

		if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
			return 1;
		}

		if ('COLORTERM' in env) {
			return 1;
		}

		return min;
	}

	function getSupportLevel(stream) {
		const level = supportsColor(stream, stream && stream.isTTY);
		return translateLevel(level);
	}

	supportsColor_1 = {
		supportsColor: getSupportLevel,
		stdout: translateLevel(supportsColor(true, tty.isatty(1))),
		stderr: translateLevel(supportsColor(true, tty.isatty(2)))
	};
	return supportsColor_1;
}

/**
 * Module dependencies.
 */

var hasRequiredNode;

function requireNode () {
	if (hasRequiredNode) return node.exports;
	hasRequiredNode = 1;
	(function (module, exports) {
		const tty = require$$1;
		const util = require$$1$1;

		/**
		 * This is the Node.js implementation of `debug()`.
		 */

		exports.init = init;
		exports.log = log;
		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.destroy = util.deprecate(
			() => {},
			'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
		);

		/**
		 * Colors.
		 */

		exports.colors = [6, 2, 3, 4, 5, 1];

		try {
			// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
			// eslint-disable-next-line import/no-extraneous-dependencies
			const supportsColor = requireSupportsColor();

			if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
				exports.colors = [
					20,
					21,
					26,
					27,
					32,
					33,
					38,
					39,
					40,
					41,
					42,
					43,
					44,
					45,
					56,
					57,
					62,
					63,
					68,
					69,
					74,
					75,
					76,
					77,
					78,
					79,
					80,
					81,
					92,
					93,
					98,
					99,
					112,
					113,
					128,
					129,
					134,
					135,
					148,
					149,
					160,
					161,
					162,
					163,
					164,
					165,
					166,
					167,
					168,
					169,
					170,
					171,
					172,
					173,
					178,
					179,
					184,
					185,
					196,
					197,
					198,
					199,
					200,
					201,
					202,
					203,
					204,
					205,
					206,
					207,
					208,
					209,
					214,
					215,
					220,
					221
				];
			}
		} catch (error) {
			// Swallow - we only care if `supports-color` is available; it doesn't have to be.
		}

		/**
		 * Build up the default `inspectOpts` object from the environment variables.
		 *
		 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
		 */

		exports.inspectOpts = Object.keys(process.env).filter(key => {
			return /^debug_/i.test(key);
		}).reduce((obj, key) => {
			// Camel-case
			const prop = key
				.substring(6)
				.toLowerCase()
				.replace(/_([a-z])/g, (_, k) => {
					return k.toUpperCase();
				});

			// Coerce string value into JS value
			let val = process.env[key];
			if (/^(yes|on|true|enabled)$/i.test(val)) {
				val = true;
			} else if (/^(no|off|false|disabled)$/i.test(val)) {
				val = false;
			} else if (val === 'null') {
				val = null;
			} else {
				val = Number(val);
			}

			obj[prop] = val;
			return obj;
		}, {});

		/**
		 * Is stdout a TTY? Colored output is enabled when `true`.
		 */

		function useColors() {
			return 'colors' in exports.inspectOpts ?
				Boolean(exports.inspectOpts.colors) :
				tty.isatty(process.stderr.fd);
		}

		/**
		 * Adds ANSI color escape codes if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			const {namespace: name, useColors} = this;

			if (useColors) {
				const c = this.color;
				const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
				const prefix = `  ${colorCode};1m${name} \u001B[0m`;

				args[0] = prefix + args[0].split('\n').join('\n' + prefix);
				args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
			} else {
				args[0] = getDate() + name + ' ' + args[0];
			}
		}

		function getDate() {
			if (exports.inspectOpts.hideDate) {
				return '';
			}
			return new Date().toISOString() + ' ';
		}

		/**
		 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
		 */

		function log(...args) {
			return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
		}

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			if (namespaces) {
				process.env.DEBUG = namespaces;
			} else {
				// If you set a process.env field to null or undefined, it gets cast to the
				// string 'null' or 'undefined'. Just delete instead.
				delete process.env.DEBUG;
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */

		function load() {
			return process.env.DEBUG;
		}

		/**
		 * Init logic for `debug` instances.
		 *
		 * Create a new `inspectOpts` object in case `useColors` is set
		 * differently for a particular `debug` instance.
		 */

		function init(debug) {
			debug.inspectOpts = {};

			const keys = Object.keys(exports.inspectOpts);
			for (let i = 0; i < keys.length; i++) {
				debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
			}
		}

		module.exports = requireCommon()(exports);

		const {formatters} = module.exports;

		/**
		 * Map %o to `util.inspect()`, all on a single line.
		 */

		formatters.o = function (v) {
			this.inspectOpts.colors = this.useColors;
			return util.inspect(v, this.inspectOpts)
				.split('\n')
				.map(str => str.trim())
				.join(' ');
		};

		/**
		 * Map %O to `util.inspect()`, allowing multiple lines if needed.
		 */

		formatters.O = function (v) {
			this.inspectOpts.colors = this.useColors;
			return util.inspect(v, this.inspectOpts);
		}; 
	} (node, node.exports));
	return node.exports;
}

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src.exports;
	hasRequiredSrc = 1;
	if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
		src.exports = requireBrowser();
	} else {
		src.exports = requireNode();
	}
	return src.exports;
}

var srcExports = requireSrc();
var createDebug = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

function constructing(params, _error, warn) {
  if (!params.session) {
    warn("ndksvelte-no-session", "NDKSvelte instantiated without 'session' parameter.\n\nSession support is disabled. This means:\n  • No login/logout functionality\n  • No wallet integration ($wallet store unavailable)\n  • No automatic session persistence\n  • No follows/mutes management\n\nMost interactive apps need session support.", "Enable sessions: createNDK({ session: true })\nOr with custom options: createNDK({ session: { follows: true, wallet: true } })");
  }
}
function subscribing(config, error, _warn) {
  if (typeof config === "function") {
    return;
  }
  if (typeof config === "object" && config !== null) {
    error("ndksvelte-subscribe-wrong-api", "$subscribe() requires a CALLBACK FUNCTION, not direct config.\n\nYou're trying to use an API that doesn't exist.\n\nWRONG:\n  const notes = ndk.$subscribe({ kinds: [1] });\n  const notes = ndk.$subscribe([{ kinds: [1] }]);\n\nCORRECT:\n  const notes = ndk.$subscribe(() => ({\n    filters: [{ kinds: [1], limit: 50 }]\n  }));\n\nThe callback enables reactive filters and conditional subscriptions.", "Always wrap your config in a callback function: () => ({ ... })");
  }
}
function validateCallback(param, functionName, paramName) {
  if (typeof param !== "function") {
    throw new TypeError(`${functionName} expects ${paramName} to be a function, but received ${typeof param}. Example: ndk.${functionName}(() => value) instead of ndk.${functionName}(value)`);
  }
}
function createFetchEvents(ndk2, config) {
  validateCallback(config, "$fetchEvents", "config");
  const _events = [];
  const derivedConfig = (() => {
    const rawConfig = config();
    if (!rawConfig) return rawConfig;
    if ("filters" in rawConfig) {
      return rawConfig;
    }
    if (Array.isArray(rawConfig)) {
      return { filters: rawConfig };
    }
    const filterProps = [
      "kinds",
      "authors",
      "ids",
      "since",
      "until",
      "limit",
      "#e",
      "#p",
      "#a",
      "#d",
      "#t",
      "search"
    ];
    const hasFilterProp = filterProps.some((prop) => prop in rawConfig);
    if (hasFilterProp) {
      return { filters: rawConfig };
    }
    return rawConfig;
  })();
  (() => {
    const cfg = derivedConfig;
    if (!cfg || !("filters" in cfg)) return void 0;
    return Array.isArray(cfg.filters) ? cfg.filters : [cfg.filters];
  })();
  (() => {
    const cfg = derivedConfig;
    if (!cfg || !("filters" in cfg)) return {};
    const { filters, ...ndkOpts } = cfg;
    return ndkOpts;
  })();
  return _events;
}
class ReactivePoolStore {
  #ndk;
  relays = /* @__PURE__ */ new Map();
  connectedCount = 0;
  connectingCount = 0;
  constructor(ndk2) {
    this.#ndk = ndk2;
    this.#setupListeners();
  }
  /**
   * Setup listeners for pool events
   */
  #setupListeners() {
    const pool = this.#ndk.pool;
    if (!pool) {
      console.error("[svelte] Pool not initialized, skipping event listeners");
      return;
    }
    for (const relay of pool.relays.values()) {
      this.#initializeRelay(relay);
    }
    pool.on("relay:connect", this.#handleRelayConnect);
    pool.on("relay:disconnect", this.#handleRelayDisconnect);
    pool.on("relay:connecting", this.#handleRelayConnecting);
  }
  #initializeRelay(relay) {
    const status = relay.connectivity.status;
    let relayStatus;
    if (status >= NDKRelayStatus.CONNECTED) {
      relayStatus = "connected";
    } else if (status === NDKRelayStatus.CONNECTING) {
      relayStatus = "connecting";
    } else if (status === NDKRelayStatus.RECONNECTING) {
      relayStatus = "reconnecting";
    } else {
      relayStatus = "disconnected";
    }
    this.#updateRelay(relay, relayStatus);
  }
  #handleRelayConnect = (relay) => {
    this.#updateRelay(relay, "connected");
    this.#updateCounts();
  };
  #handleRelayDisconnect = (relay) => {
    this.#updateRelay(relay, "disconnected");
    this.#updateCounts();
  };
  #handleRelayConnecting = (relay) => {
    this.#updateRelay(relay, "connecting");
    this.#updateCounts();
  };
  #updateRelay(relay, status) {
    const existing = this.relays.get(relay.url);
    const info = {
      url: relay.url,
      status,
      connectionStats: existing?.connectionStats || { attempts: 0, success: 0 }
    };
    if (status === "connecting") {
      info.connectionStats.attempts++;
    } else if (status === "connected") {
      info.connectionStats.success++;
      info.connectionStats.connectedAt = Date.now();
    }
    this.relays.set(relay.url, info);
    this.relays = new Map(this.relays);
  }
  #updateCounts() {
    let connected = 0;
    let connecting = 0;
    for (const info of this.relays.values()) {
      if (info.status === "connected") connected++;
      if (info.status === "connecting") connecting++;
    }
    this.connectedCount = connected;
    this.connectingCount = connecting;
  }
  /**
   * Get relay info by URL
   */
  getRelay(url) {
    return this.relays.get(url);
  }
  /**
   * Get all connected relays
   */
  getConnectedRelays() {
    return Array.from(this.relays.values()).filter((r) => r.status === "connected");
  }
}
function createReactivePool(ndk2) {
  return new ReactivePoolStore(ndk2);
}
class FollowsProxy {
  #store;
  #followSet;
  constructor(store, followSet) {
    this.#store = store;
    this.#followSet = followSet;
  }
  /**
   * Add a follow to the current user's contact list
   *
   * @param pubkey - The pubkey to follow
   * @returns Promise that resolves to true if follow was added, false if already following
   */
  async add(pubkey) {
    const user = this.#store.currentUser;
    if (!user) throw new Error("No active user");
    return await user.follow(pubkey, this.#followSet);
  }
  /**
   * Remove a follow from the current user's contact list
   *
   * @param pubkey - The pubkey to unfollow
   * @returns Promise that resolves to the relays where the update was published, or false if not following
   */
  async remove(pubkey) {
    const user = this.#store.currentUser;
    if (!user) throw new Error("No active user");
    return await user.unfollow(pubkey, this.#followSet);
  }
  /**
   * Toggle follow status for a user
   *
   * @param pubkey - The pubkey to toggle
   * @returns Promise that resolves when action is complete
   */
  async toggle(pubkey) {
    if (this.#followSet.has(pubkey)) {
      await this.remove(pubkey);
    } else {
      await this.add(pubkey);
    }
  }
  // Delegate all Set methods to the underlying Set
  has(pubkey) {
    return this.#followSet.has(pubkey);
  }
  get size() {
    return this.#followSet.size;
  }
  [Symbol.iterator]() {
    return this.#followSet[Symbol.iterator]();
  }
  values() {
    return this.#followSet.values();
  }
  keys() {
    return this.#followSet.keys();
  }
  entries() {
    return this.#followSet.entries();
  }
  forEach(callback, thisArg) {
    return this.#followSet.forEach(callback, thisArg);
  }
}
class MutesProxy {
  #store;
  #muteSet;
  constructor(store, muteSet) {
    this.#store = store;
    this.#muteSet = muteSet;
  }
  /**
   * Mute a user
   *
   * @param pubkey - The pubkey to mute
   * @returns Promise that resolves when mute is published
   */
  async mute(pubkey) {
    const user = this.#store.currentUser;
    if (!user) throw new Error("No active user");
    if (!user.ndk) throw new Error("No NDK instance found");
    user.ndk.assertSigner();
    if (this.#muteSet.has(pubkey)) return;
    this.#muteSet.add(pubkey);
    const event = new NDKEvent(user.ndk, { kind: NDKKind.MuteList, content: "", tags: [] });
    for (const mutedPubkey of this.#muteSet) {
      event.tags.push(["p", mutedPubkey]);
    }
    await event.publishReplaceable();
  }
  /**
   * Unmute a user
   *
   * @param pubkey - The pubkey to unmute
   * @returns Promise that resolves when unmute is published
   */
  async unmute(pubkey) {
    const user = this.#store.currentUser;
    if (!user) throw new Error("No active user");
    if (!user.ndk) throw new Error("No NDK instance found");
    user.ndk.assertSigner();
    if (!this.#muteSet.has(pubkey)) return;
    this.#muteSet.delete(pubkey);
    const event = new NDKEvent(user.ndk, { kind: NDKKind.MuteList, content: "", tags: [] });
    for (const mutedPubkey of this.#muteSet) {
      event.tags.push(["p", mutedPubkey]);
    }
    await event.publishReplaceable();
  }
  /**
   * Toggle mute status for a user
   *
   * @param pubkey - The pubkey to toggle
   * @returns Promise that resolves when action is complete
   */
  async toggle(pubkey) {
    if (this.#muteSet.has(pubkey)) {
      await this.unmute(pubkey);
    } else {
      await this.mute(pubkey);
    }
  }
  // Delegate all Set methods to the underlying Set
  has(pubkey) {
    return this.#muteSet.has(pubkey);
  }
  get size() {
    return this.#muteSet.size;
  }
  [Symbol.iterator]() {
    return this.#muteSet[Symbol.iterator]();
  }
  values() {
    return this.#muteSet.values();
  }
  keys() {
    return this.#muteSet.keys();
  }
  entries() {
    return this.#muteSet.entries();
  }
  forEach(callback, thisArg) {
    return this.#muteSet.forEach(callback, thisArg);
  }
}
class ReactiveSessionsStore {
  #manager;
  // Reactive state synced from Zustand store
  // Using Record instead of Map to avoid Proxy issues with $state
  sessions = {};
  activePubkey = void 0;
  constructor(sessionManager) {
    this.#manager = sessionManager;
    this.#manager.subscribe((state) => {
      const sessionsObj = {};
      state.sessions.forEach((session, pubkey) => {
        sessionsObj[pubkey] = session;
      });
      this.sessions = sessionsObj;
      if (state.activePubkey) {
        const signer = state.signers.get(state.activePubkey);
        if (signer && state.ndk) {
          state.ndk.signer = signer;
        }
      } else if (state.ndk) {
        state.ndk.signer = void 0;
        state.ndk.activeUser = void 0;
      }
      this.activePubkey = state.activePubkey;
    });
    this.#manager.restore().catch((error) => {
      console.error("[svelte] Failed to restore sessions:", error);
    });
  }
  /**
   * Get current active session
   */
  get current() {
    if (!this.activePubkey) return void 0;
    return this.sessions[this.activePubkey];
  }
  /**
   * Get current active user
   */
  get currentUser() {
    return this.#manager.activeUser;
  }
  /**
   * Get follows set for current session
   *
   * Returns a FollowsProxy that works like a Set but has async add/remove methods
   * that publish changes to the network.
   *
   * @example
   * ```ts
   * // Use as a Set
   * const isFollowing = ndk.$sessions.follows.has(pubkey);
   * const count = ndk.$sessions.follows.size;
   * for (const pubkey of ndk.$sessions.follows) { ... }
   *
   * // Add/remove follows (publishes to network)
   * await ndk.$sessions.follows.add(pubkey);
   * await ndk.$sessions.follows.remove(pubkey);
   * ```
   */
  get follows() {
    const followSet = this.current?.followSet ?? /* @__PURE__ */ new Set();
    return new FollowsProxy(this, followSet);
  }
  /**
   * Get mutes for current session
   *
   * Returns a MutesProxy that works like a Set but has async mute/unmute methods
   * that publish changes to the network.
   *
   * @example
   * ```ts
   * // Use as a Set
   * const isMuted = ndk.$sessions.mutes.has(pubkey);
   * const count = ndk.$sessions.mutes.size;
   * for (const pubkey of ndk.$sessions.mutes) { ... }
   *
   * // Mute/unmute users (publishes to network)
   * await ndk.$sessions.mutes.mute(pubkey);
   * await ndk.$sessions.mutes.unmute(pubkey);
   * await ndk.$sessions.mutes.toggle(pubkey);
   * ```
   */
  get mutes() {
    const muteMap = this.current?.muteSet ?? /* @__PURE__ */ new Map();
    const muteSet = new Set(muteMap.keys());
    return new MutesProxy(this, muteSet);
  }
  /**
   * Get muted words for current session
   */
  get mutedWords() {
    return this.current?.mutedWords ?? /* @__PURE__ */ new Set();
  }
  /**
   * Get blocked relays for current session
   */
  get blockedRelays() {
    return this.current?.blockedRelays ?? /* @__PURE__ */ new Set();
  }
  /**
   * Get user's relay list for current session
   */
  get relayList() {
    return this.current?.relayList ?? /* @__PURE__ */ new Map();
  }
  /**
   * Get session event by kind for current session
   */
  getSessionEvent(kind) {
    return this.current?.events.get(kind);
  }
  /**
   * Get wallet event (kind 17375) for current session
   */
  get walletEvent() {
    return this.getSessionEvent(NDKKind.CashuWallet);
  }
  /**
   * Get all sessions as array
   */
  get all() {
    return Object.values(this.sessions);
  }
  /**
   * Login with a signer or user
   * - With signer: Full access to sign and publish events
   * - With user: Read-only access to view profile, follows, etc.
   *
   * @example
   * ```ts
   * // Full access with signer
   * await ndk.$sessions.login(signer, { setActive: true });
   *
   * // Read-only with user
   * const user = ndk.getUser({ pubkey: "hex..." });
   * await ndk.$sessions.login(user);
   * ```
   */
  async login(userOrSigner, options) {
    return await this.#manager.login(userOrSigner, options);
  }
  /**
   * Add a session without setting it as active
   * - With signer: Full access session
   * - With user: Read-only session
   */
  async add(userOrSigner) {
    return await this.#manager.login(userOrSigner, { setActive: false });
  }
  /**
   * Logout (remove) a session
   */
  logout(pubkey) {
    const targetPubkey = pubkey ?? this.activePubkey;
    if (!targetPubkey) return;
    this.#manager.logout(targetPubkey);
  }
  /**
   * Logout all sessions
   */
  logoutAll() {
    const pubkeys = Object.keys(this.sessions);
    for (const pubkey of pubkeys) {
      this.#manager.logout(pubkey);
    }
  }
  /**
   * Switch to a different session
   */
  async switch(pubkey) {
    await this.#manager.switchTo(pubkey);
  }
  /**
   * Switch to a different session (alias for switch)
   */
  async switchTo(pubkey) {
    await this.#manager.switchTo(pubkey);
  }
  /**
   * Get a specific session
   */
  get(pubkey) {
    return this.sessions[pubkey];
  }
  /**
   * Start fetching data for a session
   */
  start(pubkey, options) {
    this.#manager.startSession(pubkey, options);
  }
  /**
   * Stop fetching data for a session
   */
  stop(pubkey) {
    this.#manager.stopSession(pubkey);
  }
  /**
   * Add monitors to the active session
   *
   * @example
   * ```ts
   * // Add monitors to active session
   * ndk.$sessions.addMonitor([NDKInterestList, 10050, 10051]);
   * ```
   */
  addMonitor(monitor) {
    this.#manager.addMonitor(monitor);
  }
  /**
   * Check if a session is read-only (no signer available)
   * @param pubkey - Optional pubkey to check. If not provided, checks active session
   * @returns true if the session has no signer (read-only), false if it has a signer
   */
  isReadOnly(pubkey) {
    return this.#manager.isReadOnly(pubkey);
  }
  /**
   * Create a new account with optional profile, relays, wallet, and follows
   * Delegates to the underlying session manager's createAccount method
   */
  async createAccount(data, opts) {
    return await this.#manager.createAccount(data, opts);
  }
}
function createReactiveSessions(sessionManager) {
  return new ReactiveSessionsStore(sessionManager);
}
class ReactiveWalletStore {
  balance = 0;
  #wallet = void 0;
  status = NDKWalletStatus.INITIAL;
  #ndk;
  #sessionManager;
  #currentWalletEventId;
  #currentPubkey;
  #syncing = false;
  constructor(ndk2, sessionManager) {
    this.#ndk = ndk2;
    this.#sessionManager = sessionManager;
    sessionManager.subscribe((state) => {
      const activePubkey = state.activePubkey;
      if (!activePubkey) {
        this.clear();
        return;
      }
      const session = state.sessions.get(activePubkey);
      const walletEvent = session?.events.get(NDKKind.CashuWallet);
      const pubkeyChanged = this.#currentPubkey && this.#currentPubkey !== activePubkey;
      if (!walletEvent) {
        if (this.#wallet && !pubkeyChanged) {
          this.clear();
        }
        return;
      }
      if (walletEvent.id === this.#currentWalletEventId && activePubkey === this.#currentPubkey) {
        return;
      }
      if (this.#syncing) {
        return;
      }
      this.#syncWallet(walletEvent, activePubkey);
    });
  }
  /**
   * Sync wallet from session's wallet event (kind 17375)
   */
  async #syncWallet(walletEvent, pubkey) {
    this.#syncing = true;
    try {
      const wallet = await NDKCashuWallet.from(walletEvent);
      if (wallet) {
        this.#currentWalletEventId = walletEvent.id;
        this.#currentPubkey = pubkey;
        this.set(wallet);
        await wallet.start({ pubkey });
      }
    } catch {
    } finally {
      this.#syncing = false;
    }
  }
  /**
   * Set the active wallet and subscribe to balance updates
   */
  set(wallet) {
    if (this.#wallet) {
      this.#wallet.off("balance_updated", this.#handleBalanceUpdate);
      this.#wallet.off("status_changed", this.#handleStatusChange);
    }
    this.#wallet = wallet;
    this.status = wallet.status;
    this.#ndk.wallet = wallet;
    wallet.on("balance_updated", this.#handleBalanceUpdate);
    wallet.on("status_changed", this.#handleStatusChange);
    void this.refreshBalance();
  }
  /**
   * Handle balance update events from wallet
   */
  #handleBalanceUpdate = (balance) => {
    if (balance) {
      this.balance = balance.amount || 0;
    } else {
      void this.refreshBalance();
    }
  };
  /**
   * Handle status change events from wallet
   */
  #handleStatusChange = (status) => {
    this.status = status;
  };
  /**
   * Manually refresh the wallet balance
   */
  async refreshBalance() {
    if (!this.#wallet) return;
    try {
      const balance = this.#wallet.balance;
      this.balance = balance?.amount || 0;
    } catch {
    }
  }
  /**
   * Clear the wallet
   */
  clear() {
    if (this.#wallet) {
      this.#wallet.off("balance_updated", this.#handleBalanceUpdate);
      this.#wallet.off("status_changed", this.#handleStatusChange);
    }
    this.#wallet = void 0;
    this.balance = 0;
    this.status = NDKWalletStatus.INITIAL;
    this.#currentWalletEventId = void 0;
    this.#currentPubkey = void 0;
    this.#ndk.wallet = void 0;
  }
  // Convenience getters
  /**
   * Get configured mint URLs
   */
  get mints() {
    const wallet = this.#wallet;
    if (!wallet || !(wallet instanceof NDKCashuWallet)) return [];
    return wallet.mints;
  }
  /**
   * Get all mints with their balances (including configured mints with 0 balance)
   */
  get mintBalances() {
    const wallet = this.#wallet;
    if (!wallet || !(wallet instanceof NDKCashuWallet)) return [];
    const balances = wallet.state.getMintsBalance();
    const configuredMints = wallet.mints;
    const mintMap = /* @__PURE__ */ new Map();
    for (const url of configuredMints) {
      mintMap.set(url, 0);
    }
    for (const [url, balance] of Object.entries(balances)) {
      if (typeof balance === "number") {
        mintMap.set(url, balance);
      }
    }
    return Array.from(mintMap.entries()).map(([url, balance]) => ({ url, balance })).sort((a, b) => b.balance - a.balance);
  }
  /**
   * Get configured relay URLs
   */
  get relays() {
    const wallet = this.#wallet;
    if (!wallet || !(wallet instanceof NDKCashuWallet)) return [];
    if (!wallet.relaySet) return [];
    return Array.from(wallet.relaySet.relays).map((relay) => relay.url);
  }
  /**
   * Get transaction history
   * TODO: Implement when $payments is ready
   */
  get transactions() {
    return [];
  }
  /**
   * Check if wallet needs onboarding (no wallet or no mints configured)
   */
  get needsOnboarding() {
    const wallet = this.#wallet;
    return !wallet || wallet instanceof NDKCashuWallet && wallet.mints.length === 0;
  }
  /**
   * Get the wallet's private key (first privkey)
   */
  get privkey() {
    const wallet = this.#wallet;
    if (!(wallet instanceof NDKCashuWallet)) return void 0;
    const privkeys = Array.from(wallet.privkeys);
    const firstEntry = privkeys.length > 0 ? privkeys[0] : void 0;
    return firstEntry ? firstEntry[0] : void 0;
  }
  /**
   * Get the wallet's relay set
   */
  get relaySet() {
    const wallet = this.#wallet;
    if (!(wallet instanceof NDKCashuWallet)) return void 0;
    return wallet.relaySet;
  }
  // Method delegates
  /**
   * Create a deposit to add funds to the wallet
   */
  deposit(amount, mint) {
    const wallet = this.#wallet;
    if (!(wallet instanceof NDKCashuWallet)) return void 0;
    return wallet.deposit(amount, mint);
  }
  /**
   * Create a cashu token to send to someone
   */
  async send(amount, memo) {
    const wallet = this.#wallet;
    if (!(wallet instanceof NDKCashuWallet)) throw new Error("No wallet");
    return wallet.send(amount, memo);
  }
  /**
   * Receive a cashu token
   */
  async receiveToken(token, memo) {
    const wallet = this.#wallet;
    if (!(wallet instanceof NDKCashuWallet)) throw new Error("No wallet");
    await wallet.receiveToken(token, memo);
  }
  /**
   * Get the P2PK public key for this wallet
   */
  async getP2PKPubkey() {
    const wallet = this.#wallet;
    if (!(wallet instanceof NDKCashuWallet)) throw new Error("No wallet");
    return await wallet.getP2pk();
  }
  /**
   * Pay a Lightning invoice
   */
  async lnPay(payment) {
    const wallet = this.#wallet;
    if (!(wallet instanceof NDKCashuWallet)) throw new Error("No wallet");
    return wallet.lnPay(payment);
  }
  /**
   * Save wallet configuration (mints and relays).
   * Creates a new wallet if none exists, or updates the existing one.
   * Also publishes the CashuMintList (kind 10019) for nutzap reception.
   *
   * @param config - Wallet configuration with mints and optional relays
   * @returns Promise that resolves when wallet is saved
   *
   * @example
   * // Create or update wallet
   * await ndk.$wallet.save({
   *   mints: ['https://mint.example.com'],
   *   relays: ['wss://relay.example.com']
   * });
   */
  async save(config) {
    let wallet = this.#wallet;
    if (!(wallet instanceof NDKCashuWallet)) {
      const session = this.#sessionManager.activePubkey;
      if (!session) throw new Error("No active session");
      const newWallet = await NDKCashuWallet.create(this.#ndk, config.mints, config.relays);
      await newWallet.start({ pubkey: session });
      this.set(newWallet);
      wallet = newWallet;
    } else {
      await wallet.update(config);
    }
    if (wallet instanceof NDKCashuWallet) {
      await wallet.publishMintList();
    }
  }
}
function createReactiveWallet(ndk2, sessionManager) {
  return new ReactiveWalletStore(ndk2, sessionManager);
}
class ReactiveWoTStore {
  #ndk;
  #sessions;
  #wot = null;
  loaded = false;
  autoFilterEnabled = false;
  #autoFilterOptions = void 0;
  constructor(ndk2, sessions) {
    this.#ndk = ndk2;
    this.#sessions = sessions;
  }
  /**
   * Load WoT data for the current user
   */
  async load(options = {}) {
    const currentPubkey = this.#sessions.currentUser?.pubkey;
    if (!currentPubkey) {
      throw new Error("Cannot load WoT: no user logged in");
    }
    this.#wot = new NDKWoT(this.#ndk, currentPubkey);
    const buildOptions = {
      depth: options.maxDepth || 3,
      maxFollows: options.maxFollows,
      timeout: options.timeout
    };
    await this.#wot.load(buildOptions);
    this.loaded = true;
  }
  /**
   * Enable automatic filtering on subscriptions
   */
  enableAutoFilter(options) {
    this.autoFilterEnabled = true;
    this.#autoFilterOptions = options;
  }
  /**
   * Disable automatic filtering
   */
  disableAutoFilter() {
    this.autoFilterEnabled = false;
    this.#autoFilterOptions = void 0;
  }
  /**
   * Get WoT score for a pubkey (0-1, higher = closer)
   */
  getScore(pubkey) {
    if (!this.#wot) return 0;
    return this.#wot.getScore(pubkey);
  }
  /**
   * Get WoT distance (depth/hops) for a pubkey
   */
  getDistance(pubkey) {
    if (!this.#wot) return null;
    return this.#wot.getDistance(pubkey);
  }
  /**
   * Check if pubkey is in WoT
   */
  includes(pubkey, options) {
    if (!this.#wot) return false;
    return this.#wot.includes(pubkey, options);
  }
  /**
   * Check if an event should be filtered based on WoT
   */
  shouldFilterEvent(event) {
    if (!this.#wot || !this.autoFilterEnabled) return false;
    const { maxDepth, minScore, includeUnknown = false } = this.#autoFilterOptions || {};
    const inWoT = this.includes(event.pubkey, { maxDepth });
    if (!inWoT) {
      return !includeUnknown;
    }
    if (minScore !== void 0) {
      const score = this.getScore(event.pubkey);
      return score < minScore;
    }
    return false;
  }
  /**
   * Rank events by WoT
   */
  rankEvents(events, options) {
    if (!this.#wot) return events;
    return rankByWoT(this.#wot, events, options);
  }
}
function createReactiveWoT(ndk2, sessions) {
  return new ReactiveWoTStore(ndk2, sessions);
}
function createSubscriptionInternal(ndk2, config, subscribeMethod) {
  let _events = [];
  let _eosed = false;
  const eventMap = /* @__PURE__ */ new Map();
  let subscription;
  let currentFilters;
  let currentNdkOpts;
  const derivedConfig = (() => {
    const rawConfig = config();
    if (!rawConfig) return rawConfig;
    if ("filters" in rawConfig) {
      return rawConfig;
    }
    if (Array.isArray(rawConfig)) {
      return { filters: rawConfig };
    }
    const filterProps = [
      "kinds",
      "authors",
      "ids",
      "since",
      "until",
      "limit",
      "#e",
      "#p",
      "#a",
      "#d",
      "#t",
      "search"
    ];
    const hasFilterProp = filterProps.some((prop) => prop in rawConfig);
    if (hasFilterProp) {
      return { filters: rawConfig };
    }
    return rawConfig;
  })();
  (() => {
    const cfg = derivedConfig;
    if (!cfg) return [];
    if (!("filters" in cfg)) return [];
    return Array.isArray(cfg.filters) ? cfg.filters : [cfg.filters];
  })();
  (() => {
    const cfg = derivedConfig;
    if (!cfg || !("filters" in cfg)) return {};
    const {
      filters,
      noDedupe,
      dedupeKey: dedupeKey2,
      wot,
      wotRank,
      ...ndkOpts
    } = cfg;
    return ndkOpts;
  })();
  const derivedWrapperOpts = (() => {
    const cfg = derivedConfig;
    if (!cfg || !("filters" in cfg)) {
      return {
        noDedupe: void 0,
        dedupeKey: void 0,
        wot: void 0,
        wotRank: void 0
      };
    }
    return {
      noDedupe: cfg.noDedupe,
      dedupeKey: cfg.dedupeKey,
      wot: cfg.wot,
      wotRank: cfg.wotRank
    };
  })();
  const dedupeKey = (() => {
    return derivedWrapperOpts.dedupeKey ?? ((e) => e.deduplicationKey());
  })();
  let throttleTimer;
  let lastUpdateTime = 0;
  function handleEvent(event) {
    const wrapperOpts = derivedWrapperOpts;
    const key = dedupeKey(event);
    if (!wrapperOpts.noDedupe && eventMap.has(key)) {
      const existing = eventMap.get(key);
      if (existing) {
        const existingTime = existing.created_at || 0;
        const newTime = event.created_at || 0;
        if (existingTime >= newTime) {
          return;
        }
      }
    }
    eventMap.set(key, event);
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateTime;
    if (timeSinceLastUpdate >= 16) {
      lastUpdateTime = now;
      updateEvents();
    } else if (throttleTimer === void 0) {
      const delay = 16 - timeSinceLastUpdate;
      throttleTimer = setTimeout(
        () => {
          throttleTimer = void 0;
          lastUpdateTime = Date.now();
          updateEvents();
        },
        delay
      );
    }
  }
  function updateEvents() {
    const wrapperOpts = derivedWrapperOpts;
    let events = Array.from(eventMap.values());
    let wotSorted = false;
    if (ndk2.$wot && ndk2.$wot.loaded) {
      const shouldApplyWoTFilter = wrapperOpts.wot !== false && // Not explicitly disabled
      (wrapperOpts.wot || ndk2.$wot.autoFilterEnabled);
      if (shouldApplyWoTFilter) {
        events = events.filter((event) => {
          if (wrapperOpts.wot && typeof wrapperOpts.wot === "object") {
            const { maxDepth, minScore, includeUnknown = false } = wrapperOpts.wot;
            const inWoT = ndk2.$wot.includes(event.pubkey, { maxDepth });
            if (!inWoT) {
              return includeUnknown;
            }
            if (minScore !== void 0) {
              const score = ndk2.$wot.getScore(event.pubkey);
              return score >= minScore;
            }
            return true;
          } else {
            return !ndk2.$wot.shouldFilterEvent(event);
          }
        });
      }
      if (wrapperOpts.wotRank) {
        events = ndk2.$wot.rankEvents(events, wrapperOpts.wotRank);
        wotSorted = true;
      }
    }
    if (!wotSorted) events.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
    _events = events;
  }
  function start() {
    if (subscription) return;
    const result = subscribeMethod(currentFilters, {
      ...currentNdkOpts,
      closeOnEose: false,
      onEvents: (cachedEvents) => {
        for (const event of cachedEvents) {
          const wrapperOpts = derivedWrapperOpts;
          const key = dedupeKey(event);
          if (!wrapperOpts.noDedupe && eventMap.has(key)) {
            const existing = eventMap.get(key);
            if (existing) {
              const existingTime = existing.created_at || 0;
              const newTime = event.created_at || 0;
              if (existingTime >= newTime) {
                continue;
              }
            }
          }
          eventMap.set(key, event);
        }
        updateEvents();
      },
      onEvent: handleEvent,
      onEose: () => {
        _eosed = true;
      }
    });
    if (result instanceof Promise) {
      result.then((sub) => {
        subscription = sub;
      }).catch(() => {
      });
    } else {
      subscription = result;
    }
  }
  function stop() {
    subscription?.stop();
    subscription = void 0;
    if (throttleTimer !== void 0) {
      clearTimeout(throttleTimer);
      throttleTimer = void 0;
    }
  }
  function clear() {
    if (throttleTimer !== void 0) {
      clearTimeout(throttleTimer);
      throttleTimer = void 0;
    }
    eventMap.clear();
    _events = [];
    _eosed = false;
    lastUpdateTime = 0;
  }
  return {
    get events() {
      return _events;
    },
    get count() {
      return _events.length;
    },
    get eosed() {
      return _eosed;
    },
    start,
    stop,
    clear
  };
}
function createSubscription(ndk2, config) {
  validateCallback(config, "$subscribe", "config");
  return createSubscriptionInternal(ndk2, config, (filters, subOpts) => {
    return ndk2.subscribe(filters, subOpts);
  });
}
function createMetaSubscription(ndk2, config) {
  validateCallback(config, "$metaSubscribe", "config");
  let _events = [];
  let _eosed = false;
  let _pointedBy = /* @__PURE__ */ new Map();
  const targetEventMap = /* @__PURE__ */ new Map();
  const pointersByTarget = /* @__PURE__ */ new Map();
  let subscription;
  let currentFilters;
  let currentNdkOpts;
  let currentSort;
  const derivedConfig = (() => {
    const rawConfig = config();
    if (!rawConfig) return rawConfig;
    if ("filters" in rawConfig) {
      return rawConfig;
    }
    if (Array.isArray(rawConfig)) {
      return { filters: rawConfig };
    }
    const filterProps = [
      "kinds",
      "authors",
      "ids",
      "since",
      "until",
      "limit",
      "#e",
      "#p",
      "#a",
      "#d",
      "#t",
      "search"
    ];
    const hasFilterProp = filterProps.some((prop) => prop in rawConfig);
    if (hasFilterProp) {
      return { filters: rawConfig };
    }
    return rawConfig;
  })();
  (() => {
    const cfg = derivedConfig;
    if (!cfg || !("filters" in cfg)) return [];
    return Array.isArray(cfg.filters) ? cfg.filters : [cfg.filters];
  })();
  (() => {
    const cfg = derivedConfig;
    if (!cfg || !("filters" in cfg)) return {};
    const { filters, sort, ...ndkOpts } = cfg;
    return ndkOpts;
  })();
  (() => {
    const cfg = derivedConfig;
    return cfg && "sort" in cfg ? cfg.sort ?? "time" : "time";
  })();
  async function handlePointerEvents(pointerEvents) {
    const allReferences = /* @__PURE__ */ new Set();
    const pointersByRef = /* @__PURE__ */ new Map();
    for (const pointerEvent of pointerEvents) {
      const eTags = pointerEvent.getMatchingTags("e");
      const aTags = pointerEvent.getMatchingTags("a");
      for (const eTag of eTags) {
        if (eTag[1]) {
          allReferences.add(eTag[1]);
          const pointers = pointersByRef.get(eTag[1]) || [];
          pointers.push(pointerEvent);
          pointersByRef.set(eTag[1], pointers);
        }
      }
      for (const aTag of aTags) {
        if (aTag[1]) {
          allReferences.add(aTag[1]);
          const pointers = pointersByRef.get(aTag[1]) || [];
          pointers.push(pointerEvent);
          pointersByRef.set(aTag[1], pointers);
        }
      }
    }
    if (allReferences.size === 0) {
      return;
    }
    const filters = [];
    const ids = [];
    const addresses = [];
    for (const ref of allReferences) {
      if (ref.includes(":")) {
        addresses.push(ref);
      } else {
        ids.push(ref);
      }
    }
    if (ids.length > 0) {
      filters.push({ ids });
    }
    if (addresses.length > 0) {
      const byAuthor = /* @__PURE__ */ new Map();
      for (const addr of addresses) {
        const [kindStr, pubkey, dTag] = addr.split(":");
        const kind = parseInt(kindStr);
        if (!isNaN(kind) && pubkey && dTag) {
          if (!byAuthor.has(pubkey)) {
            byAuthor.set(pubkey, { kinds: /* @__PURE__ */ new Set(), dTags: /* @__PURE__ */ new Set() });
          }
          const entry = byAuthor.get(pubkey);
          entry.kinds.add(kind);
          entry.dTags.add(dTag);
        }
      }
      for (const [pubkey, { kinds, dTags }] of byAuthor) {
        filters.push({
          kinds: Array.from(kinds),
          authors: [pubkey],
          "#d": Array.from(dTags)
        });
      }
    }
    try {
      const events = await ndk2.guardrailOff().fetchEvents(filters);
      for (const event of events) {
        const tagId = event.tagId();
        const pointers = pointersByRef.get(tagId);
        if (pointers) {
          handleTargetEvent(event, pointers);
        }
      }
      updateEvents();
    } catch {
    }
  }
  async function handlePointerEvent(pointerEvent) {
    await handlePointerEvents([pointerEvent]);
  }
  function handleTargetEvent(targetEvent, pointers) {
    const tagId = targetEvent.tagId();
    targetEventMap.set(tagId, targetEvent);
    const existingPointers = pointersByTarget.get(tagId) || [];
    const existingIds = new Set(existingPointers.map((p) => p.id));
    const newPointers = pointers.filter((p) => !existingIds.has(p.id));
    if (newPointers.length > 0) {
      pointersByTarget.set(tagId, [...existingPointers, ...newPointers]);
    }
  }
  function updateEvents() {
    let events = Array.from(targetEventMap.values());
    switch (currentSort) {
      case "time":
        events.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
        break;
      case "count":
        events.sort((a, b) => {
          const aCount = pointersByTarget.get(a.tagId())?.length || 0;
          const bCount = pointersByTarget.get(b.tagId())?.length || 0;
          return bCount - aCount;
        });
        break;
      case "tag-time":
        events.sort((a, b) => {
          const aPointers = pointersByTarget.get(a.tagId()) || [];
          const bPointers = pointersByTarget.get(b.tagId()) || [];
          const aMaxTime = Math.max(...aPointers.map((p) => p.created_at || 0), 0);
          const bMaxTime = Math.max(...bPointers.map((p) => p.created_at || 0), 0);
          return bMaxTime - aMaxTime;
        });
        break;
      case "unique-authors":
        events.sort((a, b) => {
          const aPointers = pointersByTarget.get(a.tagId()) || [];
          const bPointers = pointersByTarget.get(b.tagId()) || [];
          const aUniqueAuthors = new Set(aPointers.map((p) => p.pubkey)).size;
          const bUniqueAuthors = new Set(bPointers.map((p) => p.pubkey)).size;
          return bUniqueAuthors - aUniqueAuthors;
        });
        break;
    }
    _events = events;
    _pointedBy = new Map(pointersByTarget);
  }
  function start() {
    if (subscription) return;
    subscription = ndk2.subscribe(currentFilters, {
      ...currentNdkOpts,
      closeOnEose: false,
      onEvents: (cachedEvents) => {
        handlePointerEvents(cachedEvents);
      },
      onEvent: (event) => {
        handlePointerEvent(event);
      },
      onEose: () => {
        _eosed = true;
      }
    });
  }
  function stop() {
    subscription?.stop();
    subscription = void 0;
  }
  function clear() {
    targetEventMap.clear();
    pointersByTarget.clear();
    _events = [];
    _pointedBy = /* @__PURE__ */ new Map();
    _eosed = false;
  }
  return {
    get events() {
      return _events;
    },
    get count() {
      return _events.length;
    },
    get eosed() {
      return _eosed;
    },
    get pointedBy() {
      return _pointedBy;
    },
    eventsTagging(event) {
      return _pointedBy.get(event.tagId()) || [];
    },
    start,
    stop,
    clear
  };
}
function validateNip57Zap(zapEvent, target) {
  if (zapEvent.kind !== NDKKind.Zap)
    return false;
  const invoice = zapInvoiceFromEvent(zapEvent);
  if (!invoice)
    return false;
  if (target) {
    if (target instanceof NDKEvent) {
      if (invoice.zappedEvent !== target.id && invoice.zappedEvent !== target.tagId()) {
        return false;
      }
    } else {
      if (invoice.zapped !== target.pubkey) {
        return false;
      }
    }
  }
  return true;
}
function validateNip61Zap(zapEvent, target) {
  if (zapEvent.kind !== NDKKind.Nutzap)
    return false;
  const nutzap = NDKNutzap.from(zapEvent);
  if (!nutzap)
    return false;
  if (!nutzap.isValid)
    return false;
  if (target) {
    if (target instanceof NDKEvent) {
      const eTag = nutzap.tagValue("e");
      const aTag = nutzap.tagValue("a");
      if (eTag !== target.id && aTag !== target.tagId()) {
        return false;
      }
    } else {
      if (nutzap.recipientPubkey !== target.pubkey) {
        return false;
      }
    }
  }
  return true;
}
function validateZap(zapEvent, target) {
  if (zapEvent.kind === NDKKind.Zap) {
    return validateNip57Zap(zapEvent, target);
  } else if (zapEvent.kind === NDKKind.Nutzap) {
    return validateNip61Zap(zapEvent, target);
  }
  return false;
}
function getZapAmount(zapEvent) {
  if (zapEvent.kind === NDKKind.Zap) {
    const invoice = zapInvoiceFromEvent(zapEvent);
    if (!invoice)
      return 0;
    return Math.floor(invoice.amount / 1e3);
  } else if (zapEvent.kind === NDKKind.Nutzap) {
    const nutzap = NDKNutzap.from(zapEvent);
    if (!nutzap)
      return 0;
    return nutzap.amount;
  }
  return 0;
}
function getZapSender(zapEvent) {
  if (!zapEvent.ndk)
    return void 0;
  if (zapEvent.kind === NDKKind.Zap) {
    const invoice = zapInvoiceFromEvent(zapEvent);
    if (!invoice)
      return void 0;
    return zapEvent.ndk.getUser({ pubkey: invoice.zappee });
  } else if (zapEvent.kind === NDKKind.Nutzap) {
    const nutzap = NDKNutzap.from(zapEvent);
    if (!nutzap)
      return void 0;
    return nutzap.sender;
  }
  return void 0;
}
function hasZappedBy(zaps, pubkey) {
  return zaps.some((zap) => {
    const sender = getZapSender(zap);
    return sender?.pubkey === pubkey;
  });
}
function createZapSubscription(ndk2, config) {
  validateCallback(config, "$zaps", "config");
  let _events = [];
  let _eosed = false;
  const eventMap = /* @__PURE__ */ new Map();
  let subscription;
  const derivedConfig = config();
  const filter = (() => {
    const cfg = derivedConfig;
    if (!cfg) return void 0;
    const { target, method, limit } = cfg;
    let kinds;
    if (method === "nip57") {
      kinds = [NDKKind.Zap];
    } else if (method === "nip61") {
      kinds = [NDKKind.Nutzap];
    } else {
      kinds = [NDKKind.Zap, NDKKind.Nutzap];
    }
    const targetFilter = target.filter();
    return { ...targetFilter, kinds, limit };
  })();
  function handleEvent(event) {
    const key = event.deduplicationKey();
    if (eventMap.has(key)) {
      const existing = eventMap.get(key);
      if (existing) {
        const existingTime = existing.created_at || 0;
        const newTime = event.created_at || 0;
        if (existingTime >= newTime) {
          return;
        }
      }
    }
    eventMap.set(key, event);
    updateEvents();
  }
  function handleEvents(events) {
    for (const event of events) {
      const key = event.deduplicationKey();
      if (!eventMap.has(key)) {
        eventMap.set(key, event);
      } else {
        const existing = eventMap.get(key);
        if (existing) {
          const existingTime = existing.created_at || 0;
          const newTime = event.created_at || 0;
          if (newTime > existingTime) {
            eventMap.set(key, event);
          }
        }
      }
    }
    updateEvents();
  }
  function updateEvents() {
    let events = Array.from(eventMap.values());
    events.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
    _events = events;
  }
  function start() {
    if (subscription || !filter) return;
    subscription = ndk2.subscribe(filter, {
      closeOnEose: false,
      onEvent: handleEvent,
      onEvents: handleEvents,
      onEose: () => {
        _eosed = true;
      }
    });
  }
  function stop() {
    subscription?.stop();
    subscription = void 0;
  }
  function clear() {
    eventMap.clear();
    _events = [];
    _eosed = false;
  }
  const processedEvents = (() => {
    const cfg = derivedConfig;
    if (!cfg) return [];
    let events = _events;
    if (cfg.validated) {
      events = events.filter((e) => validateZap(e, cfg.target));
    }
    return events;
  })();
  const lightningZaps = (() => {
    return processedEvents.filter((e) => e.kind === NDKKind.Zap);
  })();
  const nutzaps = (() => {
    return processedEvents.filter((e) => e.kind === NDKKind.Nutzap).map((e) => NDKNutzap.from(e)).filter((n) => n !== void 0);
  })();
  const totalAmount = (() => {
    return processedEvents.reduce((sum, event) => sum + getZapAmount(event), 0);
  })();
  return {
    get events() {
      return processedEvents;
    },
    get count() {
      return processedEvents.length;
    },
    get totalAmount() {
      return totalAmount;
    },
    get eosed() {
      return _eosed;
    },
    get lightningZaps() {
      return lightningZaps;
    },
    get nutzaps() {
      return nutzaps;
    },
    stop,
    start,
    clear
  };
}
class ReactiveFollows extends Array {
  #sessions;
  constructor(follows, sessions) {
    super(...follows);
    this.#sessions = sessions;
  }
  /**
   * Add one or more follows (publishes once to network)
   * @param pubkeys - Single pubkey or array of pubkeys to follow
   * @returns true if any new follows were added, false if all were already followed
   */
  async add(pubkeys) {
    const user = this.#sessions?.currentUser;
    if (!user) throw new Error("No active user");
    const followSet = this.#sessions?.current?.followSet ?? /* @__PURE__ */ new Set();
    return await user.follow(pubkeys, followSet);
  }
  /**
   * Remove one or more follows (publishes once to network)
   * @param pubkeys - Single pubkey or array of pubkeys to unfollow
   * @returns Set of relays where published, or false if none were following
   */
  async remove(pubkeys) {
    const user = this.#sessions?.currentUser;
    if (!user) throw new Error("No active user");
    const followSet = this.#sessions?.current?.followSet ?? /* @__PURE__ */ new Set();
    return await user.unfollow(pubkeys, followSet);
  }
  /**
   * Check if a pubkey is followed (O(1) lookup)
   * @param pubkey - Pubkey to check
   * @returns true if the pubkey is followed, false otherwise
   */
  has(pubkey) {
    return this.#sessions?.follows?.has(pubkey) ?? false;
  }
}
class NDKSvelte extends NDK {
  // Reactive stores with $ prefix (Svelte convention for reactive state)
  $sessions;
  $wot;
  $wallet;
  $pool;
  // Private reactive state for active user
  #activeUser = void 0;
  constructor(params = {}) {
    super(params);
    this.aiGuardrails?.register("ndkSvelte", { constructing });
    this.aiGuardrails?.register("ndkSvelteSubscribe", { subscribing });
    this.aiGuardrails?.ndkSvelte?.constructing(params);
    if (params.session) {
      const sessionOptions = params.session === true ? {
        storage: new LocalStorage(),
        autoSave: true,
        fetches: { follows: true, mutes: true, wallet: true }
      } : {
        storage: new LocalStorage(),
        autoSave: true,
        ...params.session
      };
      const sessionManager = new NDKSessionManager(this, sessionOptions);
      this.$wallet = createReactiveWallet(this, sessionManager);
      this.$sessions = createReactiveSessions(sessionManager);
      this.$wot = createReactiveWoT(this, this.$sessions);
    }
    this.$pool = createReactivePool(this);
    this.on("activeUser:change", (user) => {
      this.#activeUser = user;
    });
    this.#activeUser = this.activeUser;
  }
  /**
   * Create a reactive subscription
   *
   * Returns a reactive Subscription object that updates automatically as events arrive.
   * The $ prefix indicates this returns reactive Svelte state.
   * For callback-based subscriptions, use the base subscribe() method.
   *
   * All config properties are reactive - subscription automatically restarts when filters
   * or NDK options (relayUrls, pool, etc.) change, and re-processes events when wrapper
   * options (wot, etc.) change.
   *
   * @example
   * ```ts
   * // Shorthand: Return filter directly (automatically wrapped)
   * const notes = ndk.$subscribe(() => ({ kinds: [1], limit: 50 }));
   *
   * // Reactive access in templates
   * {#each notes.events as note}
   *   <div>{note.content}</div>
   * {/each}
   * ```
   *
   * @example
   * ```ts
   * // Shorthand: Return array of filters (automatically wrapped)
   * const events = ndk.$subscribe(() => [
   *   { kinds: [1], authors: [pubkey1] },
   *   { kinds: [1], authors: [pubkey2] }
   * ]);
   * ```
   *
   * @example
   * ```ts
   * // Full config - use when you need additional options
   * let kind = $state(1);
   * let selectedRelays = $state(['wss://relay.damus.io']);
   *
   * const notes = ndk.$subscribe(() => ({
   *   filters: [{ kinds: [kind], limit: 50 }],
   *   relayUrls: selectedRelays,
   *   wot: { minScore: 0.5 }
   * }));
   * ```
   *
   * @example
   * ```ts
   * // Conditional subscription - return undefined to prevent subscription
   * let selectedRelay = $state<string | undefined>();
   * let isEnabled = $state(false);
   *
   * const notes = ndk.$subscribe(() => {
   *   // No subscription until both conditions are met
   *   if (!selectedRelay || !isEnabled) return undefined;
   *
   *   return {
   *     filters: [{ kinds: [1], limit: 20 }],
   *     relayUrls: [selectedRelay]
   *   };
   * });
   * ```
   */
  $subscribe(config) {
    this.aiGuardrails?.ndkSvelteSubscribe?.subscribing(config);
    return createSubscription(this, config);
  }
  /**
   * Create a reactive meta-subscription
   *
   * Returns events pointed to by e-tags and a-tags, rather than the matching events themselves.
   * Perfect for showing reposted content, commented articles, zapped notes, etc.
   *
   * @example
   * ```ts
   * // Show content reposted by people you follow
   * const feed = ndk.$metaSubscribe(() => ({
   *   filters: [{ kinds: [6, 16], authors: $follows }],
   *   sort: 'tag-time'
   * }));
   *
   * {#each feed.events as event}
   *   {@const pointers = feed.eventsTagging(event)}
   *   <Note {event}>
   *     <span>Reposted by {pointers.length} people</span>
   *   </Note>
   * {/each}
   * ```
   *
   * @example
   * ```ts
   * // Show articles commented on by your follows
   * const articles = ndk.$metaSubscribe(() => ({
   *   filters: [{ kinds: [1111], "#K": ["30023"], authors: $follows }],
   *   sort: 'count'
   * }));
   *
   * {#each articles.events as article}
   *   {@const comments = articles.eventsTagging(article)}
   *   <ArticleCard {article}>
   *     <span>{comments.length} comments</span>
   *   </ArticleCard>
   * {/each}
   * ```
   */
  $metaSubscribe(config) {
    return createMetaSubscription(this, config);
  }
  /**
   * Reactively fetch multiple events
   *
   * Returns a reactive array of events that updates when the filters change.
   * Supports all NDKSubscriptionOptions (relayUrls, pool, closeOnEose, groupable, cacheUsage, etc.)
   *
   * All config properties are reactive - fetch automatically re-runs when filters
   * or NDK options (relayUrls, pool, etc.) change.
   *
   * @param config - Callback returning config or filters or undefined
   *
   * @example
   * ```ts
   * // Shorthand: Return filter directly (automatically wrapped)
   * const pubkey = $state('hex...');
   * const events = ndk.$fetchEvents(() => ({
   *   kinds: [1],
   *   authors: [pubkey],
   *   limit: 10
   * }));
   *
   * // In template
   * {#each events as event}
   *   <div>{event.content}</div>
   * {/each}
   * ```
   *
   * @example
   * ```ts
   * // Shorthand: Return array of filters (automatically wrapped)
   * const events = ndk.$fetchEvents(() => [
   *   { kinds: [1], authors: [pubkey1] },
   *   { kinds: [1], authors: [pubkey2] }
   * ]);
   * ```
   *
   * @example
   * ```ts
   * import type { NDKArticle } from "@nostr-dev-kit/ndk";
   *
   * // Full config - use when you need additional options
   * let selectedRelays = $state(['wss://relay.damus.io']);
   *
   * const articles = ndk.$fetchEvents<NDKArticle>(() => ({
   *   filters: [{ kinds: [30023], limit: 10 }],
   *   relayUrls: selectedRelays,
   *   closeOnEose: true
   * }));
   *
   * // In template
   * {#each articles as article}
   *   <h2>{article.title}</h2>
   *   <div>{article.content}</div>
   * {/each}
   * ```
   *
   * @example
   * ```ts
   * // Conditional fetch - return undefined to prevent fetching
   * const events = ndk.$fetchEvents(() => {
   *   if (!shouldFetch) return undefined;
   *   return {
   *     filters: [{ kinds: [1], authors: [pubkey] }],
   *     relayUrls: selectedRelays
   *   };
   * });
   * ```
   */
  $fetchEvents(config) {
    return createFetchEvents(this, config);
  }
  /**
   * Reactively access the current active user
   *
   * Returns a reactive value that updates when the active user changes.
   * The active user is set when:
   * - A signer is assigned to NDK
   * - A read-only user session is created (via sessions manager)
   * - activeUser is set directly on the NDK instance
   *
   * @example
   * ```ts
   * const currentUser = ndk.$currentUser;
   *
   * // In template
   * {#if currentUser}
   *   <div>Logged in as {currentUser.npub}</div>
   * {/if}
   * ```
   */
  get $currentUser() {
    return this.#activeUser;
  }
  /**
   * Alias for $currentUser
   *
   * @example
   * ```ts
   * const user = ndk.$activeUser;
   * ```
   */
  get $activeUser() {
    return this.#activeUser;
  }
  /**
   * Reactively access the current active user's pubkey
   *
   * Returns a reactive value that updates when the active user changes.
   * Returns undefined if no user is active.
   *
   * @example
   * ```ts
   * const pubkey = ndk.$currentPubkey;
   *
   * // In template
   * {#if pubkey}
   *   <div>Pubkey: {pubkey}</div>
   * {/if}
   * ```
   */
  get $currentPubkey() {
    return this.#activeUser?.pubkey;
  }
  /**
   * Reactively access the current active session
   *
   * Returns a reactive value that updates when the active session changes.
   * Returns undefined if sessions are not enabled or no session is active.
   *
   * @example
   * ```ts
   * const currentSession = ndk.$currentSession;
   *
   * // In template
   * {#if currentSession}
   *   <div>Session: {currentSession.pubkey}</div>
   * {/if}
   * ```
   */
  get $currentSession() {
    return this.$sessions?.current;
  }
  /**
   * Reactively access the current session's follow list
   *
   * Returns a reactive array (extends Array) of hex pubkeys that the current user follows.
   * Returns an empty array if sessions are not enabled or no session is active.
   * Automatically updates when the session's follow list changes.
   *
   * Includes add(), remove(), and has() methods to work with the follow list.
   *
   * **Difference from `ndk.$sessions.follows`:**
   * - `ndk.$follows` - Reactive array (best for templates and subscriptions)
   * - `ndk.$sessions.follows` - FollowsProxy with Set-like interface (best for Set operations)
   *
   * Both update reactively and both have `add()`/`remove()`/`has()` methods.
   *
   * @example
   * ```ts
   * // Iterate over follows in a template
   * {#each ndk.$follows as pubkey}
   *   <UserCard {pubkey} />
   * {/each}
   * ```
   *
   * @example
   * ```ts
   * // Use directly in subscriptions (as an array)
   * const feed = ndk.$subscribe(() => ({
   *   filters: [{ kinds: [1], authors: ndk.$follows, limit: 50 }]
   * }));
   * ```
   *
   * @example
   * ```ts
   * // Check if following (O(1) lookup)
   * const isFollowing = ndk.$follows.has(pubkey);
   * ```
   *
   * @example
   * ```ts
   * // Check count
   * const followCount = ndk.$follows.length;
   * ```
   *
   * @example
   * ```ts
   * // Add/remove follows (publishes to network)
   * await ndk.$follows.add(pubkey);
   * await ndk.$follows.remove(pubkey);
   * ```
   *
   * @example
   * ```ts
   * // Array methods work
   * const firstTen = ndk.$follows.slice(0, 10);
   * const filtered = ndk.$follows.filter(pk => someCondition(pk));
   * ```
   */
  get $follows() {
    const followsArray = Array.from(this.$sessions?.follows ?? []);
    return new ReactiveFollows(followsArray, this.$sessions);
  }
  /**
   * Access mutes with mute/unmute methods
   *
   * Returns a MutesProxy that works like a Set but has async mute/unmute methods
   * that publish changes to the network.
   *
   * @example
   * ```ts
   * // Use as a Set
   * const isMuted = ndk.$mutes.has(pubkey);
   * const count = ndk.$mutes.size;
   * for (const pubkey of ndk.$mutes) { ... }
   *
   * // Mute/unmute users (publishes to network)
   * await ndk.$mutes.mute(pubkey);
   * await ndk.$mutes.unmute(pubkey);
   * await ndk.$mutes.toggle(pubkey);
   * ```
   */
  get $mutes() {
    return this.$sessions?.mutes;
  }
  /**
   * Create a reactive zap subscription
   *
   * Returns an object with reactive getters for zap events on a target (event or user).
   * Supports both NIP-57 (kind 9735) and NIP-61 (kind 9321) zaps.
   *
   * @example
   * ```svelte
   * <script lang="ts">
   *   // Subscribe to all zaps for an event
   *   const zaps = ndk.$zaps(() => ({ target: event }));
   * <\/script>
   *
   * <div>
   *   {zaps.totalAmount} sats from {zaps.count} zaps
   * </div>
   *
   * {#each zaps.events as zap}
   *   <div>{getZapAmount(zap)} sats</div>
   * {/each}
   * ```
   *
   * @example
   * ```svelte
   * <script lang="ts">
   *   // Only validated NIP-57 lightning zaps
   *   const lightningZaps = ndk.$zaps(() => ({
   *     target: event,
   *     validated: true,
   *     method: 'nip57'
   *   }));
   * <\/script>
   *
   * {#each lightningZaps.events as zap}
   *   <div>{getZapSender(zap).npub()} zapped {getZapAmount(zap)} sats</div>
   * {/each}
   * ```
   *
   * @example
   * ```svelte
   * <script lang="ts">
   *   // Conditional subscription
   *   let showZaps = $state(false);
   *
   *   const zaps = ndk.$zaps(() => {
   *     if (!showZaps) return undefined;
   *     return { target: event, validated: true };
   *   });
   * <\/script>
   * ```
   */
  $zaps(config) {
    return createZapSubscription(this, config);
  }
  /**
   * Get the session event for a specific NDK event class
   *
   * Returns the session event matching the kind of the provided class.
   * The event is already wrapped in the appropriate class by the session manager.
   * Requires sessions to be enabled.
   *
   * **Important:** This method is read-only and will NOT automatically start monitoring.
   * If the event kind is not being monitored, it returns undefined.
   * To start monitoring an event kind, explicitly call `ndk.$sessions.addMonitor([EventClass])`.
   *
   * @param eventClass - An NDK event class with a static `kinds` property and `from` method
   * @param options - Optional configuration
   * @param options.create - If true, creates a new instance if none exists
   * @returns The session event for that kind, or undefined if not found/monitored or sessions not enabled
   *
   * @example
   * ```ts
   * import { NDKRelayFeedList } from "@nostr-dev-kit/ndk";
   *
   * // First, ensure the event type is being monitored
   * ndk.$sessions?.addMonitor([NDKRelayFeedList]);
   *
   * // Then access it (read-only)
   * const relayFeedList = ndk.$sessionEvent(NDKRelayFeedList);
   * if (relayFeedList) {
   *   console.log(relayFeedList.relayUrls);
   * }
   * ```
   *
   * @example
   * ```ts
   * import { NDKCashuMintAnnouncement } from "@nostr-dev-kit/ndk";
   *
   * // Returns undefined if not being monitored - does NOT auto-subscribe
   * const walletEvent = ndk.$sessionEvent(NDKCashuMintAnnouncement);
   * if (!walletEvent) {
   *   console.warn("Wallet event not monitored. Call ndk.$sessions.addMonitor([NDKCashuMintAnnouncement])");
   * }
   * ```
   *
   * @example
   * ```ts
   * import { NDKInterestList } from "@nostr-dev-kit/ndk";
   *
   * // Create a new instance if none exists
   * const interestList = ndk.$sessionEvent(NDKInterestList, { create: true });
   * // interestList is guaranteed to exist (never undefined)
   * ```
   */
  $sessionEvent(eventClass, options) {
    if (!this.$sessions) return void 0;
    const kind = eventClass.kinds[0];
    const existing = this.$sessions.getSessionEvent(kind);
    if (existing) {
      return eventClass.from(existing);
    }
    if (options?.create) {
      const newEvent = new eventClass(this);
      if (this.$currentUser) {
        newEvent.pubkey = this.$currentUser.pubkey;
      }
      return newEvent;
    }
    return void 0;
  }
}
function createNDK(params = {}) {
  return new NDKSvelte(params);
}
class RelayAuthModal {
  show = false;
  request = null;
  confirm() {
    if (this.request) {
      this.request.onConfirm();
      this.show = false;
      this.request = null;
    }
  }
  reject() {
    if (this.request) {
      this.request.onReject();
      this.show = false;
      this.request = null;
    }
  }
}
const relayAuthModal = new RelayAuthModal();
const AGORA_RELAYS = [
  "wss://ve.agorawlc.com/",
  "wss://ni.agorawlc.com/",
  "wss://zw.agorawlc.com/"
];
const WALLET_DEFAULT_RELAYS = [
  "wss://relay.primal.net/",
  "wss://relay.nostr.band/"
];
const AGORA_LANGUAGE_MAP = {
  "wss://ve.agorawlc.com/": "es",
  // Venezuela - Spanish
  "wss://ni.agorawlc.com/": "es",
  // Nicaragua - Spanish
  "wss://zw.agorawlc.com/": "en"
  // Zimbabwe - English
};
function isAgoraRelay(url) {
  if (!url) return false;
  return url.includes("agorawlc.com");
}
function getRelaysToUse(selectedRelay, enabledRelays) {
  if (selectedRelay) {
    return [selectedRelay];
  }
  return [];
}
function getAgoraLanguage(relayUrl) {
  if (!relayUrl) return null;
  return AGORA_LANGUAGE_MAP[relayUrl] ?? null;
}
function applyThemeColor(color) {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-theme", color);
}
const DEFAULT_RELAYS$1 = [
  ...AGORA_RELAYS.map((url) => ({ url, read: true, write: true, enabled: true })),
  {
    url: "wss://relay.damus.io",
    read: true,
    write: true,
    enabled: true
  },
  { url: "wss://nos.lol", read: true, write: true, enabled: true },
  {
    url: "wss://relay.primal.net",
    read: true,
    write: true,
    enabled: true
  }
];
const DEFAULT_SETTINGS = {
  relays: DEFAULT_RELAYS$1,
  selectedRelay: AGORA_RELAYS[0],
  theme: "system",
  themeColor: "orange",
  language: "en",
  notifications: { enabled: true, mentions: true, replies: true, zaps: true },
  privacy: { hideReadReceipts: false, hideTypingIndicator: false },
  zap: { defaultAmount: 21 },
  wallet: { npubCashEnabled: false },
  relayAuth: { mode: "always" }
};
function loadSettings() {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem("voces-settings");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.relays) {
        parsed.relays = parsed.relays.map((r) => ({
          ...r,
          url: r.url.replace(/^wss:\/\/ws:\/\//, "ws://").replace(/^wss:\/\/wss:\/\//, "wss://")
        }));
      }
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.error("Failed to load settings:", e);
  }
  return DEFAULT_SETTINGS;
}
function saveSettings(settings2) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("voces-settings", JSON.stringify(settings2));
  } catch (e) {
    console.error("Failed to save settings:", e);
  }
}
class SettingsStore {
  state = loadSettings();
  get relays() {
    return this.state.relays;
  }
  get selectedRelay() {
    return this.state.selectedRelay;
  }
  get theme() {
    return this.state.theme;
  }
  get themeColor() {
    return this.state.themeColor;
  }
  get language() {
    return this.state.language;
  }
  get notifications() {
    return this.state.notifications;
  }
  get privacy() {
    return this.state.privacy;
  }
  get zap() {
    return this.state.zap;
  }
  get wallet() {
    return this.state.wallet;
  }
  get relayAuth() {
    return this.state.relayAuth;
  }
  addRelay(relay) {
    this.state.relays = [...this.state.relays, relay];
    saveSettings(this.state);
  }
  removeRelay(url) {
    this.state.relays = this.state.relays.filter((r) => r.url !== url);
    saveSettings(this.state);
  }
  updateRelay(url, updates) {
    this.state.relays = this.state.relays.map((r) => r.url === url ? { ...r, ...updates } : r);
    saveSettings(this.state);
  }
  toggleRelay(url) {
    this.state.relays = this.state.relays.map((r) => r.url === url ? { ...r, enabled: !r.enabled } : r);
    saveSettings(this.state);
  }
  setRelays(relays) {
    this.state.relays = relays;
    saveSettings(this.state);
  }
  setSelectedRelay(url) {
    this.state.selectedRelay = url;
    saveSettings(this.state);
  }
  setTheme(theme) {
    this.state.theme = theme;
    saveSettings(this.state);
    if (typeof window !== "undefined") {
      const isDark = theme === "dark" || theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    }
  }
  setThemeColor(color) {
    this.state.themeColor = color;
    saveSettings(this.state);
    applyThemeColor(color);
  }
  setLanguage(language) {
    this.state.language = language;
    saveSettings(this.state);
  }
  updateNotifications(settings2) {
    this.state.notifications = { ...this.state.notifications, ...settings2 };
    saveSettings(this.state);
  }
  updatePrivacy(settings2) {
    this.state.privacy = { ...this.state.privacy, ...settings2 };
    saveSettings(this.state);
  }
  updateZap(settings2) {
    this.state.zap = { ...this.state.zap, ...settings2 };
    saveSettings(this.state);
  }
  updateWallet(settings2) {
    this.state.wallet = { ...this.state.wallet, ...settings2 };
    saveSettings(this.state);
  }
  updateRelayAuth(settings2) {
    this.state.relayAuth = { ...this.state.relayAuth, ...settings2 };
    saveSettings(this.state);
  }
  save() {
    saveSettings(this.state);
  }
  resetToDefaults() {
    this.state = { ...DEFAULT_SETTINGS };
    saveSettings(this.state);
  }
}
const settings = new SettingsStore();
const debug = createDebug("agora:relay:auth");
const AUTH_DECISIONS_KEY = "agora:relay-auth-decisions";
const authDecisionsCache = /* @__PURE__ */ new Map();
function loadAuthDecisions() {
  try {
    const stored = localStorage.getItem(AUTH_DECISIONS_KEY);
    if (stored) {
      const decisions = JSON.parse(stored);
      const map = /* @__PURE__ */ new Map();
      decisions.forEach((d) => map.set(d.relay, d.accepted));
      return map;
    }
  } catch (error) {
    debug("Failed to load auth decisions:", error);
  }
  return /* @__PURE__ */ new Map();
}
function saveAuthDecisions(decisions) {
  try {
    const array = Array.from(decisions.entries()).map(([relay, accepted]) => ({ relay, accepted, timestamp: Date.now() }));
    localStorage.setItem(AUTH_DECISIONS_KEY, JSON.stringify(array));
  } catch (error) {
    debug("Failed to save auth decisions:", error);
  }
}
if (typeof window !== "undefined") {
  const stored = loadAuthDecisions();
  stored.forEach((accepted, relay) => authDecisionsCache.set(relay, accepted));
}
async function promptUserForAuth(relay) {
  return new Promise((resolve) => {
    relayAuthModal.show = true;
    relayAuthModal.request = {
      relayUrl: relay.url,
      onConfirm: () => {
        authDecisionsCache.set(relay.url, true);
        saveAuthDecisions(authDecisionsCache);
        resolve(true);
      },
      onReject: () => {
        authDecisionsCache.set(relay.url, false);
        saveAuthDecisions(authDecisionsCache);
        resolve(false);
      }
    };
  });
}
function getStoredDecision(relayUrl) {
  return authDecisionsCache.get(relayUrl);
}
async function createAndSignAuthEvent(ndk2, relay, challenge) {
  const event = new NDKEvent(ndk2);
  event.kind = NDKKind.ClientAuth;
  event.tags = [["relay", relay.url], ["challenge", challenge]];
  const signer = ndk2?.signer;
  if (signer) {
    try {
      await event.sign(signer);
      debug(`Successfully signed auth event for ${relay.url}`);
      return event;
    } catch (e) {
      debug("Failed to sign auth event:", e);
      return false;
    }
  } else {
    debug(`No signer available for ${relay.url}, waiting for signer...`);
    return new Promise((resolve) => {
      const timeout = setTimeout(
        () => {
          debug(`Signer timeout for ${relay.url}, authentication failed`);
          resolve(false);
        },
        5e3
      );
      const handleSignerReady = async (readySigner) => {
        clearTimeout(timeout);
        try {
          await event.sign(readySigner);
          debug(`Successfully signed auth event for ${relay.url} after waiting`);
          resolve(event);
        } catch (e) {
          debug("Failed to sign auth event after waiting:", e);
          resolve(false);
        }
      };
      ndk2?.once("signer:ready", handleSignerReady);
    });
  }
}
function createAuthPolicyWithConfirmation({ ndk: ndk2 } = {}) {
  debug("Creating auth policy with user confirmation");
  return async (relay, challenge) => {
    debug(`Relay ${relay.url} requested authentication`);
    const authMode = settings.relayAuth.mode;
    if (authMode === "always") {
      debug(`Auto-authenticating to ${relay.url} (mode: always)`);
      return createAndSignAuthEvent(ndk2, relay, challenge);
    }
    if (isAgoraRelay(relay.url)) {
      debug(`Auto-authenticating to Agora relay: ${relay.url}`);
      return createAndSignAuthEvent(ndk2, relay, challenge);
    }
    const storedDecision = getStoredDecision(relay.url);
    if (storedDecision !== void 0) {
      debug(`Using stored decision for ${relay.url}: ${storedDecision ? "accepted" : "rejected"}`);
      if (!storedDecision) {
        return false;
      }
      return createAndSignAuthEvent(ndk2, relay, challenge);
    }
    debug(`Prompting user for auth decision for ${relay.url}`);
    const userAccepted = await promptUserForAuth(relay);
    if (!userAccepted) {
      debug(`User rejected authentication for ${relay.url}`);
      return false;
    }
    debug(`User accepted authentication for ${relay.url}`);
    return createAndSignAuthEvent(ndk2, relay, challenge);
  };
}
function createHashtagInterestsStore(ndk2) {
  const interestsEvent = ndk2.$sessions?.getSessionEvent(10015);
  const interests = (() => {
    if (!interestsEvent) return [];
    return interestsEvent.tags.filter((tag) => tag[0] === "t" && tag[1]).map((tag) => tag[1].toLowerCase());
  })();
  async function addHashtag(hashtag) {
    if (!ndk2.$currentUser) throw new Error("No user logged in");
    const normalizedHashtag = hashtag.toLowerCase();
    if (interests.includes(normalizedHashtag)) return;
    const existingEvent = interestsEvent;
    const event = new NDKEvent(ndk2);
    event.kind = NDKKind.InterestList;
    if (existingEvent) {
      event.tags = [
        ...existingEvent.tags.filter((tag) => tag[0] === "t"),
        ["t", normalizedHashtag]
      ];
    } else {
      event.tags = [["t", normalizedHashtag]];
    }
    event.content = existingEvent?.content || "";
    await event.publish();
  }
  async function removeHashtag(hashtag) {
    if (!ndk2.$currentUser) throw new Error("No user logged in");
    const normalizedHashtag = hashtag.toLowerCase();
    if (!interests.includes(normalizedHashtag)) return;
    const existingEvent = interestsEvent;
    if (!existingEvent) return;
    const event = new NDKEvent(ndk2);
    event.kind = NDKKind.InterestList;
    event.tags = existingEvent.tags.filter((tag) => !(tag[0] === "t" && tag[1]?.toLowerCase() === normalizedHashtag));
    event.content = existingEvent.content || "";
    await event.publish();
  }
  async function toggleHashtag(hashtag) {
    const normalizedHashtag = hashtag.toLowerCase();
    if (interests.includes(normalizedHashtag)) {
      await removeHashtag(normalizedHashtag);
    } else {
      await addHashtag(normalizedHashtag);
    }
  }
  return {
    get interests() {
      return interests;
    },
    addHashtag,
    removeHashtag,
    toggleHashtag
  };
}
class RelayFeedsStore {
  constructor(ndk2) {
    this.ndk = ndk2;
  }
  get list() {
    const relayFeedEvent = this.ndk.$sessions?.getSessionEvent(10012);
    if (!relayFeedEvent) return null;
    return relayFeedEvent;
  }
  get relays() {
    if (!this.list) return [];
    const relays = [];
    for (const tag of this.list.tags) {
      if (tag[0] === "relay" && tag[1]) {
        relays.push(tag[1]);
      }
    }
    return relays;
  }
  get relaySets() {
    if (!this.list) return [];
    const sets = [];
    for (const tag of this.list.tags) {
      if (tag[0] === "a" && tag[1]) {
        sets.push(tag[1]);
      }
    }
    return sets;
  }
  isFavorite(relayUrl) {
    return this.relays.includes(relayUrl);
  }
  async addRelay(relayUrl) {
    let list = this.list;
    if (!list) {
      list = new NDKRelayFeedList(this.ndk);
    }
    if (this.isFavorite(relayUrl)) return;
    list.tags.push(["relay", relayUrl]);
    await list.publish();
  }
  async removeRelay(relayUrl) {
    const list = this.list;
    if (!list) return;
    list.tags = list.tags.filter((tag) => {
      if (tag[0] === "relay" && tag[1] === relayUrl) return false;
      return true;
    });
    await list.publish();
  }
  async addRelaySet(relaySetNaddr) {
    let list = this.list;
    if (!list) {
      list = new NDKRelayFeedList(this.ndk);
    }
    const existing = this.relaySets.includes(relaySetNaddr);
    if (existing) return;
    list.tags.push(["a", relaySetNaddr]);
    await list.publish();
  }
  async removeRelaySet(relaySetNaddr) {
    const list = this.list;
    if (!list) return;
    list.tags = list.tags.filter((tag) => {
      if (tag[0] === "a" && tag[1] === relaySetNaddr) return false;
      return true;
    });
    await list.publish();
  }
}
function createRelayFeedsStore(ndk2) {
  return new RelayFeedsStore(ndk2);
}
const CACHE_WORKER_VERSION = "1.0.0-beta.50";
const DEFAULT_RELAYS = ["wss://relay.primal.net", "wss://relay.nostr.band"];
const cacheAdapter = new NDKCacheSqliteWasm({
  dbName: "agora",
  workerUrl: `/worker-${CACHE_WORKER_VERSION}.js`,
  wasmUrl: "/sql-wasm.wasm"
});
const cacheInitialized = cacheAdapter?.initializeAsync();
let sigVerifyWorker;
const ndk = createNDK({
  explicitRelayUrls: DEFAULT_RELAYS,
  autoConnectUserRelays: true,
  cacheAdapter,
  signatureVerificationWorker: sigVerifyWorker,
  initialValidationRatio: 1,
  lowestValidationRatio: 0.1,
  aiGuardrails: false,
  futureTimestampGrace: 30,
  clientName: "Agora",
  session: {
    storage: new LocalStorage(),
    autoSave: true,
    fetches: {
      follows: true,
      mutes: true,
      wallet: true,
      relayList: true,
      monitor: [NDKBlossomList, NDKInterestList, NDKRelayFeedList]
    }
  }
});
{
  ndk.relayAuthDefaultPolicy = createAuthPolicyWithConfirmation({ ndk });
}
(async () => {
  try {
    console.log("🔄 Initializing cache...");
    await cacheInitialized;
    console.log("✅ Cache initialized.");
    const SigVerifyWorker = (await import('./sig-verify.worker-3P7QssVw.js')).default;
    sigVerifyWorker = new SigVerifyWorker();
    ndk.signatureVerificationWorker = sigVerifyWorker;
    ndk.connect();
  } catch (error) {
    console.error("❌ Failed to initialize cache:", error);
  }
})();
const hashtagInterests = createHashtagInterestsStore(ndk);
const relayFeeds = createRelayFeedsStore(ndk);

export { AGORA_RELAYS as A, WALLET_DEFAULT_RELAYS as W, relayFeeds as a, hashtagInterests as b, getDefaultExportFromCjs as c, createDebug as d, commonjsGlobal as e, getAgoraLanguage as f, getRelaysToUse as g, hasZappedBy as h, isAgoraRelay as i, ndk as n, relayAuthModal as r, settings as s };
//# sourceMappingURL=ndk.svelte-BfhDBrJw.js.map
