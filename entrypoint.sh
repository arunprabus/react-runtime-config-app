#!/bin/sh

# Exit on any error
set -e

echo "🚀 Starting entrypoint script..."

# Define paths
TEMPLATE_FILE="/usr/share/nginx/html/assets/runtime-config.json.template"
CONFIG_FILE="/usr/share/nginx/html/assets/runtime-config.json"
HTML_FILE="/usr/share/nginx/html/index.html"

echo "📝 Environment variables:"
echo "  API_URL: ${API_URL}"
echo "  APP_NAME: ${APP_NAME}"
echo "  NODE_ENV: ${NODE_ENV}"

# Check if template exists
if [ ! -f "$TEMPLATE_FILE" ]; then
  echo "❌ Error: Template file not found at $TEMPLATE_FILE"
  echo "📁 Available files in assets directory:"
  ls -la /usr/share/nginx/html/assets/ || echo "Assets directory not found"
  exit 1
fi

echo "📋 Template file found, generating runtime config..."

# Generate runtime config from environment variables
envsubst < "$TEMPLATE_FILE" > "$CONFIG_FILE"

echo "✅ Runtime config generated successfully:"
cat "$CONFIG_FILE"

# Verify the config file was created and is valid JSON
if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ Error: Failed to generate runtime config file"
  exit 1
fi

# Test if the generated file is valid JSON
if ! cat "$CONFIG_FILE" | jq . > /dev/null 2>&1; then
  echo "⚠️  Warning: Generated config may not be valid JSON"
  echo "Content:"
  cat "$CONFIG_FILE"
else
  echo "✅ Generated config is valid JSON"
fi

# Update HTML file with environment variables if needed
if [ -f "$HTML_FILE" ]; then
  echo "🔧 Updating HTML title..."
  sed -i "s|<title[^>]*>.*</title>|<title>${APP_NAME}</title>|g" "$HTML_FILE"
fi

# Set proper permissions
chmod 644 "$CONFIG_FILE"

echo "📁 Final assets directory contents:"
ls -la /usr/share/nginx/html/assets/

echo "🎯 Configuration complete! Starting application..."

# Execute the main command
exec "$@"