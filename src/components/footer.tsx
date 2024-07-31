"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <footer className="border-t-[1px] border-border bg-[#F6F6F3] px-4 pt-10 dark:bg-[#0C0C0C] md:px-0 md:pt-16">
      <div className="container">
        <div className="mb-12 flex items-center justify-between border-b-[1px] border-border pb-10 md:pb-16">
          <Link href="/" className="-ml-[52px] scale-50 md:ml-0 md:scale-100">
            <span className="sr-only">Creek CSHS</span>
          </Link>

          <span className="text-right font-normal md:text-2xl">
            Run your business smarter.
          </span>
        </div>

        <div className="mb-10 flex w-full flex-col md:mb-20 md:flex-row">
          <div className="flex flex-col justify-between space-y-8 leading-8 md:w-6/12 md:flex-row md:space-y-0">
            <div>
              <span className="font-medium">Product</span>
              <ul>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/">Features</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/story">Story</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/updates">Updates</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/download">Download</Link>
                </li>
              </ul>
            </div>

            <div>
              <span>Resources</span>
              <ul>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="https://git.new/midday">Github</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/support">Support</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/policy">Privacy policy</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/terms">Terms and Conditions</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/open-startup">Open Startup</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/pitch">Investors</Link>
                </li>
              </ul>
            </div>

            <div>
              <span>Solutions</span>
              <ul>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/engine">Midday Engine</Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="https://docs.midday.ai/self-hosted">
                    Self hosted
                  </Link>
                </li>
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/pricing">SaaS hosting</Link>
                </li>
                {/* Nothing here yet */}
                {/* <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/open-startup">Open startup</Link>
                </li> */}
                <li className="text-[#707070] transition-colors hover:text-primary dark:text-[#878787]">
                  <Link href="/oss-friends">OSS friends</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex md:mt-0 md:w-6/12 md:justify-end">
            <div className="flex flex-col justify-between space-y-14 md:items-end">
              <div className="flex items-center">
                <GitHubLogoIcon />
              </div>
            </div>
          </div>
        </div>

        <p className="mb-12 text-xs text-[#B3B3B2] dark:text-[#3E3E3E]"></p>
      </div>
    </footer>
  );
}
