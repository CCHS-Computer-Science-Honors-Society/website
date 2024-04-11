/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canva-reveal-effect";
import { Button } from "../ui/button";

export function What() {
  return (
    <section className="flex flex-col h-full items-center justify-center pt-20 md:px-48 ">
      <Button
        variant="outline"
        className="rounded-full border-border flex space-x-2 items-center"
      >
        <span>Hover on the Cards!</span>
      </Button>
      <h1 className="text-5xl font-bold pt-6">
        What do we do?
      </h1>
      <div className="md:py-20 flex flex-col md:flex-row lg::bg-black w-full gap-4 mx-auto px-8">
        <Card title="

Initiatives are long-term projects that are developed by our members. They are a great way to gain experience in software development and to work with other students. The ultimate goal of each initiative is to provide value and make an impact.

          " icon={<div className="text-4xl font-bold">
            Initiatives
          </div>}>
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
          />
        </Card>
        <Card title="

Our Internships connect you with leading tech companies for real-world experience. From summer roles to part-time positions, these opportunities are perfect for applying classroom learning and kickstarting your career in technology. We do our best to expose our members to the industry.

          "
          icon={<div className="text-4xl font-bold">
            Internships
          </div>}

        >

          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-purple-600"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
          {/* Radial gradient for the cute fade */}
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
        <Card title="
Explore our dynamic Events, from coding workshops to tech talks and hackathons. Engage with industry leaders, learn new skills, and connect with peers in an environment that sparks innovation and collaboration.
          " icon={
            <div className="text-4xl font-bold">
              Events
            </div>
          }>
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
}

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] "
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
