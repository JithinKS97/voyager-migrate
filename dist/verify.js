"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const s3_1 = require("./s3");
const verify = async (key) => {
    const contract = await (0, s3_1.getContractObject)(key);
    let files, contractDetails;
    if (isContractObjectOnlyCode(contract)) {
        files = getFilesForOnlyCode(contract);
        contractDetails = getContractDetailsForOnlyCode(contract);
    }
    else if (isCodePropertyArray(contract)) {
        files = getFilesForCodeArray(contract);
        contractDetails = getVerifiedContractNameAndName(contract);
    }
    else {
        files = getFilesForCodeObject(contract);
        contractDetails = getVerifiedContractNameAndName(contract);
    }
    console.log(files, contractDetails);
};
exports.verify = verify;
const getFilesForOnlyCode = (contract) => {
    const files = [{
            name: 'contract.cairo',
            content: contract.join('\n'),
        }];
    return files;
};
const getContractDetailsForOnlyCode = (contract) => {
    const contractDetails = {
        name: 'contract',
        path: 'contract.cairo',
    };
    return contractDetails;
};
const getFilesForCodeArray = (contract) => {
    const content = contract.code.join('\n');
    const files = [{
            name: getVerifiedContractName(contract),
            content,
        }];
    return files;
};
const getFilesForCodeObject = (contract) => {
    const fileNames = Object.keys(contract.code);
    const files = [];
    for (let fileName of fileNames) {
        const file = {
            name: fileName,
            content: contract.code[fileName].join('\n'),
        };
        files.push(file);
    }
    return files;
};
const getVerifiedContractNameAndName = (contract) => {
    const verifiedContractName = getVerifiedContractName(contract);
    let name = getName(contract);
    return {
        verifiedContractName,
        name
    };
};
const getVerifiedContractName = (contract) => {
    return contract.verifiedContractName || 'contract.cairo';
};
const getName = (contract) => {
    const verifiedContractName = getVerifiedContractName(contract);
    let name = contract.name;
    if (!name) {
        name = verifiedContractName.split('.')[0];
    }
    return name;
};
const isContractObjectOnlyCode = (contract) => {
    return isArray(contract);
};
const isArray = (element) => {
    return Array.isArray(element);
};
const isCodePropertyArray = (contract) => {
    return isArray(contract.code);
};
/**
 * Different types of contract
 * 1. code is a an array of one element
 *    contract-name and name is not present
 *
 * 2. code is a dictionary with multiple files
 *    contract-name and name is present
 *
 * 3. code is an array of one element
 *    contract-name is present, but name is not present
 *
 * 4. code is an array of multiple files
 *    contract-name is not present, name is also not present
 *
 * 5. code is a dictionary with multiple files
 *    contract-name is not present, name is also not present
 *
 * 6. Just an array of code with single element
 *
 * 7. code is an array of one file
 *    contract-name is present, name is also present
 */ 
//# sourceMappingURL=verify.js.map