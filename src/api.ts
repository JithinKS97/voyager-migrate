import axios from "axios";
import { CURRENT_URL_BY_NETWORK, COMPILER_VERSIONS } from "./constants"

export const verifyContractOrClass = async (
    verificationDetails
) => {
    const { version, address } = verificationDetails;
    if(version === null) {
        console.log(`${address}: Version is null, trying all versions`)
        await tryWithAllCompilerVersions(verificationDetails)
        return;
    }
    verify(verificationDetails);
};

const createFormData = ({
    version,
    license,
    isAccount,
    name,
    contractPath,
    files
}
) => {
    const formData = new FormData();

    formData.append("compiler-version", version);
    formData.append("license", license);
    formData.append("account-contract", isAccount.toString());
    formData.append("name", name);
    formData.append("contract-name", contractPath);

    Array.from({ length: files.length }).forEach((_, index) => {
        const filesBlob = new Blob([files[index].content], { type: 'plain/text' })
        formData.append(`file${index}`, filesBlob, files[index].path);
    });

    return formData;
}

const verify = async (verificationDetails) => {
    const { address } = verificationDetails;
    try {
        const formData = createFormData(verificationDetails);
        const result = await axios({
            method: "post",
            url: `${CURRENT_URL_BY_NETWORK}/api/contract/${address}/code`,
            data: formData,
            headers: {
                "Content-Type": `multipart/form-data;`,
                "Accept-Encoding": "gzip,deflate,compress",
            },
        });
        if (result.status === 200) {
            console.log(`${address}: success`)
            return true
        }
    } catch (error) {
        if(!error.response.data.message) {
            console.log(`${address}: Failed due to ${error.response.data}`)
        } else {
            console.log(`${address}: Failed due to ${error.response.data.message}`)
        }
        return false    
    }
}

const tryWithAllCompilerVersions = async (verificationDetails) => {
    const compilerVersions = COMPILER_VERSIONS
    const { address } = verificationDetails;
    for (let i = 0; i < compilerVersions.length; i++) {
        const version = compilerVersions[i];
        console.log(`${address}: Trying with version ${version}`)
        verificationDetails.version = version;
        const isSuccess = await verify(verificationDetails);
        if(isSuccess) {
            console.log(`${address}: Success with ${version}`)
            return;
        }
    }
    console.log(`${address}: No version is suppported`)
}