"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SkButton from "../sketch-button";
import { Spotlight } from "../ui/spotlight";

export function FooterCTA() {
  const pathname = usePathname();

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <div className="border border-border rounded-2xl md:container text-center md:mx-auto p-4  flex items-center flex-col bg-[#121212] h-full justify-center items-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <span className="text-4xl	md:text-7xl font-medium text-white ">
        Apply Now!
      </span>
      <p className="text-[#878787] mt-6">
        Join a community of like-minded individuals who are passionate about
        <br />
        Computer Science and Technology.
      </p>

      <div className="mt-10 md:mb-8">
        <div className="flex items-center space-x-4">
          <Link href="https://forms.gle/hjWduMtGQHCfTBpX7">
            <SkButton
            >
              Apply Now
            </SkButton>
          </Link>

          <Button className="h-12 px-5 bg-white text-black hover:bg-white/80" asChild>
            <Link href="mailto:cherrycreekcshs@gmail.com">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
