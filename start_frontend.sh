#!/bin/bash

# Change directories if needed
FRONTEND_DIR="./full-stack/web"

# Start frontend
echo "Starting frontend..."
cd "$FRONTEND_DIR" || exit
npm run dev

echo "Servers running. Press [CTRL+C] to stop both."
