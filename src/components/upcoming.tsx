import React from 'react'
import { getServerAuthSession } from '@/server/auth'
import { MeetingItemPage } from '@/app/sandbox/meeting-item'

export default async function Upcoming() {
  const session = await getServerAuthSession()
  // date for april 11th 2024 at 3:30 PM MST
  const date = new Date("2024-04-11T15:30:00-06:00")
const upcomingMeetings = [
 {
 id: 2,
  name: "Final Meeting ",
  date: date,
  location: "W431",
  isEvent: false,
  isRequired: true,
  isPublic: true,
  author: {
  id: "1",
  emailVerified: new Date(),
  permissions: [],
  attendances: 0,
  image: null,
  isAdmin: true,
  name: "John Doe",
  email: ""
  }
  }
]
  return (
<div className="container mb-32">
      <div className="mb-12">
        <a id="apply">
          <h2 className=" text-3xl md:text-4xl mb-4 font-bold min-w-full w-full">Upcoming Meetings</h2>
        </a>
        <p className="text-[#707070]">
          Here are the upcoming meetings for the club. Please make sure to attend them.
        </p>
      </div>

      <div className="border border-border rounded-2xl bg-white dark:bg-[#121212] p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:space-x-16">
          <div className="w-full flex flex-col gap-3">
            {
              upcomingMeetings.length === 0 && (
                <p>No upcoming meetings</p>
              )

            }
            {

              upcomingMeetings.map((meeting) => (
            <MeetingItemPage key={meeting.id} data={meeting} isAdmin={session?.user.isAdmin ?? false} />
                ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
