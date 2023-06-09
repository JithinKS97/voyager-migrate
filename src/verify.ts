import { getContractObject  }  from "./s3"
import { verifyContractOrClass } from "./api"

export const verify = async (key:string) => {
    const contract = await getContractObject(key)
    if(!contract) return
    const address = getAddress(key)
    let files, contractDetails, otherDetails
    if(isContractObjectOnlyCode(contract)){
        files = getFilesForOnlyCode(contract)
        contractDetails = getVerifiedContractDetailsForOnlyCode()
        otherDetails = getOtherDetailsForOnlyCode()
    } else {
        if(isCodePropertyArray(contract)) {
            files = getFilesForCodeArray(contract)
        } else {
            files = getFilesForCodeObject(contract)
        }
        contractDetails = getVerifiedContractDetails(contract)
        otherDetails = getOtherDetails(contract)
    }
    return await verifyContractOrClass(
        {
            address,
            version: otherDetails.compilerVersion,
            license: otherDetails.license,
            isAccount: otherDetails.accountContract,
            name: contractDetails.name,
            contractPath: contractDetails.path,
            files
        }
    )
}

export const getAddress = (key) => {
    return key.split('contract_by_address_')[1]
}

const getFilesForOnlyCode = (contract) => {
    const files = [{
        path:'contract.cairo',
        content: contract.join('\n'),
    }]
    return files
}

const getVerifiedContractDetailsForOnlyCode = () => {
    const contractDetails = {
        name:'contract',
        path:'contract.cairo',
    }
    return contractDetails
}

const getOtherDetailsForOnlyCode = () => {
    const otherDetails = {
        compilerVersion: null,
        accountContract: false,
        license: 'No License (None)',
    }
    return otherDetails;
}

const getFilesForCodeArray = (contract) => {
    const content = contract.code.join('\n')
    const files = [{
        path: getVerifiedContractName(contract),
        content,
    }]
    return files
}

const getFilesForCodeObject = (contract) => {
    const fileNames = Object.keys(contract.code)
    const files = []
    for(let fileName of fileNames) {
        const file = {
            path: fileName,
            content: contract.code[fileName].join('\n'),
        }
        files.push(file)
    }
    return files
}

const getVerifiedContractDetails = (contract) => {
    const path = getVerifiedContractName(contract)
    let name = getName(contract)
    return {
        path,
        name
    }
}


const getOtherDetails = (contract) => {
    return {
        compilerVersion: contract.compilerVersion || null,
        accountContract: false,
        license: contract.license || 'No License (None)',
    }
}

const getVerifiedContractName = (contract) => {
    return contract.verifiedContractName || 'contract.cairo'
}

const getName = (contract) => {
    const verifiedContractName = getVerifiedContractName(contract)
    let name = contract.name
    if(!name) {
        name = verifiedContractName.split('.')[0]
        name = name.split('/').pop()
    }
    return name;
}

const isContractObjectOnlyCode = (contract) => {
    return isArray(contract)
}

const isArray = (element) => {
    return Array.isArray(element)
}

const isCodePropertyArray = (contract) => {
    return isArray(contract.code)
}