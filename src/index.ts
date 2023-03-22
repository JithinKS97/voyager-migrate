import { getContractList } from "./s3"
import { executeInParallel } from "./parallel"
import * as dotenv from "dotenv"
import { verify } from "./verify"
import { getContractsToVerify } from "./log"

dotenv.config()

const main = async () => {
    const contractList = await getContractList()
    const contractListToVerify = getContractsToVerify(contractList)
    console.log(`no of contracts to verify: ${contractListToVerify.length}`)
    await executeInParallel(verify, contractList)
}

main()