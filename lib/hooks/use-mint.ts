import { useWriteContracts } from 'wagmi/experimental'
import mintAbi from '@/config/abi/mint'

const useMint = () => {
    const { writeContracts } = useWriteContracts()

    const mint = (address: string, tokenId: number, signature: string)=>{
        writeContracts({
            contracts: [
                {
                    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
                    abi: mintAbi,
                    functionName: 'mint',
                    args: [
                        address,
                        tokenId,
                        signature
                    ],
                },
            ],
        })
    }
}