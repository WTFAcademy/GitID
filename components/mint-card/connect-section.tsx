import { Button } from '@/components/ui/button'
import { githubUserAtom, signInfoAtom } from '@/lib/store/mint'
import { useMutation } from '@tanstack/react-query'
import { getDomainMintSignApi } from '@/lib/api/domain'
import { useSetAtom, useAtom } from 'jotai'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'
import { useGithubLogin } from '@/lib/hooks/useGithubLogin'
import { useEffect } from 'react'

function ConnectSection () {
  const [githubUser, setGithubUser] = useAtom(githubUserAtom)
  const setSignInfo = useSetAtom(signInfoAtom)
  const {
    mutateAsync: getDomainMintSign,
    isPending: isMintSignLoading,
    isError: isMintSignError,
    error: mintSignError
  } = useMutation({
    mutationKey: ['getMintSign'],
    onMutate: ({ code, address }: { code: string, address: string }) => getDomainMintSignApi(code, address)
  })
  const { open, close } = useWeb3Modal()
  const { address, isConnecting, isDisconnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { code, login } = useGithubLogin()

  useEffect(() => {
    console.log(address, code)
  }, [code])

  return (
    <div className="flex-1 px-5 py-3 flex flex-col">
      {
        address
          ? ''
          : <Button className="w-[200px]" onClick={() => open()}>Connect Wallet</Button>
      }
      {
        address
          ? <Button className="w-[200px] mt-2 mx-auto" onClick={() => login()}>Github Login</Button>
          : ''
      }
      {
        address
          ? <a className="flex items-center justify-center mt-4 text-xs text-content-muted" href="#" onClick={() => disconnect()}>Disconnect Wallet</a>
          : ''
      }
    </div>
  )
}

export default ConnectSection
