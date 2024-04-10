"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FooterCTA } from "./last-section";
import { BookOpen, Ear, GraduationCap, School, ShieldX } from "lucide-react";

export function Apply() {
  return (
    <div className="container mb-32">
      <div className="mb-12">
        <a id="apply">
          <h2 className="text-4xl mb-4">Membership Requirements</h2>
        </a>
        <p className="text-[#707070]">
          We require that all students have a passion for Computer Science and meet the following requirements:
        </p>
      </div>

      <div className="border border-border rounded-2xl bg-white dark:bg-[#121212] p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:space-x-16">
          <div className="md:basis-1/2">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center justify-start space-x-2">
                  <School size={32} className="!rotate-0" />
                  <span className="w-full text-left text-lg">Class Requirement</span>
                </AccordionTrigger>
                <AccordionContent className="text-[#707070]">
                  <div className="flex-col">
                    <p>
                      To be be enrolled in AP Computer Science class or higher.
                    </p>

                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="flex items-center justify-start space-x-2">
                  <GraduationCap size={32} className="!rotate-0" />
                  <span className="w-full text-left text-lg">Grade Requirements</span>
                </AccordionTrigger>
                <AccordionContent className="text-[#707070]">
                  <div className="flex-col">
                    <p>
                      To have received a grade of B or higher in all Computer Science classes.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="flex items-center justify-start space-x-2">
                  <BookOpen size={32} className="!rotate-0" />
                  <span className="w-full text-left text-lg">I don&apos;t meet the requirements?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[#707070]">
                  <div className="flex-col">
                    <p>
                      We offer a waiver for students who are passionate about Computer Science but do not meet the requirements.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="flex items-center justify-start space-x-2">
                  <Ear size={32} className="!rotate-0" />
                  <span className="w-full text-left text-lg">When do I apply and hear back?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[#707070]">
                  We take applications on a rolling basis and will get back to you within a month. Apply whenever you are ready!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="flex items-center justify-start space-x-2">
                  <ShieldX size={32} className="!rotate-0" />
                  <span className="w-full text-left text-lg">I can&apos;t access the form?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[#707070]">
                  You must be logged in with your school google email to be able to access the form.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
          <div className="md:basis-1/2 h-min-[300px] ">
            <FooterCTA />
          </div>
        </div>
      </div>
    </div>
  );
}
