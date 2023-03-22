import { getContractList } from "./s3"
import { executeInParallel } from "./parallel"
import * as dotenv from "dotenv"
import { verify } from "./verify"

dotenv.config()

const main = async () => {
    const contractList = await getContractList()
    const result = await verify(contractList[0])
    // await executeInParallel(verify, contractList)
}

main()