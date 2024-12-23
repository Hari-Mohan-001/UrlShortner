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
import useAuth from "@/hooks/useAuth";
import { api } from "@/Api/api";
import { Link } from "@/types";
import { LinkIcon } from "lucide-react";
import { useAuthHeaders } from "@/hooks/useAuthHeaders";

const Home = () => {
  const [longUrl, setLongurl] = useState("");
  const [link, setLink] = useState<Link>();
  const naviagate = useNavigate();
  const { isAuthenticated } = useAuth();
  const authHeader = useAuthHeaders();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      naviagate(`/auth`);
      return;
    }
    try {
      console.log(authHeader);
      
      const response = await api.createShortUrl(longUrl, authHeader);
      if (response.success) {
        setLink(response.data);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLinkClick = async () => {
    try {
      console.log('link click')
      if (link) {
        const response = await api.markLinkClick(link._id, authHeader);
        if(response.success){
          location.href = response.data;
        }
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col items-center">
      <h1 className="text-3xl sm:text-6xl lg:text-7xl text-center my-8 sm:my-10 font-extrabold">
        Enter the long <span className="font-bold text-blue-600">URL</span>{" "}
        <br /> to get shorten{" "}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="sm:h-14 flex flex-col sm:flex-row gap-3 w-full md:w-1/2 "
      >
        <Input
          onChange={(e) => setLongurl(e.target.value)}
          value={longUrl}
          className="h-full flex-1 py-4 px-4"
          type="url"
          required
        />

        <Button className="h-full" type="submit" variant={"default"}>
          Short
        </Button>
      </form>

      {link && (
        <div className="mt-4 p-4 bg-muted rounded-md">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Shortened URL:
          </p>
          <div className="flex items-center space-x-2">
            <LinkIcon className="h-4 w-4 text-primary" />
            <a
             href={link.shortUrl}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick();
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all"
            >
              {link.shortUrl}
            </a>
          </div>
        </div>
      )}

      <Accordion type="multiple" className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is a link shortener, and why should I use it?</AccordionTrigger>
          <AccordionContent>
          A link shortener is a tool that takes a long URL and creates a shorter, more manageable version.
           It's useful for: Making URLs easier to remember and share , Tracking and analyzing link clicks.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger>How does a link shortener work?</AccordionTrigger>
          <AccordionContent>
          When you enter a long URL, the link shortener generates a unique identifier for it and maps it to the original URL. 
          When someone clicks the shortened link, they are redirected to the original URL.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Home;
