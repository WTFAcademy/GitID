import SearchInput from "@/app/(main)/lookup/components/search-input";
import PersonalCard from "@/app/(main)/lookup/components/personal-card";

function Lookup() {
  return (
    <section className="text-center px-4 sm:px-6 max-w-3xl mx-auto">
      <h1 className="text-5xl mt-28 font-bold">Look up Git.ID</h1>
      <SearchInput />
      <PersonalCard />
    </section>
  );
}

export default Lookup;
