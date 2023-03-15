"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeInParallel = void 0;
const _ = require("lodash");
const executeInParallel = async (fn, args) => {
    const chunks = _.chunk(args, process.env.CHUNK_SIZE);
    const finalResults = [];
    for (const chunk of chunks) {
        const promises = getArrayOfPromises(fn, chunk);
        const results = await Promise.all(promises);
        finalResults.push(...results);
        console.log(results);
    }
    return finalResults;
};
exports.executeInParallel = executeInParallel;
const getArrayOfPromises = (fn, chunk) => {
    const promises = [];
    for (const arg of chunk) {
        promises.push(fn(arg));
    }
    return promises;
};
//# sourceMappingURL=parallel.js.map