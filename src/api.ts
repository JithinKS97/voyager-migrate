import axios from "axios";
import { CURRENT_URL_BY_NETWORK } from "./constants"

export const verifyContractOrClass = async (
    address: string,
    version: string,
    license: string,
    isAccount: boolean,
    name: string,
    contractPath: string,
    files: { path: string; content: string }[]
  ) => {
    const formData = new FormData();

    formData.append("compiler-version", version);
    formData.append("license", license);
    formData.append("account-contract", isAccount.toString());
    formData.append("name", name);
    formData.append("contract-name", contractPath);

    // console.log(address, version, license, isAccount, name, contractPath, files)

    Array.from({ length: files.length }).forEach((_, index) => {
        const details = JSON.stringify({
            filename: files[index].path,
            filepath: files[index].path,
        })
        const filesBlob = new Blob([files[index].content], { type : 'plain/text' })
        formData.append(`file${index}`, filesBlob, details);
    });
  
    try {
        const result = await axios({
        method: "post",
        url: `${CURRENT_URL_BY_NETWORK}/api/contract/${address}/code`,
        data: formData,
        headers: {
                //@ts-ignore
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                "Accept-Encoding": "gzip,deflate,compress",
            },
        });
        // console.log(result)
    } catch (error) {
        console.log('failed to verify contract')
        // console.log(error)
    }
  };