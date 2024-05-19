import {Button} from "@/components/ui/button";
import {useMint} from "@/lib/hooks/use-mint";
import {useAtomValue} from "jotai/index";
import {signInfoAtom} from "@/lib/store/mint";
import {truncate} from "@/lib/truncate";
import Link from "next/link";

const MintSection = () => {
    const {
        mint,
        isLoading,
        isError,
        error,
        hash,
        isSuccess
    } = useMint();
    const signInfo = useAtomValue<any>(signInfoAtom);

    if (isSuccess) {
        return (
            <div className="w-full flex flex-col items-center">
                <p className="text-[50px] mb-4 leading-none">🎉</p>
                <h2 className="text-[32px] font-bold mb-6">{signInfo?.['name']}.git</h2>
                <div className="relative flex-col text-center w-full p-4 border border-solid border-[#A5B4FC7A] rounded-lg">
                    <h2 className="text-[#6B7280CC] text-xs mb-1">Transaction</h2>
                    <Link href={`https://etherscan.io/tx/${hash}`} className="text-[#4F46E5] w-full text-center">
                        {truncate(hash!, 10)}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <h3 className="text-[18px] font-bold mb-10">Mint Git.ID</h3>
            <div className="w-full flex flex-col items-center">
                <h2 className="text-[32px] font-bold mb-6">
                    {signInfo?.['name'] ? signInfo?.['name'] + ".git" : (
                        <>
                            <span className="text-gray-400 font-bold">_ _</span>
                            .git
                        </>
                    )}
                </h2>
                <div className="flex flex-col items-center space-y-[10px] mb-[56px]">
                    <span className="text-gray-400 text-xs font-bold">Mint price</span>
                    <div
                        className="py-2 px-6 rounded-lg bg-white w-auto shadow"
                    >Free
                    </div>
                    <span className="text-gray-400 text-xs">Congratulation your are in top 1000 Web3 Github repo</span>
                </div>
            </div>
            <div className="w-full flex flex-col items-center gap-2">
                {isError ? <span className="text-xs text-destructive">{error}</span> :
                    <span className="text-xs">Connect your wallet and go on</span>}
                <Button
                    variant={isError ? "destructive" : "default"}
                    className="w-full"
                    onClick={mint}
                    disabled={!signInfo?.['sig']}
                >
                    {isLoading ? "Minting..." : "Mint"}
                </Button>
            </div>
        </>
    )
};

export default MintSection;
