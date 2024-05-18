import {Button} from "@/components/ui/button";
import {useAtom} from "jotai/react/useAtom";
import {githubUserAtom} from "@/lib/store/mint";

function ConnectSection() {
    const [githubUser, setGithubUser] = useAtom(githubUserAtom)

    return (
        <div className="flex-1 px-5 py-3">
            <Button className="w-[200px]">Connect Wallet</Button>
        </div>
    );
}

export default ConnectSection;
