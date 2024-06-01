import { CheckIcon } from "@radix-ui/react-icons";
import FAQS from "./faqs";
export default function LandingBody() {
  return (
    <>
      <section className="rounded-xl py-8 mt-20">
        <h2 className="mb-8 font-inter text-center font-extrabold text-[50px] bg-clip-text text-transparent bg-gradient-to-r from-[#686565] to-black">
          Purpose
        </h2>
        <div className="text-[20px] px-16 flex items-center font-inter">
          The main purpose of this website to bring all the international
          students who are truly deserving to get into their dream jobs but
          could not due to visa expiry issues. This is the go to place where
          people can post their stories and seek for employee referrals.
        </div>
      </section>
      <section className="mt-20">
        <h2 className="mb-8 mt-24 font-inter text-center font-extrabold text-[50px] bg-clip-text text-transparent bg-gradient-to-r from-[#686565] to-black">
          Key Features
        </h2>
        <div className="text-[20px] ml-8 md:ml-20 flex items-center font-inter">
          <CheckIcon color="green" width={28} height={28} />
          Make A Post Sharing their Story
        </div>
        <div className="text-[20px] ml-8 md:ml-20 flex items-center font-inter">
          <CheckIcon color="green" width={28} height={28} />
          Enabling Real Time Communication Among The Peers
        </div>
        <div className="text-[20px] ml-8 md:ml-20 flex items-center font-inter">
          <CheckIcon color="green" width={28} height={28} /> Smooth UI With
          Multiple Filters Making The Life Of Employee's Easy
        </div>
      </section>
      <FAQS />
    </>
  );
}
