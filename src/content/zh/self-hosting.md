---
title: 部署与运维
description: ankacloud 是一个长期运行的进程，可部署在任何一台小型服务器上；需要公网可达，以便沙箱回调它的记忆 API。
eyebrow: 部署
---

## 环境要求

控制面需要长期运行：reconciler 必须持续巡检，Web API 和记忆 API 也必须保持可达，供沙箱随时回调。它可以部署在任何一台小型服务器、家用 NAS 或常驻云主机上。

需要 Python ≥ 3.11，以及一个公网访问地址（用于访问 Web UI 及供沙箱回调记忆 API）。

## 本地运行

```bash
git clone https://github.com/tao12345666333/ankacloud.git
cd ankacloud
uv sync --frozen
uv run pytest -q        # 全部单元测试，无需外部服务或 key
uv run uvicorn ankacloud.main:app --host 127.0.0.1 --port 8000
```

然后打开 <http://127.0.0.1:8000>。不填 key 也足够跑测试和预览界面；需要实际启动沙箱并调用模型时，配置以下环境变量：

| 变量 | 说明 |
| --- | --- |
| `E2B_API_KEY` | E2B 云沙箱的 API key |
| `OR_KEY` | LLM API key（OpenRouter 或任意 OpenAI 兼容端点） |
| `OR_URL` | 端点地址，例如 `https://openrouter.ai/api/v1` |
| `OR_MODEL` | 模型名，例如 `openai/gpt-4o` |

`OR_*` 仅作为兜底配置：在 Web 的 Providers 面板配好默认 provider 后，沙箱、Anka 和记忆整理都会优先使用数据库中的配置。

## 服务器部署（systemd）

```bash
sudo ./deploy/install.sh          # 默认克隆到 /opt/ankacloud
sudo nano /etc/ankacloud/env      # 配置 E2B_API_KEY、OR_KEY、OR_URL、OR_MODEL
sudo systemctl enable --now ankacloud
curl http://127.0.0.1:8000/api/health    # {"ok": true}
```

更新：

```bash
sudo ./deploy/update.sh
```

脚本会自动拉取 `origin/main`、执行 `uv sync`、重启服务并进行健康检查，失败时自动回滚。

SSE 流式事件在 Tailscale Serve 和 Nginx 反向代理后均可正常工作；Nginx 配置模板位于 `deploy/nginx.conf.example`。

## 公网访问与安全

- `ANKACLOUD_WEB_TOKEN` 留空仅限本地开发使用：留空表示 Web API 不启用鉴权。
- 沙箱通过 `ANKACLOUD_PUBLIC_URL`（或单独配置的 `ANKACLOUD_MEMORY_PUBLIC_URL`）回调控制面。如果 Web UI 放在 Tailscale 等私有网络中，只需通过 Cloudflare Tunnel 单独暴露记忆 API 路径即可。
- Telegram 仅服务白名单内的用户，其他人一律静默忽略；白名单为空时不会响应任何消息。

## 从 GitHub 自动部署

仓库中的 `.github/workflows/deploy.yml` 会在**推送 tag** 时先运行测试，再通过 `deploy/update.sh` 同步到 `/opt/ankacloud`、重启、执行健康检查，并在失败时自动回滚。

## 下一步

- [仓库里的部署说明](https://github.com/tao12345666333/ankacloud/blob/main/deploy/README.md)
- [Projects：仓库、密钥与 GitHub 凭据](https://github.com/tao12345666333/ankacloud/blob/main/docs/PROJECTS.md)
