---
title: Deploying and operating it
description: ankacloud is a long-running process that can live on any small machine, and it has to be reachable from the internet because sandboxes call back to its memory API.
eyebrow: Deployment
---

## Requirements

The control plane is a long-running process: the reconciler has to keep running, and the web and memory APIs have to stay reachable because sandboxes call back to them. So it can live on any small machine, a home NAS, or a resident cloud sandbox.

It needs Python ≥ 3.11 and a public address (for the web UI, and for sandboxes calling the memory API).

## Locally

```bash
git clone https://github.com/tao12345666333/ankacloud.git
cd ankacloud
uv sync --frozen
uv run pytest -q        # every unit test, no external services or keys needed
uv run uvicorn ankacloud.main:app --host 127.0.0.1 --port 8000
```

Then open <http://127.0.0.1:8000>. Empty keys are enough for the tests and the UI; to really create sandboxes and call a model you need:

| Variable | What it is |
| --- | --- |
| `E2B_API_KEY` | Key for E2B cloud sandboxes |
| `OR_KEY` | LLM key (OpenRouter, or any OpenAI-compatible endpoint) |
| `OR_URL` | The endpoint, e.g. `https://openrouter.ai/api/v1` |
| `OR_MODEL` | The model, e.g. `openai/gpt-4o` |

`OR_*` is only a fallback: once you configure a default provider in the web Providers panel, sandboxes, Anka and memory consolidation all prefer what is in the database.

## On a server (systemd)

```bash
sudo ./deploy/install.sh          # clones into /opt/ankacloud by default
sudo nano /etc/ankacloud/env      # fill in E2B_API_KEY, OR_KEY, OR_URL, OR_MODEL
sudo systemctl enable --now ankacloud
curl http://127.0.0.1:8000/api/health    # {"ok": true}
```

To update:

```bash
sudo ./deploy/update.sh
```

It pulls `origin/main`, runs `uv sync`, restarts, health-checks and rolls back automatically on failure.

SSE streaming works behind both tailscale serve and nginx; an nginx template ships in `deploy/nginx.conf.example`.

## Public exposure and security

- Leaving `ANKACLOUD_WEB_TOKEN` empty is for local development only: it means the web API has no auth.
- Sandboxes reach the control plane through `ANKACLOUD_PUBLIC_URL` (or a separate `ANKACLOUD_MEMORY_PUBLIC_URL`). If the UI lives on a private network such as tailscale, a path-scoped Cloudflare tunnel for the memory API alone is enough.
- Telegram only serves users on the allowlist and silently ignores everyone else; an empty allowlist answers nobody.

## Auto-deploy from GitHub

`.github/workflows/deploy.yml` runs the tests on a **tag push**, then syncs to `/opt/ankacloud` through `deploy/update.sh`, restarts, health-checks and rolls back on failure.

## Next

- [Deployment notes in the repository](https://github.com/tao12345666333/ankacloud/blob/main/deploy/README.md)
- [Projects: repositories, secrets and GitHub credentials](https://github.com/tao12345666333/ankacloud/blob/main/docs/PROJECTS.md)
