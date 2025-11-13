import { authInstance } from "@backend/libs/auth-instance"
import { openapi } from "@elysiajs/openapi"

let _schema: ReturnType<typeof authInstance.api.generateOpenAPISchema>

const getSchema = () => {
  if (!_schema) {
    _schema = authInstance.api.generateOpenAPISchema()
  }
  return _schema
}

export const OpenAPI = {
  getPaths: (prefix = "/api/v1/auth") =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null)

      for (const path of Object.keys(paths)) {
        const key = prefix + path
        reference[key] = paths[path]

        for (const method of Object.keys(paths[path])) {
          // biome-ignore lint/suspicious/noExplicitAny: x
          const operation = (reference[key] as any)[method]

          operation.tags = ["Better Auth"]
        }
      }

      return reference
      // biome-ignore lint/suspicious/noExplicitAny: x
    }) as Promise<any>,
  // biome-ignore lint/suspicious/noExplicitAny: x
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const

export const openapiModule = openapi({
  path: "/openapi",
  scalar: {
    hideClientButton: true,
    showToolbar: "never",
    defaultHttpClient: {
      targetKey: "node",
      clientKey: "fetch",
    },
  },
  documentation: {
    components: await OpenAPI.components,
    paths: await OpenAPI.getPaths(),
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
})
