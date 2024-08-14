import { meetings } from "./schema";
import { createInsertSchema } from "drizzle-zod";

const mutateMeetingSchema = createInsertSchema(meetings);

export const createMeetingSchema = mutateMeetingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
