import SearchWorker from "./search.worker.js"

const searchWorker = typeof window === "object" && new SearchWorker()

export default searchWorker
