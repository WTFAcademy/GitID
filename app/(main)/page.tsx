import Header from "@/components/page-header";
import MintCard from "../../components/mint-card";

function Main() {
    return (
        <div className="px-4 sm:px-6 pt-32 pb-12 md:pt-44 md:pb-20 flex flex-col items-center">
            <Header className="mb-12">
                Waitlist v1 <span className="text-gray-300 mx-1">·</span> Coming
                Soon
            </Header>
            <MintCard/>
        </div>
    );
}

export default Main;
