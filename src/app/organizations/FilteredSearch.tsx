import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FilteredSearch = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-center space-x-4">
        <div className="max-w-[30%]">
          <Input type="text" placeholder="Caută organizații" />
        </div>
        <Button>Caută</Button>
      </div>
    </>
  );
};

export default FilteredSearch;
