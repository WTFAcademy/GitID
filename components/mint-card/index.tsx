"use client";

import {ReactNode} from "react";
import ConnectSection from "@/components/mint-card/connect-section";
import MintSection from "./mint-section";
import {useAccount} from "wagmi";
import ScoreSection from "@/components/mint-card/score-section";
import {Icons} from "@/components/icons";
import useUser from "@/lib/hooks/use-user";

const RightWrap = ({children}: { children: ReactNode }) => {
    return (
        <div className="w-[366px] bg-gradient-to-r from-[#fff]/25 to-[#fff]/30 rounded-lg px-5 py-3">
            <div className="py-4">{children}</div>
        </div>
    );
};

function MintCard() {
    const {isConnected: isConnectedWallet} = useAccount();
    const {user, isFetching} = useUser();
    const {address} = useAccount()
    const isMinted = !!user?.git_id_mint_info
    const isErrorWallet = user?.git_id_mint_info?.To.toLowerCase() !== address?.toLowerCase()

    const rightContext = () => {
        if (isFetching) {
            return (
                    <div className="h-[200px] flex flex-col items-center justify-center">
                        <Icons.loading className="animate-spin w-6 h-6"/>
                    </div>
            )
        }

        if (isMinted && !isErrorWallet) {
            return <ScoreSection user={user} />
        }

        return <MintSection />
    }

    return (
        <div className="bg-[#6366F129] p-3 rounded flex">
            <ConnectSection/>
            {isConnectedWallet && (
                <RightWrap>
                    {rightContext()}
                </RightWrap>
            )}
        </div>
    );
}

export default MintCard;
