"use client";

type StatsProps = {
    name: string;
    stats: Array<any>;
};

function Stats() {

    const name = 'tank';
    const stats = [
        {
            statName: 'PR',
            statValue: 10
        }
    ];

    return (
        <div className="w-[350px] h-auto rounded-sm border border-solid border-[#A5B4FC] border-opacity-[48]">
            <div className="p-4">
                <div className="text-[18px] leading-none mb-6 text-[#6366F1]">
                    {name}’s GitHub Stats
                </div>
                <div className="flex">
                    <ul className="flex-col">
                        {stats.map((stat, index)=>(
                            <li className="flex">
                                <p className="">{stat.statName}</p>
                                <p>{stat.statValue}</p>
                            </li>
                        ))}
                    </ul>
                    <div>img</div>
                </div>
            </div>
        </div>
    );
}

export default Stats;
