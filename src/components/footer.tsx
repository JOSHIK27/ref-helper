"use client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
export default function Footer() {
  return (
    <>
      <div className="h-40 mt-40 bg-[#252D3D]">
        <div className="flex justify-evenly pt-20">
          <GitHubLogoIcon
            onClick={() =>
              window.open("https://github.com/JOSHIK27/ref-helper")
            }
            className="cursor-pointer"
            width={28}
            height={28}
            color="white"
          />
          <LinkedInLogoIcon
            onClick={() => window.open("https://www.linkedin.com/in/joshik27/")}
            className="cursor-pointer"
            width={28}
            height={28}
            color="white"
          />
          <TwitterLogoIcon
            onClick={() => window.open("https://twitter.com/aspirant_4021")}
            className="cursor-pointer"
            width={28}
            height={28}
            color="white"
          />
        </div>
      </div>
    </>
  );
}
