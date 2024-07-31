import { createInputSchema } from "./schema";

export const createInput = createInputSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
