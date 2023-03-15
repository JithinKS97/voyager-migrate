import * as dotenv from "dotenv"
import * as AWS from "aws-sdk"

const prefix = "contract_by_address_"
const bucketName = process.env.S3_BUCKET_NAME!
dotenv.config()

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
})

export const getContractList = async () => {
    const result = await s3
    .listObjects({
      Bucket: bucketName,
      Prefix: prefix,
    })
    .promise()
    return result.Contents.map((content) => content.Key)
}

export const getContract = async (key: string) => {
    const result = await s3
    .getObject({
      Bucket: bucketName,
      Key: key,
    })
    .promise()
    return JSON.parse(result.Body.toString())
}