#!/bin/bash

# Change directories if needed
BACKEND_DIR="./full-stack/server"

# Start backend
echo "Starting backend..."
cd "$BACKEND_DIR" || exit
docker compose up --build


echo "Servers running. Press [CTRL+C] to stop both."
