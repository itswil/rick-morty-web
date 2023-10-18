import { z } from "zod";

export const locationSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  dimension: z.string(),
  residents: z.array(z.string()),
  url: z.string().url(),
  created: z.string().datetime(),
});

export type Location = z.infer<typeof locationSchema>;
