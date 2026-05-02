# TradeOps — Trade Transaction Management

A monorepo demo application for trade transaction
management with Ansible deployment automation.

## Project Structure

```
/backend    — Python Flask REST API
/frontend   — React (Vite) dashboard UI
/infra      — Docker + Ansible scaffolding
```

## Backend

Flask API serving trade transactions in-memory.

### Endpoints

| Method | Path                      | Description       |
|--------|---------------------------|-------------------|
| GET    | /api/health               | Health check      |
| GET    | /api/transactions         | List all trades   |
| GET    | /api/transactions/\<id\>  | Get single trade  |
| POST   | /api/transactions         | Create new trade  |

### Run locally

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The API starts on `http://localhost:5000`.

## Frontend

React dashboard built with Vite. Dark-themed
trading platform UI.

### Run locally

```bash
cd frontend
npm install
npm run dev
```

Dev server at `http://localhost:5173` with API
proxy to `http://localhost:5000`.

### Build

```bash
npm run build
```

Produces static output in `frontend/dist/`.

## Infrastructure

Deployment scaffolding for Ansible automation.

### Components

- **Dockerfile.target** — Ubuntu 22.04 with
  SSH server and Python3 (root login enabled,
  password: `devin`, SSH on port 22)
- **docker-compose.yml** — Runs the target
  container, maps port 2222 → 22 and 8080 → 80
- **inventory.yml** — Ansible inventory for
  localhost:2222 with root/devin credentials
- **ansible.cfg** — Disables host key checking

### Start the target container

```bash
cd infra
docker compose up -d --build
```

### Test SSH access

```bash
ssh -p 2222 root@localhost
# password: devin
```

### Run Ansible against the target

```bash
cd infra
ansible all -m ping
```

## Quick Start

1. Start the backend:
   ```bash
   cd backend && pip install -r requirements.txt
   python app.py
   ```
2. Start the frontend:
   ```bash
   cd frontend && npm install && npm run dev
   ```
3. Open `http://localhost:5173`
