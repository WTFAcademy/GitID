import {request} from "@/lib/api/index";

export const getDomainMintSignApi = async (name: string, address: string) => {
    return {
        name,
        address,
        signature: "0x1234567890",
        isFree: true
    }
    // return request.post("/sign", {
    //     name,
    //     address
    // }).then(res => res.data)
}

