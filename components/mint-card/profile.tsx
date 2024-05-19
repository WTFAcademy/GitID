import AvatarInfo from '@/components/avatar-info'
import { useAtomValue } from 'jotai/index'
import { githubUserAtom } from '@/lib/store/mint'
import { useAccount } from 'wagmi'
import {truncate} from "@/lib/truncate";

export const Profile = () => {
  const githubUser = useAtomValue(githubUserAtom);
  const {address} = useAccount()
  return (
    <div className="text-left">
      <h2 className="font-bold text-2xl">Git.ID</h2>
      <div className="flex mt-5 flex-col md:flex-row gap-5 items-center pb-5">
        <div className="flex-1 flex flex-col gap-4">
          <AvatarInfo
            title="GitHub"
            avatar={githubUser.avatar_url}
            name={`@${githubUser.user_name}`}
            account={`${githubUser.user_name}.git`}
          />
          <AvatarInfo
            title="Evm Address"
            avatar={githubUser.avatar_url}
            name={truncate(address!, 10)}
          />
        </div>
      </div>
    </div>
  )
}
