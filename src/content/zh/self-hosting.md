---
title: 部署与运维
description: ankacloud 是一个长期运行的进程，可以住在任何一台小机器上；它需要能被公网访问，因为 sandbox 要回调它的记忆 API。
eyebrow: 部署
---

## 要求

控制面是一个长期运行的进程：reconciler 必须持续跑，Web API 和记忆 API 必须一直可达，因为 sandbox 会回调它。所以它可以住在任何一台小机器、家里的 NAS，或者一块常驻的云 sandbox 上。

它需要 Python ≥ 3.11，并且能被公网访问（Web UI，以及 sandbox 回调记忆 API）。

## 本地

```bash
git clone https://github.com/tao12345666333/ankacloud.git
cd ankacloud
uv sync --frozen
uv run pytest -q        # 全部单元测试，不需要任何外部服务或 key
uv run uvicorn ankacloud.main:app --host 127.0.0.1 --port 8000
```

然后打开 <http://127.0.0.1:8000>。空 key 足够跑测试和打开界面；要真的创建 sandbox、调用模型，需要：

| 变量 | 说明 |
| --- | --- |
| `E2B_API_KEY` | E2B 云 sandbox 的 key |
| `OR_KEY` | LLM key（OpenRouter，或任何 OpenAI 兼容端点） |
| `OR_URL` | 端点地址，例如 `https://openrouter.ai/api/v1` |
| `OR_MODEL` | 模型名，例如 `openai/gpt-4o` |

`OR_*` 只是兜底：一旦在 Web 的 Providers 面板里配好了默认 provider，sandbox、Anka 和记忆整理都会优先用数据库里的配置。

## 服务器（systemd）

```bash
sudo ./deploy/install.sh          # 默认克隆到 /opt/ankacloud
sudo nano /etc/ankacloud/env      # 填 E2B_API_KEY、OR_KEY、OR_URL、OR_MODEL
sudo systemctl enable --now ankacloud
curl http://127.0.0.1:8000/api/health    # {"ok": true}
```

更新：

```bash
sudo ./deploy/update.sh
```

它会拉 `origin/main`、跑 `uv sync`、重启、健康检查，失败自动回滚。

SSE 流式事件在 tailscale serve 和 nginx 后面都能用；nginx 配置模板在仓库的 `deploy/nginx.conf.example`。

## 公网访问与安全

- 把 `ANKACLOUD_WEB_TOKEN` 留空只适合本地开发：它意味着 Web API 没有鉴权。
- sandbox 通过 `ANKACLOUD_PUBLIC_URL`（或单独的 `ANKACLOUD_MEMORY_PUBLIC_URL`）回调控制面。如果 UI 在私有网络里（比如 tailscale），只把记忆 API 暴露成一条 path 级别的 Cloudflare tunnel 也可以。
- Telegram 只服务白名单里的用户，其他人静默忽略；白名单为空就谁都不理。

## 从 GitHub 自动部署

仓库里的 `.github/workflows/deploy.yml` 会在**推送 tag** 时先跑测试，再通过 `deploy/update.sh` 同步到 `/opt/ankacloud`、重启、健康检查、失败回滚。

## 下一步

- [仓库里的部署说明](https://github.com/tao12345666333/ankacloud/blob/main/deploy/README.md)
- [Projects：仓库、密钥与 GitHub 凭据](https://github.com/tao12345666333/ankacloud/blob/main/docs/PROJECTS.md)
