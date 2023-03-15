import { getContract, getContractList } from "./s3"
import { executeInParallel } from "./parallel"
import * as dotenv from "dotenv"

dotenv.config()

const main = async () => {
    const contractList = await getContractList()
    await executeInParallel(getContract, contractList)
}

main()