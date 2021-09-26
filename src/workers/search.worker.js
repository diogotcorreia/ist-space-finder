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
