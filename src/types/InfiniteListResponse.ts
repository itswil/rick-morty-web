import { z } from "zod";
import { locationSchema } from "./Location";

export const createInfiniteListResponseSchema = <T extends z.ZodTypeAny>(
  schema: T
) =>
  z.object({
    pageParams: z.array(z.number()),
    pages: z.array(
      z.object({
        info: z.object({
          count: z.number(),
          pages: z.number(),
          next: z.string().nullable(),
          prev: z.string().nullable(),
        }),
        results: z.array(schema),
      })
    ),
  });

export const locationsInfiniteListResponseSchema =
  createInfiniteListResponseSchema(locationSchema);
export type LocationsInfiniteListResponse = z.infer<
  typeof locationsInfiniteListResponseSchema
>;
