"use client";

import {ReactNode, useState} from "react";

import ConnectSection from "@/components/mint-card/connect-section";
import MintSection from "./mint-section";
import {useAccount} from "wagmi";
import {githubUserAtom} from "@/lib/store/mint";
import {useAtomValue} from "jotai";
import ScoreSection from "@/components/mint-card/score-section";

const RightWrap = ({children}: { children: ReactNode }) => {
    return (
        <div className="w-[366px] bg-gradient-to-r from-[#fff]/25 to-[#fff]/30 rounded-lg px-5 py-3">
            <div className="py-4">{children}</div>
        </div>
    );
};

function MintCard() {
    const githubUser = useAtomValue(githubUserAtom);
    const {isConnected: isConnectedWallet} = useAccount();
    const [isMinted, setIsMinted] = useState(false);

    return (
        <div className="bg-[#6366F129] p-3 rounded flex">
            <ConnectSection />
            {isConnectedWallet && (
                <RightWrap>
                    {!isMinted && <MintSection/>}
                    {isMinted && <ScoreSection/>}
                </RightWrap>
            )}
        </div>
    );
}

export default MintCard;
