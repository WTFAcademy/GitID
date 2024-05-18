import {Button} from "@/components/ui/button";
import {useAtom} from "jotai/react/useAtom";
import {githubUserAtom, signInfoAtom} from "@/lib/store/mint";
import {useMutation} from "@tanstack/react-query";
import {getDomainMintSignApi} from "@/lib/api/domain";
import {useSetAtom} from "jotai";

function ConnectSection() {
    const [githubUser, setGithubUser] = useAtom(githubUserAtom)
    const setSignInfo = useSetAtom(signInfoAtom);
    const {
        mutateAsync: getDomainMintSign,
        isPending: isMintSignLoading,
        isError: isMintSignError,
        error: mintSignError
    } = useMutation({
        mutationKey: ["getMintSign"],
        onMutate: ({code, address}: { code: string, address: string }) => getDomainMintSignApi(code, address)
    })

    return (
        <div className="flex-1 px-5 py-3">
            <Button className="w-[200px]">Connect Wallet</Button>
        </div>
    );
}

export default ConnectSection;
