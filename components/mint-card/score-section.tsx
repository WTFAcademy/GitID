import {useQuery} from "@tanstack/react-query";
import {getPersionalInfo} from "@/lib/api/domain";
import {useAtomValue} from "jotai/index";
import {githubUserAtom} from "@/lib/store/mint";

const ScoreSection = () => {
  const githubUser = useAtomValue(githubUserAtom);
  const {data: user} = useQuery({
    queryKey: ['getUserInfo', githubUser?.['user_name']],
    queryFn: () => getPersionalInfo(githubUser?.['user_name']).then(res => res.data),
  })

  console.log(user);
  return <div />;
};

export default ScoreSection;
