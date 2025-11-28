# Agora Web Client

Modern Nostr client built with Svelte 5 and SvelteKit, integrated with the Agora Relay for curated social experiences.

## Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm

### Installation
```bash
npm install
npm run dev
```

Visit `http://localhost:5001`

### Development with Local Relay

The app works with any Nostr relay, but for the best experience, run the [Agora Relay](https://github.com/agora-nostr/relay) locally:

```bash
# In relay directory
./agora-relay -config config.json
```

Then configure the web app to use `ws://localhost:3334`

### Using Devcontainer

The easiest way to get started is using the included devcontainer, which automatically sets up both the web client and relay:

1. Open this repository in VS Code
2. Command Palette → `Dev Containers: Reopen in Container`
3. Wait for setup to complete
4. Start developing!

## Core Concepts

- **Nostr Protocol**: Decentralized social network based on cryptographic keys and signatures
- **NDK**: Nostr Development Kit - handles relay connections, event caching, and subscriptions
- **Svelte 5 Runes**: Modern reactive state with `$state()`, `$derived()`, `$effect()`
- **SvelteKit**: Full-stack framework with SSR and file-based routing

## Project Structure

```
src/
├── lib/              # Shared components, stores, utilities
│   ├── components/   # UI components
│   ├── stores/       # Reactive state (Svelte 5 runes)
│   ├── ndk.svelte.ts # NDK initialization
│   └── utils/        # Helper functions
└── routes/           # SvelteKit pages
```

## Development Commands

- `npm run dev` - Start dev server (port 5001)
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- Svelte 5 + SvelteKit 2
- TypeScript (strict mode)
- Tailwind CSS
- NDK 3.0.0-beta
- Vite 7
