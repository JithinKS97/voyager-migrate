"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractObject = exports.getContractList = void 0;
const AWS = require("aws-sdk");
const prefix = "contract_by_address_";
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
});
const getContractList = async () => {
    const result = await s3
        .listObjects({
        Bucket: process.env.S3_BUCKET_NAME,
        Prefix: prefix,
    })
        .promise();
    return result.Contents.map((content) => content.Key);
};
exports.getContractList = getContractList;
const getContractObject = async (key) => {
    const result = await s3
        .getObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    })
        .promise();
    return JSON.parse(result.Body.toString());
};
exports.getContractObject = getContractObject;
//# sourceMappingURL=s3.js.map