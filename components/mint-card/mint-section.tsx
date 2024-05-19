import {Button} from "@/components/ui/button";
import {useMint} from "@/lib/hooks/use-mint";

const MintSection = () => {
    const {
        mint,
        isLoading,
        isError,
        error
    } = useMint();

    return (
        <>
            <h3 className="text-[18px] font-bold mb-10">Mint Git.ID</h3>
            <div className="w-full flex flex-col items-center">
                <h2 className="text-[32px] font-bold mb-6">tank.git</h2>
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
                >
                    {isLoading ? "Minting..." : "Mint"}
                </Button>
            </div>
        </>
    )
};

export default MintSection;
