"use client";

import { ReactNode, useState } from "react";

import ConnectSection from "@/app/(main)/components/mint-card/connect-section";
import { Skeleton } from "@/components/ui/skeleton";
import ScoreSection from "./score-section";
import MintSection from "./mint-section";
import { useAccount } from "wagmi";

const RightWrap = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-1 bg-gradient-to-r from-[#fff]/25 to-[#fff]/30 rounded-lg px-5 py-3">
      <h3 className="font-bold text-lg">--.git</h3>
      <div className="py-4">{children}</div>
    </div>
  );
};

function MintCard() {
  const [isConnectGithub, setIsConnectGithub] = useState(false);
  const { isConnected: isConnectedWallet } = useAccount();
  const [isMinted, setIsMinted] = useState(false);

  return (
    <div className="bg-[#6366F129] p-3 rounded max-w-3xl mx-auto flex">
      <ConnectSection updateConnectGithub={setIsConnectGithub} />
      <>
        {!isConnectGithub && !isConnectedWallet ? (
          <RightWrap>
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-40 mt-5" />
          </RightWrap>
        ) : (
          <RightWrap>
            {!isMinted && <MintSection />}
            {isMinted && <ScoreSection />}
          </RightWrap>
        )}
      </>
    </div>
  );
}

export default MintCard;
