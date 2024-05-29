Stack:

- TypeScript
- Docker
- Backend
  - Express
  - PostgreSQL
  - Kysely
  - Zod
  - Directus
- Frontend
  - React
  - Leaflet
  - Zustand
  - Tailwind
  - NextUI
  - Google Material Icons

### Run database in docker

```bash
cd <test-project>
docker compose up
```

### Run backend

```bash
cd <test-project>/app-back
npm install
npm run dev
```

### Run frontend

```bash
cd <test-project>/app-front
npm install
npm run dev
```

### Backup your databases in docker container

```bash
docker exec -t task-postgres pg_dump -c -U postgres test-task > dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql

```

### Restore database inside docker container

```bash
docker exec -i task-postgres /bin/bash -c "PGPASSWORD=postgres psql --username postgres test-task" < dump.sql

```
