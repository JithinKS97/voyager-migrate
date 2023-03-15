"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const AWS = require("aws-sdk");
dotenv.config();
const prefix = "contract_by_address_";
const bucketName = process.env.S3_BUCKET_NAME;
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
});
const getContractList = async () => {
    const result = await s3
        .listObjects({
        Bucket: bucketName,
        Prefix: prefix,
    })
        .promise();
    return result.Contents.map((content) => content.Key);
};
const getContract = async (key) => {
    const result = await s3
        .getObject({
        Bucket: bucketName,
        Key: key,
    })
        .promise();
    return JSON.parse(result.Body.toString());
};
const main = async () => {
    const contractList = await getContractList();
    const sampleContract = await getContract(contractList[0]);
    console.log(sampleContract);
};
main();
//# sourceMappingURL=index.js.map