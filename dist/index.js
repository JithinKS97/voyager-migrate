"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s3_1 = require("./s3");
const dotenv = require("dotenv");
const verify_1 = require("./verify");
dotenv.config();
const main = async () => {
    const contractList = await (0, s3_1.getContractList)();
    (0, verify_1.verify)(contractList[1]);
    // await executeInParallel(verify, contractList)
};
main();
//# sourceMappingURL=index.js.map