# TradeOps — Ansible Deployment Infrastructure

Production-grade Ansible deployment for the TradeOps
transaction management application (Flask API + React
dashboard).

## Architecture

```
/opt/tradeops/
├── current -> releases/<timestamp>  (symlink)
├── releases/
│   ├── 20260502T140000/
│   │   ├── backend/   (Flask + venv)
│   │   └── frontend/  (React + dist/)
│   └── …              (last 3 kept)
├── shared/
│   ├── env/tradeops.env
│   ├── gunicorn.conf.py
│   ├── health-check.sh
│   ├── integrity-check.sh
│   └── backup.sh
├── backups/
│   ├── daily/
│   └── weekly/
└── deploy.log          (audit trail)
```

## Quick Start

```bash
cd infra

# 1. Create a vault password file
echo "your-vault-password" > .vault_password
chmod 600 .vault_password

# 2. Encrypt vault secrets
ansible-vault encrypt vault/dev.yml
ansible-vault encrypt vault/staging.yml
ansible-vault encrypt vault/prod.yml

# 3. Start the Docker test target
docker compose up -d

# 4. Deploy (dev environment)
ansible-playbook deploy.yml -e deploy_env=dev
```

## Playbooks

| Playbook        | Purpose                     |
|-----------------|-----------------------------|
| `deploy.yml`    | Full deployment             |
| `rollback.yml`  | Revert to previous release  |

## Environments

Pass `-e deploy_env=<env>` to select:

| Environment | File                      |
|-------------|---------------------------|
| dev         | `environments/dev.yml`    |
| staging     | `environments/staging.yml`|
| prod        | `environments/prod.yml`   |

Secrets live in `vault/<env>.yml` — encrypt with
`ansible-vault encrypt vault/<env>.yml`.

## Tags

Deploy individual components:

```bash
ansible-playbook deploy.yml \
  -e deploy_env=dev \
  --tags backend

ansible-playbook deploy.yml \
  -e deploy_env=dev \
  --tags nginx

ansible-playbook deploy.yml \
  -e deploy_env=dev \
  --tags security
```

Available tags: `common`, `security`, `backend`,
`frontend`, `nginx`, `deploy`, `observability`,
`backup`, `smoke`, `audit`, `preflight`,
`rollback`, `firewall`, `ssh`, `integrity`.

## Rollback

```bash
# Revert to the previous release
ansible-playbook rollback.yml \
  -e deploy_env=dev

# Revert to a specific release
ansible-playbook rollback.yml \
  -e deploy_env=dev \
  -e rollback_target=20260502T140000
```

## Roles

| Role          | Responsibility              |
|---------------|-----------------------------|
| common        | OS packages, app user, dirs |
| security      | SSH, firewall, integrity    |
| observability | Logging, logrotate, disk    |
| backend       | Gunicorn, systemd, health   |
| nginx         | Reverse proxy, headers      |
| deploy        | Blue-green release, swap    |
| backup        | Cron backups, rotation      |

## Security Features

- Non-root `tradeops` user (no shell login)
- UFW firewall — ports 22, 80, 443 only
- SSH hardened — no root login, no passwords,
  protocol 2
- File integrity manifests (SHA-256)
- Ansible Vault for all secrets
- No world-readable application files
- Security headers (HSTS, CSP, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy)
- Rate limiting on API endpoints
- Request size limits

## Observability

- Structured JSON backend logs →
  `/var/log/tradeops/`
- Separate nginx access/error logs
- Logrotate with 30-day retention + compression
- Disk usage check (fails at 85%)

## Backup

- Daily backup at 02:30 via cron
- 7 daily + 4 weekly backups retained
- Automatic rotation of old backups
- Post-deploy verification (exists + non-empty)

## Notes

The Docker target (`docker-compose.yml`) provides a
minimal Ubuntu container with SSH for testing Ansible
connectivity. Full deployment testing requires a VM
with systemd (e.g., Vagrant or a cloud instance).
