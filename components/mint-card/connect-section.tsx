import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

type TProps = {
  updateConnectGithub: Dispatch<SetStateAction<boolean>>;
};

function ConnectSection(props: TProps) {
  return (
    <div className="flex-1 px-5 py-3">
        <Button className="w-[200px]">Connect Wallet</Button>
    </div>
  );
}

export default ConnectSection;
