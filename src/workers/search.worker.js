/* eslint no-restricted-globals: 1 */
import Fuse from "fuse.js"

let fuseIndex = null

export async function createIndex(spaces) {
  fuseIndex = new Fuse(spaces, {
    keys: [{ name: "node.name", weight: 5 }, "node.path"],
  })
}

export async function search(search) {
  if (!fuseIndex) return

  return fuseIndex.search(search).map(v => v.item)
}

const HANDLERS = {
  createIndex,
  search,
}

self.addEventListener("message", async event => {
  const msg = event.data

  const handler = HANDLERS[msg.op]
  if (!handler) {
    self.postMessage({ id: msg.id, error: "No handler found" })
  }

  try {
    const result = await handler(...msg.params)
    self.postMessage({ id: msg.id, result })
  } catch (error) {
    console.error(error)
    self.postMessage({ id: msg.id, error: error.message })
  }
})
