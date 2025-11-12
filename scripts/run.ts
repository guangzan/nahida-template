#!/usr/bin/env bun
import { readdir } from "node:fs/promises"
import concurrently from "concurrently"

const [, , command] = process.argv

const baseDirectories = ["backend", "frontend", "packages"] as const

const collectFolders = async (base: (typeof baseDirectories)[number]) => {
  try {
    const entries = await readdir(base, { withFileTypes: true })

    return [
      base,
      ...entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => `${base}/${entry.name}`),
    ]
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return []
    }

    throw error
  }
}

const folders = await Promise.all(baseDirectories.map(collectFolders)).then(
  (lists) => [...new Set(lists.flat())]
)

const paths = await Promise.all(
  folders.map(async (path) => {
    const file = Bun.file(`${path}/package.json`)

    if (!(await file.exists())) {
      return
    }

    const packageJson = await file.json()

    if (packageJson.scripts && command in packageJson.scripts) {
      return path
    }
  })
).then((x) => x.filter((x) => x !== undefined))

const colors = ["blue", "green", "magenta", "yellow", "red"]

concurrently(
  paths.map((path, index) => ({
    name: path,
    command: `cd ${path} && bun run ${command}`,
    prefixColor: colors[index % colors.length],
  }))
).result.catch(() => {
  console.error(`Command ${command} not found`)
  process.exit(1)
})
