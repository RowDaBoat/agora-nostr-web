#!/bin/bash
set -e

echo "🚀 Setting up Agora development environment..."

# Navigate to workspace
WORKSPACE_DIR="${WORKSPACE_DIR:-/workspaces/Agora-web}"
cd "$WORKSPACE_DIR"

# Install web client dependencies
echo "📦 Installing web client dependencies..."
npm install

# Setup relay (assuming it's cloned at same level or as submodule)
RELAY_DIR="../Agora-Relay-ma2vm5"
if [ -d "$RELAY_DIR" ]; then
  echo "🔧 Setting up relay..."
  cd "$RELAY_DIR"
  go mod download
  go build -o agora-relay

  # Create config from example if needed
  if [ ! -f config.json ]; then
    echo "📝 Creating relay config..."
    cp config.example.json config.json
  fi

  # Create data directory
  mkdir -p data

  echo "✅ Relay ready at $RELAY_DIR"
else
  echo "⚠️  Relay not found at $RELAY_DIR - you'll need to clone it separately"
fi

echo "✅ Setup complete!"
echo ""
echo "To start developing:"
echo "  Terminal 1: cd ../Agora-Relay-ma2vm5 && ./agora-relay -config config.json"
echo "  Terminal 2: npm run dev"
