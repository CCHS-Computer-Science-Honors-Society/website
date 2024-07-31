import React from "react";
import { getServerAuthSession } from "@/server/auth";
import { MeetingItemPage } from "@/app/(marketing)/sandbox/meeting-item";
import { api } from "@/trpc/server";
import { CreateMeetingModal } from "@/app/(marketing)/sandbox/create-meeting-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Calendar from "@/app/(marketing)/sandbox/cal";

export default async function Upcoming() {
  const session = await getServerAuthSession();

  const data = await api.meetings.getCalendar();
  const upcomingMeetings = data
    .filter((meeting) => new Date(meeting.date) > new Date())
    .splice(0, 3);

  return (
    <div className="container mb-32">
      <div className="mb-12">
        <a id="apply">
          <h2 className=" mb-4 w-full min-w-full text-3xl font-bold md:text-4xl">
            Upcoming Meetings
          </h2>
        </a>
        <p className="text-[#707070]">
          Here are the upcoming meetings for the club. Please make sure to
          attend them.
        </p>
      </div>

      <Tabs defaultValue="table">
        <div className="flex flex-row justify-between pb-4">
          <div className="flex">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <div className="hidden md:block">
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </div>
            </TabsList>
          </div>
          {session?.user.isAdmin && (
            <div className="flex flex-row justify-between">
              <CreateMeetingModal authorId={session?.user.id} />
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-border bg-white p-8 dark:bg-[#121212] md:p-10">
          <TabsContent value="table">
            <div className="flex flex-col md:flex-row md:space-x-16">
              <div className="flex w-full flex-col gap-3">
                {upcomingMeetings.length === 0 && <p>No upcoming meetings</p>}
                {upcomingMeetings.map((meeting) => (
                  <MeetingItemPage
                    key={meeting.id}
                    data={meeting}
                    isAdmin={session?.user.isAdmin ?? false}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="calendar">
            <Calendar data={data} isAdmin={session?.user.isAdmin ?? false} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
