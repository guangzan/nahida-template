#!/usr/bin/env bun
import { $ } from "bun"

await Promise.all([$`bun run docker:frontend`, $`bun run docker:backend`])
