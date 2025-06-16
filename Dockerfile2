# Use Node.js 20 for building
FROM node:20.19.1-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci 

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Install envsubst (gettext package) and jq for JSON validation
RUN apk add --no-cache gettext jq

# Copy nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Copy runtime config template to the correct location
COPY src/assets/runtime-config.json.template /usr/share/nginx/html/assets/runtime-config.json.template

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set default environment variables
ENV API_URL=http://localhost:3000/api
ENV APP_NAME="React Runtime Config App"
ENV NODE_ENV=production

# Expose port
EXPOSE 80

# Use custom entrypoint
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]