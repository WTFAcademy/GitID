import {parseAbi} from "viem";
import {useAtomValue} from "jotai";
import {signInfoAtom} from "@/lib/store/mint";
import {useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract} from "wagmi";

const abi = parseAbi([
    "function mintGitID(address to, string memory username, bool isFree, uint256 deadline, bytes memory signature) external payable",
    "function nonces(address) external view returns (uint256)"
])

export function useMint() {
    const {
        data: hash,
        writeContract,
        isPending: isContractLoading,
        isError: isContractError,
        error: contractError
    } = useWriteContract()
    const signInfo = useAtomValue<any>(signInfoAtom);
    const {address} = useAccount();

    const {data, isLoading, isError, error, isSuccess} =
        useWaitForTransactionReceipt({
            hash
        })

    const mint = async () => {
        const {
            name,
            sig,
            is_free,
            deadline,
            address,
        } = (signInfo || {}) as any
        writeContract({
            abi,
            address: "0xfA2d668585972eE40321dfbe73775C4823e9a123",
            functionName: 'mintGitID',
            args: [
                address,
                name,
                is_free,
                deadline,
                sig
            ]
        })
    }

    const {
        data: nonce
    } = useReadContract({
        abi,
        address: "0xfA2d668585972eE40321dfbe73775C4823e9a123",
        functionName: 'nonces',
        args: [address!]
    })

    return {
        mint,
        nonce,
        isLoading: isContractLoading || isLoading,
        isError: isContractError || isError,
        // @ts-ignore
        error: contractError?.shortMessage || error?.shortMessage || "Unknown error",
        hash,
        isSuccess
    }
}
