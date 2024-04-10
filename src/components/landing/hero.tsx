import Link from "next/link";
import { Button } from "../ui/button";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import SkButton from "../sketch-button";

export function Hero() {
  return (
    <HeroHighlight>
      <section className="text-center mt-16 md:mt-18 items-center flex flex-col">
        <Link href="/#initatives">
          <Button
            variant="outline"
            className="rounded-full border-border flex space-x-2 items-center"
          >
            <span>Explore Initatives</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={12}
              height={12}
              fill="none"
            >
              <path
                fill="currentColor"
                d="M8.783 6.667H.667V5.333h8.116L5.05 1.6 6 .667 11.333 6 6 11.333l-.95-.933 3.733-3.733Z"
              />
            </svg>
          </Button>
        </Link>

        <h1 className="text-6xl font-medium mt-6">Computer Science Honor Society</h1>

        <p className="mt-4 md:mt-6 text-[#707070] max-w-[700px]">
          <Highlight className="text-black dark:text-white">
            contribute to impactful projects, develop technical skills,
            and build a community of like-minded individuals.
          </Highlight>
        </p>

        <div className="mt-8">
          <div className="flex items-center space-x-4">
            <Link href="/construction">
              <SkButton
              >
                Tutoring Timing
              </SkButton>
            </Link>

            <a href="/#apply">
              <Button className="h-12 px-5">Apply Now</Button>
            </a>
          </div>
        </div>

      </section>
    </HeroHighlight>
  );
}
