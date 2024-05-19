"use client";

import React, { useState, useEffect } from 'react';

type StatsProps = {
    username: string;
    stars: number,
    followers: number,
    following: number,
    commits_count: number,
    pr_count: number,
    contributed_repo_count: number,
    issues_count: number,
    rank: number,
};

function Stats({
    username,
    stars,
    followers,
    following,
    commits_count,
    pr_count,
    contributed_repo_count,
    issues_count,
    rank = 0,
}: StatsProps) {
    const stats = [
        // {
        //     statName: "Followers:",
        //     statValue: followers,
        // },
        // {
        //     statName: "Following:",
        //     statValue: following,
        // },
        {
            statName: "Total Stars Earned:",
            statValue: stars,
        },
        {
            statName: "Total Commits:",
            statValue: commits_count,
        },
        {
            statName: "Total PRs:",
            statValue: pr_count,
        },
        {
            statName: "Total Contributed Repo:",
            statValue: contributed_repo_count,
        },
        {
            statName: "Total Issues :",
            statValue: issues_count,
        },
    ];

    const [addClass, setAddClass] = useState(false);

    useEffect(() => {

        const ringOffset = (276.46/100 * (100 - rank)) * -1;
        
        document.documentElement.style.setProperty('--ring-offset', `${ringOffset}`);

        const timeout = setTimeout(() => {
            setAddClass(true);
        }, 100);
        
    }, []);

    return (
        <div className="w-[326px] h-auto rounded-lg border border-solid border-[#A5B4FC] border-opacity-[48]">
            <div className="p-4">
                <div className="text-[18px] leading-none mb-6 text-[#6366F1]">
                    {username}’s GitHub Stats
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
                            className="w-full h-full rotate-[-90deg]"
                        >
                            <circle
                                className="ring-track"
                                fill="transparent"
                                strokeDashoffset="270"
                                strokeWidth="6px"
                                stroke="#9c9c9c30"
                                cx="50"
                                cy="50"
                                r="44"
                            />
                            <circle
                                className={addClass ? "ring-dash active" : "ring-dash"}
                                fill="transparent"
                                strokeWidth="6px"
                                strokeLinecap="round"
                                stroke="#6366F1"
                                strokeDasharray="276.460 276.460"
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
