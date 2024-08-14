import { attendedMeetings, meetings, users } from "@/server/db/schema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { createMeetingSchema } from "@/server/db/zod";

const updateSchema = createMeetingSchema.extend({
  id: z.number().min(1),
});

export const meetingsRouter = createTRPCRouter({
  update: adminProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(meetings).set(input).where(eq(meetings.id, input.id));
    }),
  getCalendar: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.meetings.findMany({
      columns: {
        id: true,
        name: true,
        isEvent: true,
        location: true,
        isPublic: true,
        link: true,
        date: true,
        isRequired: true,
      },
      with: {
        author: true,
      },
    });
  }),

  getUpcomingMeeting: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.meetings.findMany({
      columns: {
        id: true,
        link: true,
        name: true,
        isEvent: true,
        location: true,
        isRequired: true,
        isPublic: true,
        date: true,
      },
      with: {
        author: true,
      },

      orderBy: (meetings, { asc }) => asc(meetings.date),
      limit: 4,
    });
  }),
  create: adminProcedure
    .input(createMeetingSchema)
    .mutation(async ({ ctx, input }) => {
      // 2024-04 - 25T21: 30:00.000Z 2024-04 - 25T06:00:00.000Z
      await ctx.db.insert(meetings).values(input);
    }),

  deleteMeeting: adminProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(meetings).where(eq(meetings.id, input));
    }),

  log: adminProcedure
    .input(
      z.object({
        data: z.array(
          z.object({
            userId: z.string(),
            meetingId: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(attendedMeetings).values(input.data);
      for (const { userId } of input.data) {
        await ctx.db
          .update(users)
          .set({
            attendances: sql`${users.attendances} + 1`,
          })
          .where(eq(users.id, userId));
      }
    }),
});
