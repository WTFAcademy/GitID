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
import {Icons} from "@/components/icons";

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
    const {data: user, isFetching} = useQuery({
        queryKey: ['getUserInfo', githubUser?.['user_name']],
        queryFn: () => getPersionalInfo(githubUser?.['user_name']).then(res => res.data),
        enabled: !!githubUser?.['user_name']
    })
    const {address} = useAccount()
    const isMinted = !!user?.git_id_mint_info
    const isErrorWallet = user?.git_id_mint_info?.To.toLowerCase() !== address?.toLowerCase()

    return (
        <div className="bg-[#6366F129] p-3 rounded flex">
            <ConnectSection/>
            {isConnectedWallet && (
                <RightWrap>
                    {isMinted && !isErrorWallet ? <ScoreSection/> : <MintSection/>}
                    {/*{isFetching && (*/}
                    {/*    <div className="h-[200px] flex flex-col items-center justify-center">*/}
                    {/*        <Icons.loading className="animate-spin w-6 h-6" />*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </RightWrap>
            )}
        </div>
    );
}

export default MintCard;
