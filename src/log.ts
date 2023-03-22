const fs = require('fs');
import { CURRENT_NETWORK } from "./constants";

export const addLog = (log) => {
    const timestamp = new Date().toLocaleString();
    const logToAdd = `${timestamp}: ${log}\n`;
    fs.appendFileSync(`logs/${CURRENT_NETWORK}_log.txt`, logToAdd);
}

export const addToVerifiedList = (contractAddresses) => {
    contractAddresses = contractAddresses.filter((address) => address !== null)
    let verifiedContracts = fs.readFileSync(`logs/${CURRENT_NETWORK}_verified.json`, 'utf8')
    verifiedContracts = JSON.parse(verifiedContracts)
    const verifiedContractsSet = new Set(verifiedContracts)
    for(const contractAddress of contractAddresses) {
        verifiedContractsSet.add(contractAddress)
    }
    const verifiedContractsArray = Array.from(verifiedContractsSet)
    fs.writeFileSync(`logs/${CURRENT_NETWORK}_verified.json`, JSON.stringify(verifiedContractsArray))
}

export const getContractsToVerify = (contractKeys) => {
    const verifiedContracts = require(`../logs/${CURRENT_NETWORK}_verified.json`)
    const verifiedContractsSet = new Set(verifiedContracts)
    console.log(`No of verified contracts: ${verifiedContractsSet.size}`)
    
    const addressesToVerify = contractKeys.map((key) => key.split('contract_by_address_')[1])
    const filteredList = addressesToVerify.filter((address) => !verifiedContractsSet.has(address))

    return filteredList.map((address) => `contract_by_address_${address}`,)
}