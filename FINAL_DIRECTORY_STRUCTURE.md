# Final Directory Structure After Split

## Repository 1: frontend-config-app
```
frontend-config-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ConfigDisplay.tsx
│   │   ├── ProfileForm.tsx
│   │   └── ProfileList.tsx
│   ├── assets/
│   ├── App.tsx
│   ├── config.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── config/
│   ├── runtime-config.dev.json
│   ├── runtime-config.test.json
│   └── runtime-config.prod.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── .dockerignore
├── default.conf
├── Dockerfile
├── entrypoint.sh
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Repository 2: health-api
```
health-api/
├── src/
│   ├── routes/
│   │   ├── profile.js
│   │   ├── upload.js
│   │   └── health.js
│   ├── middleware/
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── data/
│   │   └── storage.js
│   └── server.js
├── config/
│   ├── database.dev.js
│   ├── database.test.js
│   └── database.prod.js
├── migrations/
├── seeds/
│   ├── dev/
│   ├── test/
│   └── prod/
├── tests/
│   ├── unit/
│   └── integration/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .dockerignore
├── .env.example
├── Dockerfile
├── jest.config.js
├── jest.integration.config.js
├── package.json
└── README.md
```

## Repository 3: dev2prod-healthapp (Orchestration)
```
dev2prod-healthapp/
├── terraform/
│   ├── environments/
│   │   ├── dev/
│   │   ├── test/
│   │   └── prod/
│   ├── modules/
│   │   ├── eks/
│   │   ├── rds/
│   │   ├── s3/
│   │   └── secrets/
│   └── main.tf
├── k8s/
│   ├── base/
│   ├── overlays/
│   │   ├── dev/
│   │   ├── test/
│   │   └── prod/
│   └── kustomization.yaml
├── scripts/
│   ├── setup.sh
│   ├── deploy.sh
│   └── cleanup.sh
├── logs/
│   ├── frontend/
│   ├── api/
│   └── mysql/
├── uploads/
├── database/
│   └── init.sql
├── supabase/
│   └── migrations/
├── .github/
│   └── workflows/
│       ├── deploy-dev.yml
│       ├── deploy-test.yml
│       └── deploy-prod.yml
├── docker-compose.yml
├── docker-compose.dev.yml
├── docker-compose.test.yml
├── docker-compose.prod.yml
├── .env.dev
├── .env.test
├── .env.prod
├── Makefile
└── README.md
```

## Key Integration Points

### API URL Configuration by Environment:
- **Dev**: `http://localhost:3001/api` (docker-compose)
- **Test**: `http://localhost:3002/api` (docker-compose)
- **Prod**: `https://api.healthapp.com/api` (Kubernetes ingress)

### Container Images:
- `ghcr.io/arunprabus/frontend-config-app:dev`
- `ghcr.io/arunprabus/frontend-config-app:test`
- `ghcr.io/arunprabus/frontend-config-app:prod`
- `ghcr.io/arunprabus/health-api:dev`
- `ghcr.io/arunprabus/health-api:test`
- `ghcr.io/arunprabus/health-api:prod`

### Environment-Specific Features:
- **Dev**: Debug mode, verbose logging, local ports exposed
- **Test**: Integration testing, mock services, CI/CD validation
- **Prod**: Security hardened, monitoring, auto-scaling, secrets management
```