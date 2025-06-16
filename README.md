# Health App - Microservices Architecture

A production-ready health profile management system built with React frontend and Node.js backend, demonstrating modern microservices architecture with Docker containerization.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React SPA     │    │  Node.js API    │    │   AWS Services  │
│                 │    │                 │    │                 │
│ • Profile Forms │◄──►│ • CRUD APIs     │◄──►│ • S3 Storage    │
│ • File Upload   │    │ • File Upload   │    │ • RDS MySQL     │
│ • Runtime Config│    │ • Validation    │    │ • EKS Cluster   │
│ • Responsive UI │    │ • Health Checks │    │ • Load Balancer │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Infrastructure │
                    │                 │
                    │ • Docker        │
                    │ • Kubernetes    │
                    │ • Terraform     │
                    │ • GitHub Actions│
                    └─────────────────┘
```

## 🚀 Features

### Frontend (React + TypeScript)
- **Runtime Configuration**: Environment variables injected at container startup
- **Profile Management**: Create, view, and delete health profiles
- **File Upload**: PDF document upload with progress tracking
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Dynamic data loading from API
- **Error Handling**: Comprehensive error handling and user feedback

### Backend (Node.js + Express)
- **RESTful API**: Clean REST endpoints for profile management
- **File Upload**: Secure PDF upload to AWS S3
- **Validation**: Input validation with Joi
- **Security**: Helmet.js security headers and CORS
- **Health Checks**: Built-in health monitoring endpoints
- **Error Handling**: Centralized error handling middleware

### Infrastructure
- **Docker**: Multi-stage builds for optimized containers
- **Docker Compose**: Local development orchestration
- **Database**: MySQL with initialization scripts
- **Caching**: Redis for future performance optimization
- **Monitoring**: Health checks and logging

## 📋 Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- Node.js 20.19.1+ (for local development)
- AWS Account (for S3 uploads in production)

## 🛠️ Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd health-app
cp .env.example .env
```

### 2. Start with Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### 3. Access the Application
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health
- **Database**: localhost:3306 (MySQL)
- **Redis**: localhost:6379

### 4. Test the API
```bash
# Health check
curl http://localhost:3000/api/health

# Get all profiles
curl http://localhost:3000/api/profile

# Create a profile
curl -X POST http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "bloodGroup": "O+",
    "insurance": "Blue Cross",
    "email": "john@example.com",
    "idProof": "DL123456789"
  }'
```

## 🏗️ Development

### Local Development Setup
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
npm install
npm run dev
```

### Environment Variables

#### Frontend (.env)
```env
API_URL=http://localhost:3000/api
APP_NAME=Health App - Development
NODE_ENV=development
```

#### Backend (backend/.env)
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_BUCKET_NAME=health-app-uploads
```

## 📁 Project Structure

```
health-app/
├── backend/                    # Node.js API service
│   ├── src/
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Express middleware
│   │   ├── data/             # Data storage (temporary)
│   │   └── server.js         # Main server file
│   ├── Dockerfile            # Backend container
│   └── package.json
├── src/                       # React frontend
│   ├── components/           # React components
│   ├── assets/              # Static assets
│   └── config.ts            # Runtime configuration
├── database/                 # Database scripts
│   └── init.sql             # MySQL initialization
├── docker-compose.yml       # Local development
├── Dockerfile              # Frontend container
└── README.md
```

## 🔌 API Endpoints

### Profile Management
- `GET /api/profile` - Get all profiles
- `GET /api/profile/:id` - Get specific profile
- `POST /api/profile` - Create new profile
- `PUT /api/profile/:id` - Update profile
- `DELETE /api/profile/:id` - Delete profile

### File Upload
- `POST /api/upload` - Upload PDF file to S3

### System
- `GET /api/health` - Health check endpoint
- `GET /` - API information

## 🐳 Docker Commands

### Build Images
```bash
# Build backend
docker build -t health-app-backend ./backend

# Build frontend
docker build -t health-app-frontend .
```

### Run Individual Services
```bash
# Backend only
docker run -p 3000:3000 \
  -e NODE_ENV=development \
  health-app-backend

# Frontend only
docker run -p 8080:80 \
  -e API_URL=http://localhost:3000/api \
  -e APP_NAME="Health App" \
  health-app-frontend
```

### Production Deployment
```bash
# Production build
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale backend=3
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
npm test
```

### Integration Tests
```bash
# Test API endpoints
curl -X POST http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -d @test-data/sample-profile.json

# Test file upload
curl -X POST http://localhost:3000/api/upload \
  -F "file=@test-files/sample.pdf"
```

## 🚀 Production Deployment

### AWS EKS Deployment
```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services
```

### Environment Configuration
```yaml
# Production environment variables
API_URL: https://api.healthapp.com
APP_NAME: Health App - Production
NODE_ENV: production
AWS_REGION: us-east-1
S3_BUCKET_NAME: healthapp-prod-uploads
```

## 📊 Monitoring

### Health Checks
- Frontend: `http://localhost:8080/health`
- Backend: `http://localhost:3000/api/health`
- Database: Built-in MySQL health check

### Logs
```bash
# View all logs
docker-compose logs

# Follow specific service
docker-compose logs -f backend

# View last 100 lines
docker-compose logs --tail=100 frontend
```

## 🔒 Security

### Implemented Security Measures
- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Joi schema validation
- **File Upload**: PDF-only restriction
- **Environment Variables**: Sensitive data protection

### Future Security Enhancements
- JWT authentication
- Rate limiting
- API key management
- Database encryption
- Audit logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Resources

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Node.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Production Build](https://create-react-app.dev/docs/production-build/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)