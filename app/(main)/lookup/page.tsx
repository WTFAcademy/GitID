"use client";

import { useState } from "react";
import SearchInput from "@/app/(main)/lookup/components/search-input";
import PersonalCard from "@/app/(main)/lookup/components/personal-card";
import { getPersionalInfo } from "@/lib/api/domain";
import { TUser } from "@/types";

function Lookup() {
  const [searchValue, setSearchValue] = useState("smithereens");
  const [personalInfo, setPersonalInfo] = useState<TUser | null>(null);

  const handleSearch = async () => {
    const { data } = await getPersionalInfo(searchValue);
    console.log(data);
    setPersonalInfo(data);
  };

  return (
    <section className="text-center px-4 sm:px-6 max-w-3xl mx-auto">
      <h1 className="text-5xl mt-28 font-bold">Look up Git.ID</h1>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
      />
      <PersonalCard personalInfo={personalInfo} />
    </section>
  );
}

export default Lookup;
