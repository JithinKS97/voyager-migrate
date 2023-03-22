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


    Array.from({ length: files.length }).forEach((_, index) => {
        const filesBlob = new Blob([files[index].content], { type : 'plain/text' })
        formData.append(`file${index}`, filesBlob, files[index].path);
    });
    try {
        const result = await axios({
        method: "post",
        url: `${CURRENT_URL_BY_NETWORK}/api/contract/${address}/code`,
        data: formData,
        headers: {
                "Content-Type": `multipart/form-data;`,
                "Accept-Encoding": "gzip,deflate,compress",
            },
        });
        if(result.status === 200) {
            console.log('verified contract')
        }
    } catch (error) {
        console.log('failed to verify contract')
    }
  };