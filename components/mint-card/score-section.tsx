import {useQuery} from "@tanstack/react-query";
import {getPersionalInfo} from "@/lib/api/domain";
import {useAtomValue} from "jotai/index";
import {githubUserAtom} from "@/lib/store/mint";
import Stats from "@/components/stats";
import {Icons} from "@/components/icons";
import {TUser} from "@/types";

const ScoreSection = () => {
  const githubUser = useAtomValue(githubUserAtom);
  const {data: user, isFetching} = useQuery({
    queryKey: ['getUserInfo', githubUser?.['user_name']],
    queryFn: () => getPersionalInfo(githubUser?.['user_name']).then(res => res.data),
  })

  return (
      <div className="w-full h-full flex flex-col items-center justify-center py-5 gap-4">
        {isFetching && <Icons.loading className="animate-spin w-6 h-6" />}
        {!isFetching && (
            <>
              <h2 className="font-bold text-3xl">{user!.username}.git</h2>
              <Stats {...(user || {} as TUser)} />
            </>
        )}
      </div>
  );
};

export default ScoreSection;
