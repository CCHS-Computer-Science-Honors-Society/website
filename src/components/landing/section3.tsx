"use client";

import { motion } from "framer-motion";
import inbox from "public/websitesheading.png"
import invoicing from "public/tutoringheading.png";
import { useState } from "react";
import Image from "next/image";

export function SectionFour() {
  const [isActive, setActive] = useState(false);
  const [isActive2, setActive2] = useState(false);

  return (
    <section className="flex justify-between space-y-12 py-12 px-56 md:space-y-0 md:space-x-8 flex-col md:flex-row overflow-hidden mb-12">
      <div
        className="border border-border basis-1/3 rounded-2xl bg-white dark:bg-[#121212] p-10 md:text-center flex flex-col"
        onMouseEnter={() => setActive2(true)}
        onMouseLeave={() => setActive2(false)}
      >
        <h4 className="font-medium text-xl md:text-2xl mb-4">Tutoring</h4>
        <p className="text-[#878787]">
          Free tutoring on all Computer Science subjects. We have a team of
          eager  and experienced tutors who are ready to help students with
          their assignments, projects, and exams.
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
        className="border border-border md:basis-2/3 rounded-2xl bg-white dark:bg-[#121212] p-10 flex justify-between md:space-x-8 md:flex-row flex-col"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <div className="flex flex-col md:basis-1/2 w-full">
          <h4 className="font-medium text-xl md:text-2xl mb-4">Free Websites</h4>

          <p className="text-[#878787] mb-4">
            We build free websites for clubs and small businesses at no cost.
          </p>

          <ul className="list-decimal pl-4 space-y-3">
            <li className="text-[#878787]">
              Fully custom websites.
            </li>
            <li className="text-[#878787]">
              Full control over the website.
            </li>
            <li className="text-[#878787]">
              Maintenance and updates.
            </li>
          </ul>
        </div>

        <div className="md:basis-1/2 mt-8 md:mt-0 -bottom-[8px] relative">
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
