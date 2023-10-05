import { z } from "zod";

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
  image: z.string().url(),
  episode: z.array(z.string()),
  url: z.string().url(),
  created: z.string().datetime(),
});

export type Character = z.infer<typeof characterSchema>;
