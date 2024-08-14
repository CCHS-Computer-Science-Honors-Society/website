"use client";
import { CalendarIcon, ClockIcon, Flag, MapPin } from "lucide-react";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { type RouterOutput } from "@/server/api/root";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Log } from "./log";
import Link from "next/link";

type Meetings = RouterOutput["meetings"]["getCalendar"][0];
type MeetingItemProps = {
  data: Meetings;
  isAdmin: boolean;
  usersMap: {
    label: string;
    value: string;
  }[];
};

export const MeetingItem = ({ data }: MeetingItemProps) => {
  const { name, isEvent } = data;
  const date = new Date(data.date);
  const [isEditing] = useState<boolean>(false);

  const getTimeFormat = (date: Date): string => {
    // am or pm
    return format(date, "h:mm a");
  };
  const getDateFormat = (date: Date): string => {
    return format(date, "MMMM d, yyyy EEEE");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex w-full flex-row justify-between gap-2">
          <div>{getTimeFormat(date)}</div>-<div>{name}</div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-between align-middle text-xl font-semibold">
          {isEditing ? (
            <input
              type="text"
              value={name ?? ""}
              onChange={(e) => console.log(e.target.value)}
              className="w-full"
            />
          ) : (
            name
          )}
        </SheetHeader>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-row gap-4">
              <CalendarIcon />
              {getDateFormat(date)}
            </div>

            <div className="flex flex-row gap-4">
              <ClockIcon />
              {getTimeFormat(date)}
            </div>

            <div className="flex flex-row gap-4">
              <Flag />
              {isEvent ? "Event" : "Meeting"}
            </div>
            <div className="flex flex-row gap-4">
              <MapPin />
              {isEvent ? (
                <Badge className="bg-red-800">Event</Badge>
              ) : (
                <Badge className="bg-blue-800">Meeting</Badge>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const MeetingItemPage = ({
  data,
  isAdmin,
  usersMap,
}: MeetingItemProps) => {
  const { name, location, isEvent, isRequired } = data;
  const date = new Date(data.date);
  const [isEditing] = useState<boolean>(false);
  const router = useRouter();

  const { mutate: deleteMeeting } = api.meetings.deleteMeeting.useMutation({
    onSuccess: () => {
      toast.success("Meeting Deleted");
      router.refresh();
    },
    onError: () => {
      toast.error("Error deleting meeting");
    },
  });

  function handleDelete() {
    deleteMeeting(data.id);
  }
  const getTimeFormat = (date: Date): string => {
    // am or pm
    return format(date, "h:mm a");
  };
  const getDateFormat = (date: Date): string => {
    return format(date, "MMMM d, yyyy EEEE");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Card
          className={`mx-auto w-full max-w-sm items-start hover:bg-muted ${isRequired ? `border-red-600` : null}`}
        >
          <CardHeader>
            <CardTitle className="overflow-y-clip">{name}</CardTitle>
            <CardDescription>
              {getDateFormat(date)} - {getTimeFormat(date)}
            </CardDescription>
          </CardHeader>
        </Card>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-between align-middle text-xl font-semibold">
          {isEditing ? (
            <input
              type="text"
              value={name ?? ""}
              onChange={(e) => console.log(e.target.value)}
              className="w-full"
            />
          ) : (
            name
          )}
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-row gap-4">
            <CalendarIcon />
            {getDateFormat(date)}
          </div>

          <div className="flex flex-row gap-4">
            <ClockIcon />
            {getTimeFormat(date)}
          </div>

          <div className="flex flex-row gap-4">
            <Flag />
            {isEvent ? "Event" : "Meeting"}
          </div>

          <div className="flex flex-row gap-4">
            <MapPin />
            {location}
          </div>
          {isAdmin && (
            <div className="gap-4">
              <Button
                className="w-full"
                onClick={handleDelete}
                variant={"destructive"}
              >
                Delete
              </Button>
              <Log meetingId={data.id} usersMap={usersMap} />
              <Link
                href={`/meeting/${data.id}/`}
                className={buttonVariants({
                  variant: "default",
                })}
              >
                Edit
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
