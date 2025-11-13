import { Elysia } from "elysia"
import { BunAdapter } from "elysia/adapter/bun"
import { api } from "./api/v1"
import { corsModule } from "./modules/cors"
import { openapiModule } from "./modules/openapi"
import { otelModule } from "./modules/otel"
import { env } from "./utils/env"

const app = new Elysia({
  name: "api",
  aot: true,
  adapter: BunAdapter,
  nativeStaticResponse: true,
  normalize: true,
  precompile: true,
  strictPath: false,
})
  .use(openapiModule)
  .use(otelModule)
  .use(corsModule)
  .use(api)
  .listen(env.PORT)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

console.log(
  `📚 OpenAPI documentation is running at http://${app.server?.hostname}:${app.server?.port}/openapi`
)

export type App = typeof app
