import {useQuery} from "@tanstack/react-query";
import {getPersionalInfo} from "@/lib/api/domain";
import {useAtomValue} from "jotai/index";
import {githubUserAtom} from "@/lib/store/mint";


const useUser = () => {
    const githubUser = useAtomValue(githubUserAtom);
    const userName = githubUser?.user_name;
    const {data, isFetching} = useQuery({
        queryKey: ['getUserInfo', userName],
        queryFn: () => getPersionalInfo(userName),
        enabled: !!userName,
    })

    return {
        user: data?.data,
        isFetching
    }
}

export default useUser;
