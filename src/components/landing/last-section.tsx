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
    <div className="flex h-full flex-col items-center items-center justify-center rounded-2xl  border border-border bg-[#121212] p-4 text-center md:container md:mx-auto">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <span className="text-4xl	font-medium text-white md:text-7xl ">
        Apply Now!
      </span>
      <p className="mt-6 text-[#878787]">
        Join a community of like-minded individuals who are passionate about
        <br />
        Computer Science and Technology.
      </p>

      <div className="mt-10 md:mb-8">
        <div className="flex items-center space-x-4">
          <Link href="https://forms.gle/KEfALp6WmnfMfnso6">
            <SkButton>Apply Now</SkButton>
          </Link>

          <Button
            className="h-12 bg-white px-5 text-black hover:bg-white/80"
            asChild
          >
            <Link href="mailto:cherrycreekcshs@gmail.com">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
