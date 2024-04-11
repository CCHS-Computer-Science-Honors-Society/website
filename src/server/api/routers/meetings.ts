import { createInputSchema, meetings } from "@/server/db/schema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createInput } from "@/server/db/zod";
import { format } from "date-fns";

const updateSchema = createInputSchema.extend({
  id: z.number().min(1),
})

export const meetingsRouter = createTRPCRouter({
  update: adminProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(meetings)
        .set(input)
        .where(eq(meetings.id, input.id));
    }),
  getCalendar: publicProcedure
    .query(async ({ ctx }) => {
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
        }
      })
    }),

  getUpcomingMeeting: publicProcedure
    .query(async ({ ctx }) => {
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
        limit: 4

      })
    }),
  create: adminProcedure
    .input(createInput)
    .mutation(async ({ ctx, input }) => {
      // 2024-04 - 25T21: 30:00.000Z 2024-04 - 25T06:00:00.000Z
      await ctx.db.insert(meetings).values(input)
    }),

  delete: adminProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(meetings)
        .where(eq(meetings.id, input));
    }),


})
