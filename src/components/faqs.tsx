import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQS() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold text-gray-800">
              How is this different from LinkedIn or similar platforms?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Referral Connect is an exclusive community for international
              students to share their stories and seek referrals. Unlike general
              networking platforms, we focus specifically on connecting talented
              individuals facing visa expiry challenges with potential employers
              and referrers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-gray-800">
              How do employers filter out candidates?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Our platform offers multiple advanced filtering options, allowing
              employers to efficiently identify candidates based on criteria
              such as skills, experience, visa status, and more. This
              streamlined process helps match the right talent with the right
              opportunities.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold text-gray-800">
              Is my information secure on this platform?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              We take data privacy and security seriously. Your personal
              information is protected using industry-standard encryption and
              security measures. We only share the information you choose to
              make public in your profile and posts.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
