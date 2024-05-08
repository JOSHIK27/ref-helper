import { Button } from "./ui/button";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
export default function LandingUI() {
  return (
    <>
      <div className="mb-8 mt-16 font-inter text-center font-extrabold text-[140px] bg-clip-text text-transparent bg-gradient-to-r from-[#474747] to-black">
        Referral Connect
      </div>
      <div className="font-sans text-gray text-center font-light text-[30px] text-gray-500">
        RISE ABOVE THE{" "}
        <span className="bg-clip-text font-bold text-transparent bg-gradient-to-r from-[#ac3333] to-[#bc0101]">
          VISA EXPIRY
        </span>
      </div>
      <div className="font-sans text-gray-500 text-center font-bold text-[40px]">
        CONNECT WITH PEERS GLOBALLY FOR REFERRALS !
      </div>
      <div className="flex justify-center mt-16">
        <Link href={"../feed"}>
          <Button className="font-inter px-8 py-[25px] rounded-lg">
            <span className="text-[18px] mr-[6px] bg-clip-text font-extrabold text-transparent bg-gradient-to-r from-[#c9c6c6] to-[#ffffff]">
              KNOW MORE
            </span>
            <DoubleArrowRightIcon width={28} height={28} color="white" />
          </Button>
        </Link>
      </div>
    </>
  );
}
