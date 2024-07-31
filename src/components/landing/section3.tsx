"use client";

import { motion } from "framer-motion";
import inbox from "public/websitesheading.png";
import invoicing from "public/tutoringheading.png";
import { useState } from "react";
import Image from "next/image";

export function SectionFour() {
  const [isActive, setActive] = useState(false);
  const [isActive2, setActive2] = useState(false);

  return (
    <section className="mb-12 flex flex-col justify-between space-y-12 overflow-hidden px-56 py-12 md:flex-row md:space-x-8 md:space-y-0">
      <div
        className="flex basis-1/3 flex-col rounded-2xl border border-border bg-white p-10 dark:bg-[#121212] md:text-center"
        onMouseEnter={() => setActive2(true)}
        onMouseLeave={() => setActive2(false)}
      >
        <h4 className="mb-4 text-xl font-medium md:text-2xl">Tutoring</h4>
        <p className="text-[#878787]">
          Free tutoring on all Computer Science subjects. We have a team of
          eager and experienced tutors who are ready to help students with their
          assignments, projects, and exams.
        </p>
        <motion.div
          animate={isActive2 ? { y: -5 } : { y: 0 }}
          initial={{ y: -5 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mt-8 md:mt-auto"
        >
          <Image
            src={invoicing}
            quality={100}
            height={300}
            width={500}
            className="object-contain"
            alt="Invoice"
          />
        </motion.div>
      </div>

      <div
        className="flex flex-col justify-between rounded-2xl border border-border bg-white p-10 dark:bg-[#121212] md:basis-2/3 md:flex-row md:space-x-8"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <div className="flex w-full flex-col md:basis-1/2">
          <h4 className="mb-4 text-xl font-medium md:text-2xl">
            Free Websites
          </h4>

          <p className="mb-4 text-[#878787]">
            We build free websites for clubs and small businesses at no cost.
          </p>

          <ul className="list-decimal space-y-3 pl-4">
            <li className="text-[#878787]">Fully custom websites.</li>
            <li className="text-[#878787]">Full control over the website.</li>
            <li className="text-[#878787]">Maintenance and updates.</li>
          </ul>
        </div>

        <div className="relative -bottom-[8px] mt-8 md:mt-0 md:basis-1/2">
          <motion.div
            animate={isActive ? { y: -5 } : { y: 0 }}
            initial={{ y: -5 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Image
              src={inbox}
              quality={100}
              className="object-contain"
              height={700}
              width={500}
              alt="Inbox"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
