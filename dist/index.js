"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s3_1 = require("./s3");
const parallel_1 = require("./parallel");
const dotenv = require("dotenv");
const verify_1 = require("./verify");
dotenv.config();
const main = async () => {
    const contractList = await (0, s3_1.getContractList)();
    // const result = await verify(contractList[2])
    await (0, parallel_1.executeInParallel)(verify_1.verify, contractList);
};
main();
//# sourceMappingURL=index.js.map