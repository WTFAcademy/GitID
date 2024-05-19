"use client";

import {ReactNode, useState} from "react";

import ConnectSection from "@/components/mint-card/connect-section";
import MintSection from "./mint-section";
import {useAccount} from "wagmi";
import {githubUserAtom} from "@/lib/store/mint";
import {useAtomValue} from "jotai";
import ScoreSection from "@/components/mint-card/score-section";
import {useQuery} from "@tanstack/react-query";
import {getPersionalInfo} from "@/lib/api/domain";

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
    const {data: user} = useQuery({
        queryKey: ['getUserInfo', githubUser?.['user_name']],
        queryFn: () => getPersionalInfo(githubUser?.['user_name']).then(res => res.data),
    })
    const isMinted = !!user?.git_id_mint_info

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
