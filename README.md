## How to start the project

### 1) Infrastructure

  - Go to `parsly-challenge-db`
  - Execute the following command: `docker-compose -f docker-compose.yml up -d`
  - Database will be accessible on port `27017`
  
### 2) Backend
  
  - Go to `parsly-challenge-server`
  - Execute the following command: `npm run install --force ; npm run dev`
  - Server will be accessible on `localhost:9000`
  
### 3) Frontend
  
  - Go to `parsly-challenge-client`
  - Execute the following command: `npm run install --force ; npm run develop`
  - Client will be accessible on `localhost:8000`
