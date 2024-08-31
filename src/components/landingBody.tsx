import { CheckIcon } from "@radix-ui/react-icons";
import FAQS from "./faqs";

export default function LandingBody() {
  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
            Our Purpose
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
            Referral Connect brings together international students facing visa
            expiry challenges, providing a platform to share stories and seek
            employee referrals. We aim to connect deserving talent with their
            dream jobs, bridging the gap between potential and opportunity.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                icon: "📝",
                title: "Share Your Story",
                description:
                  "Craft a compelling narrative about your skills, experiences, and aspirations.",
              },
              {
                icon: "💬",
                title: "Real-Time Peer Communication",
                description:
                  "Connect instantly with peers and potential referrers in your field.",
              },
              {
                icon: "🔍",
                title: "Advanced Filtering",
                description:
                  "Find the perfect opportunities with our user-friendly, multi-filter interface.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQS />
    </>
  );
}
