import {Button} from '@/components/ui/button'
import {githubUserAtom, signInfoAtom} from '@/lib/store/mint'
import {useMutation} from '@tanstack/react-query'
import {getDomainMintSignApi, TDomainRequestBody} from '@/lib/api/domain'
import {useSetAtom, useAtom} from 'jotai'
import {useWeb3Modal} from '@web3modal/wagmi/react'
import {useAccount, useChainId, useDisconnect} from 'wagmi'
import {useGithubLogin} from '@/lib/hooks/useGithubLogin'
import {toast} from "sonner";
import {useMint} from "@/lib/hooks/use-mint";
import {useEffect} from "react";
import {Icons} from "@/components/icons";

function ConnectSection() {
    const [githubUser, setGithubUser] = useAtom(githubUserAtom)
    const setSignInfo = useSetAtom(signInfoAtom)
    const {code, login} = useGithubLogin()
    const {address} = useAccount()
    const {nonce} = useMint();
    const chainId = useChainId();
    const {open} = useWeb3Modal()
    const {disconnect} = useDisconnect()

    const {
        data: mintSign,
        mutate: getDomainMintSign,
        isPending: isMintSignLoading,
        isError: isMintSignError,
        error: mintSignError
    } = useMutation({
        mutationKey: ['getMintSign'],
        mutationFn: (data: TDomainRequestBody) => getDomainMintSignApi(data),
        onSuccess: (data) => {
            const res = data.data;
            setSignInfo(res);
            setGithubUser(res?.['user_info']);
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })

    useEffect(() => {
        if (code) {
            console.log('effect')
            getDomainMintSign({
                address: address!,
                chain_id: chainId,
                nonce: Number(nonce),
                code
            })
        }
    }, [code, nonce, address])

    return (
        <div className="flex-1 px-5 py-3 flex flex-col">
            {address && (
                <>
                    <Button className="w-[200px] mt-2 mx-auto" onClick={() => login()}>
                        {isMintSignLoading ? <Icons.loading className="animate-spin w-4 h-4" /> : 'Login with Github'}
                    </Button>
                    <a className="flex items-center justify-center mt-4 text-xs text-content-muted" href="#"
                       onClick={() => disconnect()}>Disconnect Wallet</a>
                </>
            )}
            {!address && <Button className="w-[200px]" onClick={() => open()}>Connect Wallet</Button>}
        </div>
    )
}

export default ConnectSection
