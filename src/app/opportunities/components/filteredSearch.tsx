import { useQueryState } from "nuqs";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORY_OPTIONS } from "@/constants/categoryOptions";
import { REGION_OPTIONS } from "@/constants/regionOptions";

const FilteredSearch = () => {
  const [searchTerm, setSearchTerm] = useQueryState("search", {
    defaultValue: ""
  });

  const [sortOrder, setSortOrder] = useState(null);
  const handleCheckboxChange = (value: any) => {
    setSortOrder(sortOrder === value ? null : value);
  };

  const [timeFilter, setTimeFilter] = useState(null);
  const handleTimeFilterChange = (value: any) => {
    setTimeFilter(timeFilter === value ? null : value);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Caută după filtre</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Input
            type="text"
            placeholder="Caută oportunități"
            value={searchTerm}
            className="mb-[-23px]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardContent>
      <Accordion type="single" className="mx-6" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Locație</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {REGION_OPTIONS.map((region) => (
                <div key={region.value} className="flex items-center space-x-2">
                  <Checkbox id={region.value} />
                  <Label htmlFor={region.value} className="font-body text-sm">
                    {region.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Timp</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="this-week"
                  checked={timeFilter === "this-week"}
                  onCheckedChange={() => handleTimeFilterChange("this-week")}
                />
                <Label htmlFor="this-week" className="font-body text-sm">
                  Săptămâna curentă
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="this-month"
                  checked={timeFilter === "this-month"}
                  onCheckedChange={() => handleTimeFilterChange("this-month")}
                />
                <Label htmlFor="this-month" className="font-body text-sm">
                  Luna curentă
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="next-3-months"
                  checked={timeFilter === "next-3-months"}
                  onCheckedChange={() => handleTimeFilterChange("next-3-months")}
                />
                <Label htmlFor="next-3-months" className="font-body text-sm">
                  Următoarele 3 luni
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Categorii</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {CATEGORY_OPTIONS.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox id={category.value} />
                  <Label htmlFor={category.value} className="font-body text-sm">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Sortează după nr de locuri disponibile</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="asc"
                checked={sortOrder === "asc"}
                onCheckedChange={() => handleCheckboxChange("asc")}
              />
              <Label htmlFor="asc" className="font-body text-sm">
                Crescător
              </Label>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Checkbox
                id="desc"
                checked={sortOrder === "desc"}
                onCheckedChange={() => handleCheckboxChange("desc")}
              />
              <Label htmlFor="desc" className="font-body text-sm">
                Descrescător
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default FilteredSearch;
