import { getContract, getContractList } from "./s3"

const main = async () => {
    const contractList = await getContractList()
    const sampleContract = await getContract(contractList[0]) 
    
}

main()