import Stats from "@/components/stats";
import {TUser} from "@/types";

type TProps = {
    user: TUser;
}

const ScoreSection = ({user}: TProps) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center py-5 gap-4">
            <h2 className="font-bold text-3xl">{user?.username}.git</h2>
            <Stats {...(user || {} as TUser)} />
        </div>
    );
};

export default ScoreSection;
