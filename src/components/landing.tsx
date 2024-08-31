import { Button } from "./ui/button";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import Footer from "./footer";
import Link from "next/link";
import LandingBody from "./landingBody";

export default function LandingUI() {
  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center bg-white text-black py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-900 to-black">
              Referral Connect
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-4 text-gray-600">
            Rise Above the{" "}
            <span className="font-semibold text-gray-800">Visa Expiry</span>
          </p>
          <p className="text-2xl md:text-3xl font-semibold mb-12 text-gray-700">
            Connect with Peers Globally for Referrals
          </p>
          <Link href="../feed">
            <Button className="group relative overflow-hidden rounded-full bg-black text-white px-8 py-4 text-lg font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg">
              <span className="relative z-10">Explore Opportunities</span>
              <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-gray-700 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-10"></span>
              <DoubleArrowRightIcon className="inline-block ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            {
              icon: "🌍",
              title: "Global Network",
              description: "Connect with professionals worldwide",
            },
            {
              icon: "🚀",
              title: "Career Boost",
              description: "Accelerate your career growth",
            },
            {
              icon: "🤝",
              title: "Mutual Support",
              description: "Help and get helped by peers",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <LandingBody />
      <Footer />
    </>
  );
}
