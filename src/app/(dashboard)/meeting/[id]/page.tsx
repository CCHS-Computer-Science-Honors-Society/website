import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/server/db";
import { attendedMeetings, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = parseInt(params.id);

  const meeting = await db.query.meetings.findFirst({
    where: (meetings, { eq }) => eq(meetings.id, id),
  });

  const attended = await db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
      email: users.email,
    })
    .from(attendedMeetings)
    .where(eq(attendedMeetings.meetingId, id))
    .innerJoin(users, eq(attendedMeetings.userId, users.id));

  if (!meeting || !attended) {
    return <div>Meeting not found</div>;
  }

  return (
    <main className="h-full w-full">
      <div className="mx-auto sm:p-8 md:p-10">
        <div className="grid gap-8">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{meeting.name}</h1>
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                  {meeting.isEvent ? "Event" : "Meeting"}
                </div>
                <div className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                  {meeting.isRequired ? "Required" : "Optional"}
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1">
                <div className="text-sm font-medium">Location</div>
                <div className="text-muted-foreground">
                  <Link href="#" className="underline" prefetch={false}>
                    {meeting.location ?? "Online"}
                  </Link>
                </div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium">Date</div>
                <div className="text-muted-foreground">
                  {meeting.date.toLocaleDateString()} -{" "}
                  {meeting.date.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attended.map((attendee) => (
                  <TableRow key={attendee.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage>{attendee.image}</AvatarImage>
                        <AvatarFallback>
                          {attendee?.name?.split(" ").map((name) => name[0])}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{attendee.name}</TableCell>
                    <TableCell>{attendee.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}
