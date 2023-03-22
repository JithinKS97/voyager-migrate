import * as AWS from "aws-sdk"
import { CURRENT_BUCKET_NAME_BY_NETWORK } from "./constants"
import { addLog } from "./log"
import { getAddress } from "./verify"

const prefix = "contract_by_address_"

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
})

export const getContractList = async () => {
  const result = await s3
  .listObjects({
    Bucket: CURRENT_BUCKET_NAME_BY_NETWORK,
    Prefix: prefix,
  })
  .promise()
  return result.Contents.map((content) => content.Key)
}

export const getContractObject = async (key: string) => {
  let result;
  try {
    result = await s3
    .getObject({
      Bucket: CURRENT_BUCKET_NAME_BY_NETWORK,
      Key: key,
    })
    .promise()
    return JSON.parse(result.Body.toString())
  } catch(err) {
    const log = `${getAddress(key)}: Unable to parse: ${result.Body.toString()} `
    console.log(log)
    addLog(log)
    return false
  }
}