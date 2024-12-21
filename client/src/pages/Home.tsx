import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
const [longUrl, setLongurl] = useState("")
const naviagate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault()
   if(longUrl) {
    naviagate(`/login?${longUrl}`)
   } 
  }
  return (
    <div className=" flex flex-col items-center">
      <h1 className="text-3xl sm:text-6xl lg:text-7xl text-center my-8 sm:my-10 font-extrabold">
        Enter the long <span className="font-bold text-blue-600">URL</span>{" "}
        <br /> to get shorten{" "}
      </h1>
      <form onSubmit={handleSubmit} className="sm:h-14 flex flex-col sm:flex-row gap-3 w-full md:w-1/2 ">

        <Input
        onChange={(e) => setLongurl(e.target.value)}
        value={longUrl}
        className="h-full flex-1 py-4 px-4" type="url" />

        <Button
         className="h-full" type="submit" variant={"default"}>
          Short
        </Button>

      </form>

      <Accordion type="multiple" className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Home;
