// Everything the pages link to lives here, so a moved repository or a new
// release only needs one edit.

export const REPO_URL = "https://github.com/tao12345666333/ankacloud";
export const REPO = "tao12345666333/ankacloud";
export const VERSION = "1.0.0";
export const IMAGE = "ghcr.io/tao12345666333/ankacloud";
export const ANKALOOP_URL = "https://github.com/ankaloop";
export const E2B_URL = "https://e2b.dev";
export const UV_URL = "https://github.com/astral-sh/uv";
export const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;

export const DOCS = {
  quickstart: `${REPO_URL}#quick-start-local-development`,
  docker: `${REPO_URL}#run-with-docker`,
  design: `${REPO_URL}/blob/main/docs/DESIGN.md`,
  projects: `${REPO_URL}/blob/main/docs/PROJECTS.md`,
  skills: `${REPO_URL}/blob/main/docs/SKILLS.md`,
  deploy: `${REPO_URL}/blob/main/deploy/README.md`,
  contributing: `${REPO_URL}/blob/main/CONTRIBUTING.md`,
};

/** The commands from the README, kept in one place for both languages. */
export const INSTALL = {
  clone: `git clone ${REPO_URL}.git`,
  sync: "uv sync --frozen",
  run: "uv run uvicorn ankacloud.main:app \\\n    --host 127.0.0.1 --port 8000",
  install: "sudo ./deploy/install.sh",
  docker: `docker run -d -p 8000:8000 \\\n    -v ankacloud-data:/data --env-file .env \\\n    ${IMAGE}:1`,
  env: ["E2B_API_KEY", "OR_KEY", "OR_URL", "OR_MODEL"],
};
