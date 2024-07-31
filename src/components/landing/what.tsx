"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Calendar, Rocket } from "lucide-react";

export function What() {
  return (
    <section className="flex h-full flex-row items-center justify-evenly pt-20 md:px-24 ">
      <div className="w-max-[200px] w-1/3">
        <AnimatePresence>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Who are we?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pt-4 text-lg"
          >
            We are a community of students who are passionate about computer
            science, and dedicated to using that passion to help others. We
            harness our coding skills and innovative thinking to tackle
            real-world challenges, developing solutions that make a difference
            in our community and beyond.
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="w-1/2">
        <div className="flex flex-col justify-center space-y-4">
          <ul className="grid gap-6">
            <li>
              <div className="flex items-center gap-4">
                <Rocket className="h-[60px] w-[40px] flex-shrink-0 text-blue-500" />
                <div className="grid gap-1">
                  <h3 className="text-2xl font-bold">Initiatives</h3>
                  <p className="text-sm text-gray-500">
                    Initiatives are long-term projects that are developed by our
                    members. They are a great way to gain experience in software
                    development and to work with other students. The ultimate
                    goal of each initiative is to provide value and make an
                    impact.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4">
                <Calendar className="h-[60px] w-[40px] flex-shrink-0 text-green-500" />
                <div className="grid gap-1">
                  <h3 className="text-2xl font-bold">Events</h3>
                  <p className="text-sm text-gray-500">
                    We host events to bring students together and to provide
                    opportunities for learning and growth. Our events are a
                    great way to meet other students, learn new things, and have
                    fun. They range from workshops and hackathons to social
                    events and more.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4">
                <Briefcase className="h-[60px] w-[40px] flex-shrink-0 text-purple-500" />
                <div className="grid gap-1">
                  <h3 className="text-2xl font-bold">Career</h3>
                  <p className="text-sm text-gray-500">
                    We foster valuable relationships with tech industry leaders,
                    creating pathways for our members to explore real-world
                    applications of their skills. Through guest speaker
                    sessions, company visits, and internship opportunities, we
                    help students build professional networks and gain insights
                    into potential career paths.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
