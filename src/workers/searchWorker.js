// workers only work client-side
const searchWorker =
  typeof window === "object"
    ? new Worker(new URL("./search.worker.js", import.meta.url))
    : null

const callbackHandler = {
  nextId: 0,
  callbacks: {},
}

function wrapWorkerMethod(methodName) {
  return (...params) =>
    new Promise((resolve, reject) => {
      const id = ++callbackHandler.nextId
      callbackHandler.callbacks[id] = { resolve, reject }
      searchWorker.postMessage({ op: methodName, id, params })
    })
}

searchWorker?.addEventListener("message", event => {
  const msg = event.data
  if (!msg.id) {
    return
  }
  const callback = callbackHandler.callbacks[msg.id]
  if (!callback) {
    return
  }

  if (msg.error) {
    callback.reject(`Error in worker: ${msg.error}`)
    return
  }
  callback.resolve(msg.result)
})

export const search = wrapWorkerMethod("search")
export const createIndex = wrapWorkerMethod("createIndex")
