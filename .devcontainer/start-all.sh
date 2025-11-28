#!/bin/bash
# Helper script to start both services

RELAY_DIR="../Agora-Relay-ma2vm5"

# Start relay in background
if [ -d "$RELAY_DIR" ]; then
  echo "🔌 Starting relay..."
  cd "$RELAY_DIR"
  ./agora-relay -config config.json > /tmp/relay.log 2>&1 &
  RELAY_PID=$!
  echo "Relay PID: $RELAY_PID (logs at /tmp/relay.log)"

  # Trap to kill relay on exit
  trap "echo 'Stopping relay...'; kill $RELAY_PID 2>/dev/null" EXIT INT TERM
fi

# Start web client
echo "🌐 Starting web client..."
cd /workspaces/Agora-web
npm run dev
