# Cleanup Plan for Mono-repo Split

## Files/Folders to DELETE from Current Repo

### Root Level Cleanup
- `backend/` - Moving to health-api repo
- `src/` - Moving to frontend-config-app repo  
- `public/` - Moving to frontend-config-app repo
- `index.html` - Moving to frontend-config-app repo
- `package.json` - Moving to frontend-config-app repo
- `package-lock.json` - Moving to frontend-config-app repo
- `vite.config.ts` - Moving to frontend-config-app repo
- `tsconfig*.json` - Moving to frontend-config-app repo
- `tailwind.config.js` - Moving to frontend-config-app repo
- `postcss.config.js` - Moving to frontend-config-app repo
- `eslint.config.js` - Moving to frontend-config-app repo
- `Dockerfile` - Moving to frontend-config-app repo
- `default.conf` - Moving to frontend-config-app repo
- `entrypoint.sh` - Moving to frontend-config-app repo
- `.dockerignore` - Moving to frontend-config-app repo
- `docker-compose.yml` - Replacing with environment-specific versions

### Duplicate/Unused Folders
- `frontend-config-app/` - Duplicate structure, consolidate
- `health-api/` - Duplicate structure, consolidate
- `dev2prod-healthapp/` - Keep as reference, update structure

### Environment Files
- `.env.example` - Replace with environment-specific versions

## Files to KEEP in Orchestration Repo
- `README.md` - Update for orchestration
- `supabase/` - Keep for database migrations
- Infrastructure files (if any)

## New Structure After Cleanup
```
orchestration-repo/
├── docker-compose.yml
├── docker-compose.dev.yml
├── docker-compose.test.yml
├── docker-compose.prod.yml
├── .env.dev
├── .env.test
├── .env.prod
├── scripts/
├── terraform/
└── README.md
```