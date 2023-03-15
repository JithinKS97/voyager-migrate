"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s3_1 = require("./s3");
const parallel_1 = require("./parallel");
const dotenv = require("dotenv");
dotenv.config();
const main = async () => {
    const contractList = await (0, s3_1.getContractList)();
    (0, parallel_1.executeInParallel)(s3_1.getContract, contractList);
};
main();
//# sourceMappingURL=index.js.map