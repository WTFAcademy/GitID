import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

type TProps = {
  updateConnectGithub: Dispatch<SetStateAction<boolean>>;
};

function ConnectSection(props: TProps) {
  return (
    <div className="flex-1 px-5 py-3">
      <h3 className="font-bold text-lg">Git.ID</h3>
      <div className="flex flex-col items-center gap-3 pt-5">
        <Button className="w-full">Connect GitHub</Button>
        <span>or</span>
        <Button className="w-full">Connect Wallet</Button>
      </div>
    </div>
  );
}

export default ConnectSection;
