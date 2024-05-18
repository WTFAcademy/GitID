import { useWriteContracts } from 'wagmi/experimental'
import mintAbi from '@/config/abi/mint'

function App() {
    const { writeContracts } = useWriteContracts()

    const mint = ()=>{
        writeContracts({
            contracts: [
                {
                    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
                    abi: mintAbi,
                    functionName: 'mint',
                    args: [
                        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                        '1234',
                        'xxxxxx'
                    ],
                },
            ],
        })
    }
}