import axios from "axios";
import { CURRENT_URL_BY_NETWORK, COMPILER_VERSIONS } from "./constants"
import { addLog, addToVerifiedList } from "./log";
import { generateResponse } from "./utils";

export const verifyContractOrClass = async (
    verificationDetails
) => {
    const { version, address } = verificationDetails;
    let result = null;
    if(version === null) {
        console.log(`${address}: Version is null, trying all versions`)
        result = await tryWithAllCompilerVersions(verificationDetails)
    } else {
        result = await verify(verificationDetails);
    }
    if(result.error) {
        addLog(`${address}: ${result.message}`)
        return null
    } else {
        console.log(`${address}: ${result.message}`)
        return address
    }
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
            return generateResponse(false, `Verified`)
        }
    } catch (error) {
        return generateResponse(true, JSON.stringify(error.response.data))
    }
}

const tryWithAllCompilerVersions = async (verificationDetails) => {
    const compilerVersions = COMPILER_VERSIONS
    const { address } = verificationDetails;
    for (let i = 0; i < compilerVersions.length; i++) {
        const version = compilerVersions[i];
        console.log(`${address}: Trying with version ${version}`)
        verificationDetails.version = version;
        const result = await verify(verificationDetails);
        if(!result.error) {
            console.log(`${address}: Success with ${version}`)
            return generateResponse(false, `Verified with ${version}`)
        }
    }
    return generateResponse(true, `Failed with all versions`)
}