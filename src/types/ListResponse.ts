import { z } from "zod";
import { characterSchema } from "./Character";
import { locationSchema } from "./Location";

export const createListResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    info: z.object({
      count: z.number(),
      pages: z.number(),
      next: z.string().nullable(),
      prev: z.string().nullable(),
    }),
    results: z.array(schema),
  });

export const charactersListResponseSchema =
  createListResponseSchema(characterSchema);
export type CharactersListResponse = z.infer<
  typeof charactersListResponseSchema
>;

export const locationsListResponseSchema =
  createListResponseSchema(locationSchema);
export type LocationsListResponse = z.infer<typeof locationsListResponseSchema>;
