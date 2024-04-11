import { Apply } from "@/components/landing/apply-section";
import { Hero } from "@/components/landing/hero";
import { SectionOne } from "@/components/landing/section1";
import { SectionTwo } from "@/components/landing/section2";
import { SectionFour } from "@/components/landing/section3";
import { What } from "@/components/landing/what";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Cherry Creek Computer Science Honor Society",
  description: "The offical website of the Cherry Creek Computer Science Honor Society",
}

export default async function Home() {

  return (
    <main className="flex min-h-screen min-w-full flex-col">
      <Hero />
      <What />
      <a id="initatives" >
        <SectionOne />
        <SectionTwo />
        <SectionFour />
      </a>
      <Apply />
    </main>
  );
}
