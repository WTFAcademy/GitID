import {useWriteContracts} from 'wagmi/experimental'
import {useMutation} from "@tanstack/react-query";
import {getDomainMintSignApi} from "@/lib/api/domain";
import {parseAbi} from "viem";

const abi = parseAbi([
    "function mintGitID(address to, string memory username, bool isFree, uint256 deadline, bytes memory signature) external"
])

// TODO: format error message
const formatContractErrorMessage = (message: string) => {
    if (message.includes("Already minted!")) {
        return "已铸造完成，请勿重复进行！";
    }

    if (message.includes("SoulId is not created yet")) {
        return "该认证NFT还未进行未创建";
    }

    if (message.includes("mint has not started")) {
        return "铸造还未开放，请等待";
    }

    if (message.includes("mint has ended")) {
        return "铸造已经结束";
    }

    if (message.includes("Invalid signature")) {
        return "错误的签名";
    }

    if (message.includes("User denied transaction signature.")) {
        return "拒绝交易";
    }

    return "领取错误，请重试";
};

export function useMint() {
    const {
        writeContractsAsync,
        isPending: isContractLoading,
        isError: isContractError,
        error: contractError
    } = useWriteContracts()
    const {
        mutateAsync: getDomainMintSign,
        isPending: isMintSignLoading,
        isError: isMintSignError,
        error: mintSignError
    } = useMutation({
        mutationKey: ["getMintSign"],
        onMutate: ({code, address}: { code: string, address: string }) => getDomainMintSignApi(code, address)
    })

    const mint = async (code: string, address: '0x${string}`') => {
        const signInfo = await getDomainMintSign({code, address})
        if (!signInfo) {
            return
        }

        const {
            name,
            signature,
            isFree,
            deadline
        } = (signInfo || {}) as { name: string; isFree: boolean; signature: string; deadline: number }
        await writeContractsAsync({
            contracts: [
                {
                    abi,
                    address,
                    functionName: 'mintGitID',
                    args: [
                        address,
                        name,
                        isFree,
                        deadline,
                        signature
                    ]
                }
            ]
        })
    }

    return {
        mint,
        isLoading: isContractLoading || isMintSignLoading,
        isError: isContractError || isMintSignError,
        error: contractError || mintSignError
    }
}
