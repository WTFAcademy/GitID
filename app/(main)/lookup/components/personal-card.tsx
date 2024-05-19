import { Skeleton } from "@/components/ui/skeleton";
import AvatarInfo from "@/components/avatar-info";
import Stats from "@/components/stats";
import { TUser } from "@/types";
import { truncate } from "@/lib/truncate";

type TProps = {
  personalInfo: TUser | null;
};

function PersonalWrap({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  return (
    <div className="p-5 text-left bg-gradient-to-r from-[#fff]/25 to-[#fff]/30">
      <h2 className="font-bold text-2xl">{`${name ? name : "--"}.git`}</h2>
      <div className="flex mt-5 flex-col md:flex-row gap-5 items-center pb-5">
        {children}
      </div>
    </div>
  );
}

function PersonalCard({ personalInfo }: TProps) {
  if (!personalInfo) {
    return (
      <PersonalWrap name="">
        <div className="flex-1 flex flex-col gap-4">
          <Skeleton className="h-[200px] w-full" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-[200px] w-full" />
        </div>
      </PersonalWrap>
    );
  }
  return (
    <PersonalWrap name={personalInfo.username}>
      <div className="flex-1 flex flex-col gap-4">
        <AvatarInfo
          title="GitHub"
          avatar={personalInfo.image}
          name={personalInfo.username}
          account={
            personalInfo.git_id_mint_info
              ? personalInfo.git_id_mint_info.Username
              : ""
          }
        />
        <AvatarInfo
          title="Evm Address"
          avatar={personalInfo.image}
          name={
            personalInfo.git_id_mint_info
              ? truncate(personalInfo.git_id_mint_info.To, 10)
              : ""
          }
        />
      </div>
      <div className="flex-1">
        <Stats />
      </div>
    </PersonalWrap>
  );
}

export default PersonalCard;
