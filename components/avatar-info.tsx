import Image from "next/image";

type TInfo = {
  title?: string;
  avatar: string;
  name: string;
  account?: string;
};

function AvatarInfo({ title, avatar, name, account }: TInfo) {
  return (
    <div>
      {title && <div className="text-sm text-[#6B7280CC]">{title}</div>}
      <div className="flex items-center gap-2 mt-3">
        <Image src={avatar} width={48} height={48} className="rounded-full" alt="" />
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">{name}</div>
          {account && (
            <div className="text-sm text-[#1F2937]/35">{account}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AvatarInfo;
