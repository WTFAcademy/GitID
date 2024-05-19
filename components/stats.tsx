"use client";

type StatsProps = {
  name: string;
  stats: Array<any>;
};

function Stats() {
  const name = "tank";
  const stats = [
    {
      statName: "Total Stars Earned:",
      statValue: "1.1k",
    },
    {
      statName: "Total Commits (2024):",
      statValue: "832",
    },
    {
      statName: "Total PRs:",
      statValue: "154",
    },
    {
      statName: "Total Stars Earned:",
      statValue: "33",
    },
    {
      statName: "Total Stars Earned:",
      statValue: "32",
    },
  ];
  const rank = "A+";

  return (
    <div className="w-[326px] h-auto rounded-lg border border-solid border-[#A5B4FC] border-opacity-[48]">
      <div className="p-4">
        <div className="text-[18px] leading-none mb-6 text-[#6366F1]">
          {name}’s GitHub Stats
        </div>
        <div className="flex items-center justify-between">
          <ul className="flex-col w-[70%]">
            {stats.map((stat, index) => (
              <li
                key={index}
                className="flex my-[6px] font-bold text-xs leading-none text-[#1F2937]"
              >
                <p className="w-[80%]">{stat.statName}</p>
                <p className="w-[20%] flex-shrink-0">{stat.statValue}</p>
              </li>
            ))}
          </ul>
          <div className="relative w-20 h-20">
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <circle
                className="ring-track"
                fill="transparent"
                stroke-dashoffset="270"
                stroke-width="6px"
                stroke="#9c9c9c30"
                cx="50"
                cy="50"
                r="44"
              />
              <circle
                className="loader-ring"
                fill="transparent"
                stroke-width="6px"
                stroke-linecap="round"
                stroke="#6366F1"
                stroke-dashoffset="140"
                stroke-dasharray="276.460 276.460"
                cx="50"
                cy="50"
                r="44"
              />
            </svg>
            <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl leading-none text-[#1F2937] font-bold">
              {rank}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
