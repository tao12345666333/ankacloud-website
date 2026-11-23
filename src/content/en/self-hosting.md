---
title: Deploying and operating it
description: ankacloud is a long-running process that runs on any small server, with internet reachability so sandboxes can call back to its memory API.
eyebrow: Deployment
---

## Requirements

The control plane is a long-running process: the reconciler needs to keep running, and both the web UI and memory API must stay reachable because sandboxes call back into them. It runs comfortably on any small VPS, a home NAS, or an always-on cloud instance.

You need Python ≥ 3.11 and a public address (for the web UI and for sandboxes calling the memory API).

## Locally

```bash
git clone https://github.com/tao12345666333/ankacloud.git
cd ankacloud
uv sync --frozen
uv run pytest -q        # full unit test suite; no external services or keys needed
uv run uvicorn ankacloud.main:app --host 127.0.0.1 --port 8000
```

Then open <http://127.0.0.1:8000>. Empty keys are enough to run the tests and explore the UI; to launch sandboxes and call models, configure:

| Variable | What it is |
| --- | --- |
| `E2B_API_KEY` | API key for E2B cloud sandboxes |
| `OR_KEY` | LLM API key (OpenRouter or any OpenAI-compatible endpoint) |
| `OR_URL` | Endpoint URL, e.g. `https://openrouter.ai/api/v1` |
| `OR_MODEL` | Model name, e.g. `openai/gpt-4o` |

`OR_*` acts only as a fallback: once you configure a default provider in the web Providers panel, sandboxes, Anka, and memory consolidation all prefer the database configuration.

## On a server (systemd)

```bash
sudo ./deploy/install.sh          # clones into /opt/ankacloud by default
sudo nano /etc/ankacloud/env      # set E2B_API_KEY, OR_KEY, OR_URL, OR_MODEL
sudo systemctl enable --now ankacloud
curl http://127.0.0.1:8000/api/health    # {"ok": true}
```

To update:

```bash
sudo ./deploy/update.sh
```

It pulls `origin/main`, runs `uv sync`, restarts the service, checks health, and rolls back automatically on failure.

SSE streaming works behind both Tailscale Serve and Nginx; an Nginx config template ships in `deploy/nginx.conf.example`.

## Public exposure and security

- Leave `ANKACLOUD_WEB_TOKEN` empty only for local development — an empty value disables authentication on the web API.
- Sandboxes reach the control plane via `ANKACLOUD_PUBLIC_URL` (or a dedicated `ANKACLOUD_MEMORY_PUBLIC_URL`). If the web UI stays on a private network such as Tailscale, exposing only the memory API path through a Cloudflare Tunnel is enough.
- Telegram serves only users on the allowlist and silently ignores everyone else; an empty allowlist replies to nobody.

## Auto-deploy from GitHub

`.github/workflows/deploy.yml` runs the test suite on a **tag push**, then syncs to `/opt/ankacloud` via `deploy/update.sh`, restarts, checks health, and rolls back on failure.

## Next

- [Deployment notes in the repository](https://github.com/tao12345666333/ankacloud/blob/main/deploy/README.md)
- [Projects: repositories, secrets, and GitHub credentials](https://github.com/tao12345666333/ankacloud/blob/main/docs/PROJECTS.md)
