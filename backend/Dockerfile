FROM oven/bun:1.2.10 AS build

WORKDIR /app

# Cache packages
COPY package.json package.json
COPY bun.lock bun.lock

COPY backend/package.json backend/package.json

RUN bun install

COPY backend backend

ENV NODE_ENV=production

WORKDIR /app/backend
RUN bun run build

ENV NODE_ENV=production
ENV PORT=3001

CMD ["./server"]

EXPOSE 3001

