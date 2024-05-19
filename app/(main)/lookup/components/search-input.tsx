import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SearchInput() {
  return (
    <div className="w-full my-12 flex items-center gap-3">
      <Input placeholder="wtf.git" className="w-full" />
      <Button>Look up</Button>
    </div>
  );
}
export default SearchInput;
