"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Rocket, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Icon className="h-12 w-12" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export function What(): JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-4xl font-bold"
          >
            Who are we?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg"
          >
            We are a community of students who are passionate about computer
            science, and dedicated to using that passion to help others. We
            harness our coding skills and innovative thinking to tackle
            real-world challenges, developing solutions that make a difference
            in our community and beyond.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <InfoCard
            icon={Rocket}
            title="Initiatives"
            description="Initiatives are long-term projects that are developed by our members. They are a great way to gain experience in software development and to work with other students. The ultimate goal of each initiative is to provide value and make an impact."
          />
          <InfoCard
            icon={Calendar}
            title="Events"
            description="We host events to bring students together and to provide opportunities for learning and growth. Our events are a great way to meet other students, learn new things, and have fun. They range from workshops and hackathons to social events and more."
          />
          <InfoCard
            icon={Briefcase}
            title="Career"
            description="We foster valuable relationships with tech industry leaders, creating pathways for our members to explore real-world applications of their skills. Through guest speaker sessions, company visits, and internship opportunities, we help students build professional networks and gain insights into potential career paths."
          />
        </motion.div>
      </div>
    </section>
  );
}
