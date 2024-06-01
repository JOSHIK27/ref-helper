import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQS() {
  return (
    <section className="mx-auto mt-20">
      <h2 className="mb-8 mt-24 font-inter text-center font-extrabold text-[50px] bg-clip-text text-transparent bg-gradient-to-r from-[#686565] to-black">
        FAQs
      </h2>
      <Accordion type="single" collapsible className="w-3/4 mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How is this different Linkedin/ similar platforms?
          </AccordionTrigger>
          <AccordionContent>
            This is exclusive community of international students to share their
            stories and seek referrals
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            How do employee's filter out candidates?
          </AccordionTrigger>
          <AccordionContent>
            This site offer's multi filter to filter our the desired candidates
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
