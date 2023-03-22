import * as _ from "lodash"
import { addToVerifiedList } from "./log"

export const executeInParallel = async (fn, args) => {
    const chunks = _.chunk(args, process.env.CHUNK_SIZE)
    const finalResults = []
    for(const chunk of chunks) {
        const promises = getArrayOfPromises(fn, chunk)
        const results = await Promise.all(promises)
        addToVerifiedList(results)
        finalResults.push(...results)
        console.log("")
    }
    return finalResults
}

const getArrayOfPromises = (fn, chunk) => {
    const promises = []
    for(const arg of chunk) {
        promises.push(fn(arg))
    }
    return promises
}