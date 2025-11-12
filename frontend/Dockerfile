FROM node:22-slim AS build

WORKDIR /app

# https://pnpm.io/installation#in-a-docker-container
RUN npm install -g bun

# Cache packages
COPY package.json package.json
COPY bun.lock bun.lock

COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
COPY packages/client/package.json packages/client/package.json

RUN bun install

COPY frontend frontend
COPY backend backend
COPY packages/client packages/client

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app/frontend
RUN bun run build

# -----------
FROM node:22-slim AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=nextjs:nodejs /app/frontend/.next/standalone .

RUN chown nextjs:nodejs apps

USER nextjs

ENV HOSTNAME="0.0.0.0"

CMD ["node", "frontend/server.js"]
