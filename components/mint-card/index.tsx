"use client";

import {ReactNode, useState} from "react";

import ConnectSection from "@/components/mint-card/connect-section";
import ScoreSection from "./score-section";
import MintSection from "./mint-section";
import {useAccount} from "wagmi";
import {githubUserAtom} from "@/lib/store/mint";
import {useAtomValue} from "jotai";

const RightWrap = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex-1 bg-gradient-to-r from-[#fff]/25 to-[#fff]/30 rounded-lg px-5 py-3">
            <h3 className="font-bold text-lg">--.git</h3>
            <div className="py-4">{children}</div>
        </div>
    );
};

function MintCard() {
    const githubUser = useAtomValue(githubUserAtom);
    const {isConnected: isConnectedWallet} = useAccount();
    const [isMinted, setIsMinted] = useState(false);

    console.log(githubUser);

    return (
        <div className="bg-[#6366F129] p-3 rounded mx-auto flex" style={{width: "max-content"}}>
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
