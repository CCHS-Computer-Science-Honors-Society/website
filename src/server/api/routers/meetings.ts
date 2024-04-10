import { createInputSchema, meetings } from "@/server/db/schema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createInput } from "@/server/db/zod";

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
          date: true,
        },
        with: {
          author: true,
        }
      })
    }),
  create: adminProcedure
    .input(createInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(meetings)
        .values(input);
    }),

  delete: adminProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(meetings)
        .where(eq(meetings.id, input));
    }),


})
