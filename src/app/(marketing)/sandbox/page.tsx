import React from "react";
import Calendar from "./cal";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { CreateMeetingModal } from "./create-meeting-modal";
import { MeetingItem } from "./meeting-item";

export default async function Page() {
  const session = await getServerAuthSession();
  const data = await api.meetings.getCalendar();
  const upcomingMeetings = data
    .filter((meeting) => new Date(meeting.date) > new Date())
    .splice(0, 3);

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4 p-20">
      <div className="row-span-3">
        <Card className="h-1/2">
          <CardHeader className="flex flex-row  items-start bg-accent align-middle">
            <CalendarIcon />
            <h1 className="font-md font-semibold">Upcoming Meetings</h1>
          </CardHeader>
          <CardContent>
            {upcomingMeetings.length === 0 && <p>No upcoming meetings</p>}
            {upcomingMeetings.map((meeting) => (
              <MeetingItem
                usersMap={[]}
                key={meeting.id}
                data={meeting}
                isAdmin={session?.user.isAdmin ?? false}
              />
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="col-start-1 row-span-2 row-start-4">
        {session?.user.isAdmin && (
          <CreateMeetingModal authorId={session.user.id} />
        )}
      </div>
      <div className="col-span-4 col-start-2 row-span-5 row-start-1">
        <Calendar data={data} isAdmin={session?.user.isAdmin ?? false} />
      </div>
    </div>
  );
}
