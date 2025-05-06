
#!/bin/bash

# This script patches the expo-router _ctx.web.js file to fix the "require.context" issue
# Run this script before running "expo export -p web"

set -e  # Exit on any error

echo "Fixing expo-router _ctx.web.js..."

# Find all potential _ctx.web.js files in node_modules
ctx_files=$(find node_modules -name "_ctx.web.js" | grep -i expo-router)

if [ -z "$ctx_files" ]; then
  echo "No _ctx.web.js files found in expo-router! Check node_modules structure."
  exit 1
fi

for file in $ctx_files; do
  echo "Backing up and patching $file"
  cp "$file" "${file}.bak"
  
  # Replace the problematic line with a hardcoded path
  # Option 1: Replace with an absolute path to app directory
  sed -i 's|process.env.EXPO_ROUTER_APP_ROOT|"./app"|g' "$file"
  
  # Option 2: Comment out the problematic lines and replace with hardcoded require.context
  # Uncomment these lines if Option 1 doesn't work
  # sed -i 's|exports.clientCtx = require.context(process.env.EXPO_ROUTER_APP_ROOT, true, /.*/);|exports.clientCtx = require.context("./app", true, /.*/);|g' "$file"
  
  echo "✅ Fixed $file"
done

echo "All files patched successfully!"