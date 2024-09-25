import { useQueryState } from "nuqs";

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
import { Input } from "@/components/ui/input";

const FilteredSearch = () => {
  const [searchTerm, setSearchTerm] = useQueryState("search", {
    defaultValue: ""
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Caută după filtre</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Input
            type="text"
            placeholder="Caută oportunități"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardContent>
      <Accordion type="single" className="mx-4" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Did I work today?</AccordionTrigger>
          <AccordionContent>Yes.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger>Am I super tired/exhausted?</AccordionTrigger>
          <AccordionContent>Yes.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger>Do I just want to go to sleep?</AccordionTrigger>
          <AccordionContent>Yes.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger>Will I play tonight Stardew Valley?</AccordionTrigger>
          <AccordionContent>Yes!</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default FilteredSearch;
