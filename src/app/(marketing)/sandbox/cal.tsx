"use client";
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addMonths } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type RouterOutput } from "@/server/api/root";
import { MeetingItem } from "./meeting-item";

interface CalendarProps {
  data: RouterOutput["meetings"]["getCalendar"];
  isAdmin: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ data, isAdmin }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleMonthChange = (delta: number): void => {
    setCurrentDate((prevDate) => addMonths(prevDate, delta));
  };

  const formatDateString = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
  };

  const renderCalendarHeader = () => {
    return (
      <div className="mb-4 flex items-center justify-between">
        <button
          className="text-gray-500 transition-colors duration-200 hover:text-gray-700"
          onClick={() => handleMonthChange(-1)}
        >
          <ChevronLeftIcon />
        </button>
        <Popover>
          <PopoverTrigger>
            <span className="cursor-pointer text-lg font-semibold">
              {format(currentDate, "MMMM yyyy")}
            </span>
          </PopoverTrigger>
          <PopoverContent className="rounded-md bg-white p-4 shadow-md">
            {Array.from({ length: 12 }, (_, i) => {
              const monthDate = addMonths(
                new Date(),
                i - new Date().getMonth(),
              );
              return (
                <div
                  key={i}
                  className={`cursor-pointer rounded-md p-2 ${
                    format(monthDate, "M") === format(currentDate, "M")
                      ? "bg-gray-200 font-semibold"
                      : "transition-colors duration-200 hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentDate(monthDate)}
                >
                  {format(monthDate, "MMMM yyyy")}
                </div>
              );
            })}
          </PopoverContent>
        </Popover>
        <button
          className="text-gray-500 transition-colors duration-200 hover:text-gray-700"
          onClick={() => handleMonthChange(1)}
        >
          <ChevronRightIcon />
        </button>
      </div>
    );
  };

  const renderCalendarGrid = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();

    const calendarDays = Array.from(
      { length: daysInMonth + firstDayOfMonth },
      (_, i) => {
        const date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          i - firstDayOfMonth + 1,
        );
        const meetings = data.filter(
          (meeting) =>
            format(meeting.date, "yyyy-MM-dd") === formatDateString(date),
        );

        return (
          <Card
            key={i}
            className={` flex max-w-[300px] flex-col overflow-y-clip rounded-md text-center ${
              i < firstDayOfMonth || i >= daysInMonth + firstDayOfMonth
                ? "text-gray-400"
                : "cursor-pointer text-gray-700 transition-colors duration-200 hover:bg-gray-200"
            }`}
          >
            <CardHeader className="flex flex-row justify-between">
              <div></div>
              {i < firstDayOfMonth || i >= daysInMonth + firstDayOfMonth
                ? ""
                : date.getDate()}
            </CardHeader>
            <CardContent>
              {meetings.map((meeting) => {
                console.log(
                  meeting.date.toTimeString() + format(meeting.date, "h:mm a"),
                );

                return (
                  <MeetingItem
                    key={meeting.id}
                    data={meeting}
                    isAdmin={isAdmin}
                  />
                );
              })}
            </CardContent>
          </Card>
        );
      },
    );

    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekdayHeaders = weekdayNames.map((day) => (
      <div key={day} className="text-center text-gray-500">
        {day}
      </div>
    ));

    return (
      <div>
        <div className="mb-2 grid grid-cols-7 gap-2">{weekdayHeaders}</div>
        <div className="grid grid-cols-7 gap-2">{calendarDays}</div>
      </div>
    );
  };

  return (
    <div className="rounded-md bg-white p-4 shadow-md">
      {renderCalendarHeader()}
      {renderCalendarGrid()}
    </div>
  );
};

export default Calendar;
