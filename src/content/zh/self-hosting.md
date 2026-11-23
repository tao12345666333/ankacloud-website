---
title: 部署与运维
description: ankacloud 是一个轻量的常驻进程，任意小型主机即可运行；只需公网可达，方便云端沙箱回调它的记忆 API。
eyebrow: 部署运维
---

## 环境要求

控制面需要保持长期运行：reconciler 要持续巡检沙箱状态，Web API 和记忆 API 也需要保持在线，供云端沙箱随时回调。一台小型 VPS、家用 NAS 或常驻云主机就能轻松胜任。

前置条件仅需 Python ≥ 3.11，以及一个公网可达地址（用于访问 Web UI 与沙箱回调记忆 API）。

## 本地运行

```bash
git clone https://github.com/tao12345666333/ankacloud.git
cd ankacloud
uv sync --frozen
uv run pytest -q        # 跑通全部单元测试，无需外部服务或 API Key
uv run uvicorn ankacloud.main:app --host 127.0.0.1 --port 8000
```

随后在浏览器打开 <http://127.0.0.1:8000>。不填任何 Key 也能跑通测试并体验界面；需要实际拉起沙箱并调用模型时，再配置以下环境变量：

| 变量 | 说明 |
| --- | --- |
| `E2B_API_KEY` | E2B 云沙箱 API Key |
| `OR_KEY` | 模型 API Key（支持 OpenRouter 或任意 OpenAI 兼容端点） |
| `OR_URL` | 接口地址，例如 `https://openrouter.ai/api/v1` |
| `OR_MODEL` | 模型名称，例如 `openai/gpt-4o` |

`OR_*` 仅作兜底配置：一旦你在 Web 的 Providers 面板配好默认 Provider，沙箱、Anka 与记忆整理都会优先采用数据库中的配置。

## 服务器部署（systemd）

```bash
sudo ./deploy/install.sh          # 默认安装至 /opt/ankacloud
sudo nano /etc/ankacloud/env      # 填入 E2B_API_KEY、OR_KEY、OR_URL、OR_MODEL
sudo systemctl enable --now ankacloud
curl http://127.0.0.1:8000/api/health    # {"ok": true}
```

日常升级：

```bash
sudo ./deploy/update.sh
```

更新脚本会自动拉取 `origin/main`、执行 `uv sync`、重启服务并完成健康检查，若检查失败则自动回滚至上一版本。

SSE 流式事件在 Tailscale Serve 与 Nginx 反向代理下均可顺畅运行；仓库内提供了 Nginx 参考配置：`deploy/nginx.conf.example`。

## 公网访问与安全

- `ANKACLOUD_WEB_TOKEN` 留空将关闭 Web API 鉴权，请仅在本地开发阶段这样配置。
- 沙箱通过 `ANKACLOUD_PUBLIC_URL`（或独立配置的 `ANKACLOUD_MEMORY_PUBLIC_URL`）回调控制面。如果你希望将 Web UI 留在 Tailscale 等私有网络中，只需借助 Cloudflare Tunnel 单独暴露记忆 API 路径即可。
- Telegram 通道仅响应白名单内的用户，其余消息一律静默忽略；白名单为空时不会回复任何消息。

## 通过 GitHub 自动部署

仓库内置的 `.github/workflows/deploy.yml` 会在**推送 Tag** 时先执行完整测试，通过后再调用 `deploy/update.sh` 同步至 `/opt/ankacloud`、重启服务、做健康检查，并在异常时自动回滚。

## 下一步

- [仓库里的部署说明](https://github.com/tao12345666333/ankacloud/blob/main/deploy/README.md)
- [Projects：仓库、密钥与 GitHub 凭据](https://github.com/tao12345666333/ankacloud/blob/main/docs/PROJECTS.md)
