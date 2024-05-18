import {parseAbi} from "viem";
import {useAtomValue} from "jotai";
import {signInfoAtom} from "@/lib/store/mint";
import {useWriteContract} from "wagmi";

const abi = parseAbi([
    "function mintGitID(address to, string memory username, bool isFree, uint256 deadline, bytes memory signature) external payable"
])

export function useMint() {
    const {
        writeContract,
        isPending: isContractLoading,
        isError: isContractError,
        error: contractError
    } = useWriteContract()
    const signInfo = useAtomValue(signInfoAtom);

    const mint = async () => {
        const {
            name,
            signature,
            isFree,
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
                isFree,
                deadline,
                signature
            ]
        })
    }

    return {
        mint,
        isLoading: isContractLoading,
        isError: isContractError,
        // @ts-ignore
        error: contractError?.shortMessage || "Unknown error"
    }
}
