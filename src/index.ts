import { getContract, getContractList } from "./s3"
import { executeInParallel } from "./parallel"
import * as dotenv from "dotenv"
import { verify } from "./verify"

dotenv.config()

const main = async () => {
    const contractList = await getContractList()
    await executeInParallel(verify, contractList)
}

main()