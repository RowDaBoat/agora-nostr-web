const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["icons/apple-icon-180.png","icons/apple-splash-1125-2436.png","icons/apple-splash-1136-640.png","icons/apple-splash-1170-2532.png","icons/apple-splash-1179-2556.png","icons/apple-splash-1206-2622.png","icons/apple-splash-1242-2208.png","icons/apple-splash-1242-2688.png","icons/apple-splash-1260-2736.png","icons/apple-splash-1284-2778.png","icons/apple-splash-1290-2796.png","icons/apple-splash-1320-2868.png","icons/apple-splash-1334-750.png","icons/apple-splash-1488-2266.png","icons/apple-splash-1536-2048.png","icons/apple-splash-1620-2160.png","icons/apple-splash-1640-2360.png","icons/apple-splash-1668-2224.png","icons/apple-splash-1668-2388.png","icons/apple-splash-1792-828.png","icons/apple-splash-2048-1536.png","icons/apple-splash-2048-2732.png","icons/apple-splash-2160-1620.png","icons/apple-splash-2208-1242.png","icons/apple-splash-2224-1668.png","icons/apple-splash-2266-1488.png","icons/apple-splash-2360-1640.png","icons/apple-splash-2388-1668.png","icons/apple-splash-2436-1125.png","icons/apple-splash-2532-1170.png","icons/apple-splash-2556-1179.png","icons/apple-splash-2622-1206.png","icons/apple-splash-2688-1242.png","icons/apple-splash-2732-2048.png","icons/apple-splash-2736-1260.png","icons/apple-splash-2778-1284.png","icons/apple-splash-2796-1290.png","icons/apple-splash-2868-1320.png","icons/apple-splash-640-1136.png","icons/apple-splash-750-1334.png","icons/apple-splash-828-1792.png","icons/manifest-icon-192.maskable.png","icons/manifest-icon-512.maskable.png","logo-icon-centered.svg","logo-icon-shape.svg","logo-icon.svg","logo-text-only.svg","logo.svg","manifest.webmanifest","sql-wasm.wasm","vite.svg","worker-1.0.0-beta.50.js","service-worker.js"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".wasm":"application/wasm",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.PfyGKhCe.js",app:"_app/immutable/entry/app.wb68e5Gm.js",imports:["_app/immutable/entry/start.PfyGKhCe.js","_app/immutable/chunks/D1jhUNbu.js","_app/immutable/chunks/-h67YDCL.js","_app/immutable/chunks/D_V6a8z3.js","_app/immutable/entry/app.wb68e5Gm.js","_app/immutable/chunks/DG6c9x1x.js","_app/immutable/chunks/-h67YDCL.js","_app/immutable/chunks/CvdcXPsy.js","_app/immutable/chunks/C52XBfTo.js","_app/immutable/chunks/ByH5JKyU.js","_app/immutable/chunks/6dG0wjw8.js","_app/immutable/chunks/CptlhHpT.js","_app/immutable/chunks/D_V6a8z3.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-C44Bq3ll.js')),
			__memo(() => import('./chunks/1-Br5pVOqt.js')),
			__memo(() => import('./chunks/2-C7AZVHe6.js')),
			__memo(() => import('./chunks/3-BaZBjrxv.js')),
			__memo(() => import('./chunks/4-FduDN7pX.js')),
			__memo(() => import('./chunks/5-BjnG2F6Q.js')),
			__memo(() => import('./chunks/6-2pSGp9Hi.js')),
			__memo(() => import('./chunks/7-M90KbVOx.js')),
			__memo(() => import('./chunks/8-DFPHZwjf.js')),
			__memo(() => import('./chunks/9-DN9RSQyM.js')),
			__memo(() => import('./chunks/10-Cz1_KDYj.js')),
			__memo(() => import('./chunks/11-BGSi0iIc.js')),
			__memo(() => import('./chunks/12-Cg4pDZoX.js')),
			__memo(() => import('./chunks/13-DnBHo-KK.js')),
			__memo(() => import('./chunks/14-HaW88MRn.js')),
			__memo(() => import('./chunks/15-DL9HrQZ5.js')),
			__memo(() => import('./chunks/16-DFOTE0u5.js')),
			__memo(() => import('./chunks/17-D1vhUL_S.js')),
			__memo(() => import('./chunks/18-CBzMfp9Y.js')),
			__memo(() => import('./chunks/19-CbI-WyiY.js')),
			__memo(() => import('./chunks/20-DNnQNDPB.js')),
			__memo(() => import('./chunks/21-Dp9bDCFx.js')),
			__memo(() => import('./chunks/22-FNyol35Y.js')),
			__memo(() => import('./chunks/23-DKk6zKEJ.js')),
			__memo(() => import('./chunks/24-BUAhB5AA.js')),
			__memo(() => import('./chunks/25-DEumLH3R.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(app)/agora/invites",
				pattern: /^\/agora\/invites\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(app)/article/[naddr]",
				pattern: /^\/article\/([^/]+?)\/?$/,
				params: [{"name":"naddr","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/compose",
				pattern: /^\/compose\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(app)/e/[nevent]",
				pattern: /^\/e\/([^/]+?)\/?$/,
				params: [{"name":"nevent","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(app)/invites",
				pattern: /^\/invites\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/i/[code]",
				pattern: /^\/i\/([^/]+?)\/?$/,
				params: [{"name":"code","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/(app)/marketplace",
				pattern: /^\/marketplace\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(app)/marketplace/[id]",
				pattern: /^\/marketplace\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(app)/messages",
				pattern: /^\/messages\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(app)/messages/[npub]",
				pattern: /^\/messages\/([^/]+?)\/?$/,
				params: [{"name":"npub","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(app)/notifications2",
				pattern: /^\/notifications2\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(app)/notifications",
				pattern: /^\/notifications\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/onboarding",
				pattern: /^\/onboarding\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/(app)/packs",
				pattern: /^\/packs\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/(app)/packs/[packId]",
				pattern: /^\/packs\/([^/]+?)\/?$/,
				params: [{"name":"packId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/(app)/p/[identifier]",
				pattern: /^\/p\/([^/]+?)\/?$/,
				params: [{"name":"identifier","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(app)/relay-feeds",
				pattern: /^\/relay-feeds\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/(app)/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/(app)/trades",
				pattern: /^\/trades\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/(app)/t/[hashtag]",
				pattern: /^\/t\/([^/]+?)\/?$/,
				params: [{"name":"hashtag","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/(app)/wallet",
				pattern: /^\/wallet\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/(app)/[nip05]/[identifier]",
				pattern: /^\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"nip05","optional":false,"rest":false,"chained":false},{"name":"identifier","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
