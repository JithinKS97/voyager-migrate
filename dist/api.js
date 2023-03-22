"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyContractOrClass = void 0;
const axios_1 = require("axios");
const constants_1 = require("./constants");
const verifyContractOrClass = async (address, version, license, isAccount, name, contractPath, files) => {
    const formData = new FormData();
    formData.append("compiler-version", version);
    formData.append("license", license);
    formData.append("account-contract", isAccount.toString());
    formData.append("name", name);
    formData.append("contract-name", contractPath);
    Array.from({ length: files.length }).forEach((_, index) => {
        const filesBlob = new Blob([files[index].content], { type: 'plain/text' });
        formData.append(`file${index}`, filesBlob, files[index].path);
    });
    try {
        const result = await (0, axios_1.default)({
            method: "post",
            url: `${constants_1.CURRENT_URL_BY_NETWORK}/api/contract/${address}/code`,
            data: formData,
            headers: {
                "Content-Type": `multipart/form-data;`,
                "Accept-Encoding": "gzip,deflate,compress",
            },
        });
        if (result.status === 200) {
            console.log('verified contract');
        }
    }
    catch (error) {
        console.log('failed to verify contract');
    }
};
exports.verifyContractOrClass = verifyContractOrClass;
//# sourceMappingURL=api.js.map