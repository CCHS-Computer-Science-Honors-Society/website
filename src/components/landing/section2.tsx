/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import Link from "next/link";

import { AdaptiveImage } from "@/components/ui/adapative-image";
import { motion } from "framer-motion";
import profitLossLight from "public/ocwheading.png";
import profitLoss from "public/ocwheading.png";
import { useState } from "react";
import { LinkIcon } from "lucide-react";

export function SectionTwo() {
  const [isActive, setActive] = useState(false);

  return (
    <section
      className="container mb-12 overflow-hidden rounded-2xl border border-border bg-white p-8 dark:bg-[#121212] md:p-10 md:pb-0"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="flex flex-col md:flex-row md:space-x-12">
        <motion.div
          animate={isActive ? { y: -5, x: 5 } : { y: 0, x: 0 }}
          initial={{ y: 0, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-full"
        >
          <AdaptiveImage
            lightSrc={profitLossLight}
            darkSrc={profitLoss}
            height={400}
            width={789}
            className="-mb-[1px] object-contain"
            alt="Overview"
          />
        </motion.div>

        <div className="mt-6 md:mb-8 md:ml-8 md:max-w-[40%]">
          <h3 className="mb-4 text-xl font-medium md:text-2xl">
            Open CourseWare
          </h3>

          <p className="mb-4 text-[#878787]">
            Open CourseWare is a free and open digital publication of cherry
            creek high school&apos;s quality educational materials, organized as
            courses.
          </p>

          <Link
            href={`https://creekocw.wordpress.com/`}
            target="_blank"
            className="mt-8 flex items-center space-x-2"
          >
            <LinkIcon />
            <span className="text-[#878787]">Visit OpenCourseWare</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
