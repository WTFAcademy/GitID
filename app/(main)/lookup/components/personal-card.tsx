import AvatarInfo from "@/components/avatar-info";
import Stats from "@/components/stats";

function PersonalCard() {
  return (
    <div className="p-5 text-left bg-gradient-to-r from-[#fff]/25 to-[#fff]/30">
      <h2 className="font-bold text-2xl">tank.git</h2>
      <div className="flex mt-5 flex-col md:flex-row gap-5 items-center pb-5">
        <div className="flex-1 flex flex-col gap-4">
          <AvatarInfo
            title="GitHub"
            avatar="https://avatars.githubusercontent.com/u/121724448?v=4"
            name="@tankxu"
            account="tank.git"
          />
          <AvatarInfo
            title="Evm Address"
            avatar="https://avatars.githubusercontent.com/u/121724448?v=4"
            name="0x12345...abcde"
          />
        </div>
        <div className="flex-1">
          <Stats />
        </div>
      </div>
    </div>
  );
}

export default PersonalCard;
