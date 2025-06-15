# React SPA with Docker Runtime Configuration

A production-ready React Single Page Application (SPA) demonstrating Docker runtime configuration patterns using environment variables and nginx templating.

## 🚀 Features

- **Runtime Configuration**: Environment variables injected at container startup
- **Docker Multi-stage Build**: Optimized production builds with nginx
- **Production Ready**: Security headers, gzip compression, health checks
- **Client-side Routing**: SPA routing support with nginx fallback
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern utility-first CSS framework

## 📋 Prerequisites

- Docker 20.10+
- Node.js 20.19.1+ (for local development)
- npm or yarn

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React SPA     │    │  nginx Server   │    │   Environment   │
│                 │    │                 │    │                 │
│ • Components    │◄──►│ • Static Serve  │◄──►│ • API_URL       │
│ • Hooks         │    │ • Routing       │    │ • APP_NAME      │
│ • Config Load   │    │ • Compression   │    │ • NODE_ENV      │
│ • Responsive UI │    │ • Security      │    │ • Features      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Local Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🐳 Docker Usage

### Build the Docker Image
```bash
docker build -t react-runtime-config-app .
```

### Run with Default Configuration
```bash
docker run -p 8080:80 react-runtime-config-app
```

### Run with Custom Environment Variables
```bash
docker run -p 8080:80 \
  -e API_URL="https://api.example.com" \
  -e APP_NAME="My Production App" \
  -e NODE_ENV="production" \
  react-runtime-config-app
```

### Debug Container
```bash
# Get container ID
docker ps

# Access container shell
docker exec -it <container_id> sh

# Check generated config
cat /usr/share/nginx/html/assets/runtime-config.json

# Check nginx logs
docker logs <container_id>
```

## ⚙️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `API_URL` | `http://localhost:3000/api` | Backend API endpoint |
| `APP_NAME` | `React Runtime Config App` | Application display name |
| `NODE_ENV` | `production` | Environment mode |

### Runtime Configuration Template

The application uses a template-based approach for runtime configuration:

**Template Location**: `src/assets/runtime-config.json.template`
```json
{
  "apiUrl": "${API_URL}",
  "appName": "${APP_NAME}",
  "environment": "${NODE_ENV}",
  "features": {
    "authentication": true,
    "fileUpload": true,
    "notifications": true
  },
  "version": "1.0.0",
  "buildTime": "2024-01-01T00:00:00Z"
}
```

**Generated Location**: `/usr/share/nginx/html/assets/runtime-config.json`

## 🏭 Production Deployment

### Docker Compose Example
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - API_URL=https://api.production.com
      - APP_NAME=Production App
      - NODE_ENV=production
    restart: unless-stopped
```

### Kubernetes Deployment Example
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: react-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: react-app
  template:
    metadata:
      labels:
        app: react-app
    spec:
      containers:
      - name: react-app
        image: react-runtime-config-app:latest
        ports:
        - containerPort: 80
        env:
        - name: API_URL
          value: "https://api.k8s.com"
        - name: APP_NAME
          value: "Kubernetes App"
```

## 🔧 Technical Details

### Docker Multi-stage Build
1. **Build Stage**: Uses Node.js 20.19.1 to build the React application
2. **Production Stage**: Uses nginx:alpine to serve static files

### nginx Configuration
- **Static Asset Caching**: 1-year cache for JS/CSS/images
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **Gzip Compression**: Enabled for text-based assets
- **Client-side Routing**: Fallback to index.html for SPA routes
- **Health Check**: `/health` endpoint for monitoring

### File Structure
```
├── Dockerfile              # Multi-stage Docker build
├── default.conf            # nginx configuration
├── entrypoint.sh           # Container startup script
├── src/
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── assets/             # Static assets and templates
│   └── ...
├── dist/                   # Production build output
└── README.md              # This file
```

## 🚨 Troubleshooting

### Common Issues

1. **Config Loading Error**: If you see "Unexpected token '<'" error, the app falls back to default configuration
2. **Port Conflicts**: Change the host port if 8080 is in use: `-p 3000:80`
3. **Environment Variables**: Ensure variables are properly quoted in shell commands

### Health Checks
```bash
# Check if container is healthy
curl http://localhost:8080/health

# Check config endpoint
curl http://localhost:8080/assets/runtime-config.json
```

### Logs
```bash
# View container logs
docker logs <container_id>

# Follow logs in real-time
docker logs -f <container_id>
```

## 📦 Dependencies

### Production Dependencies
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `lucide-react`: ^0.344.0

### Development Dependencies
- `vite`: ^5.4.2
- `typescript`: ^5.5.3
- `tailwindcss`: ^3.4.1
- `@vitejs/plugin-react`: ^4.3.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Resources

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [nginx Configuration](https://nginx.org/en/docs/)
- [React Production Build](https://create-react-app.dev/docs/production-build/)
- [Vite Build Options](https://vitejs.dev/guide/build.html)