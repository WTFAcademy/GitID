import {request} from "@/lib/api/index";

export type TDomainRequestBody = {
    "address": string;
    "chain_id": number;
    "code": string;
    "nonce": number;
}

export const getDomainMintSignApi = async (data: TDomainRequestBody) => {
    return request.post("/gitid/generateSig", data).then(res => res.data)
}

