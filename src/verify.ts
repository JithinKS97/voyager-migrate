import { getContract  }  from "./s3"

export const verify = async (key:string) => {
    const contract = await getContract(key)
    // call verify api
}