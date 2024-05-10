import { CheckIcon } from "@radix-ui/react-icons";
import FAQS from "./faqs";
export default function LandingBody() {
  return (
    <>
      <div className="rounded-xl py-8 mt-20">
        <div className="mb-8 font-inter text-center font-extrabold text-[50px] bg-clip-text text-transparent bg-gradient-to-r from-[#686565] to-black">
          Purpose
        </div>
        <div className="text-[20px] px-16 flex items-center font-inter">
          At Referral Connect, we believe that every student's motivation is a
          testament to their determination and potential. Our purpose is to
          create a space where you can share your compelling story, highlighting
          the driving forces behind your pursuit of international education. By
          doing so, you can tap into a supportive community that can provide the
          referrals and recommendations necessary to unlock doors to your
          academic future.
        </div>
      </div>
      <div className="mt-20">
        <div className="mb-8 mt-24 font-inter text-center font-extrabold text-[50px] bg-clip-text text-transparent bg-gradient-to-r from-[#686565] to-black">
          Key Features
        </div>
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
      </div>
      <FAQS />
    </>
  );
}
