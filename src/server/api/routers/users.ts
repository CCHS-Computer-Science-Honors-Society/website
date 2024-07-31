import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "../trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  getTableData: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.users.findMany({
      columns: {
        id: true,
        email: true,
        name: true,
        attendances: true,
        isAdmin: true,
      },
    });
  }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        isAdmin: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(users).set(input).where(eq(users.id, input.id));
    }),
});
