import { BASE_URL } from "@/api/constants";
import {
  LocationsListResponse,
  locationsListResponseSchema,
} from "@/types/ListResponse";
import { useInfiniteQuery } from "@tanstack/react-query";
import { z } from "zod";

const locationsParamsSchema = z.object({
  pageParam: z.coerce.number().positive().default(1),
});

export type LocationsParams = z.infer<typeof locationsParamsSchema>;

const fetchLocations = async ({
  pageParam,
}: LocationsParams): Promise<LocationsListResponse> => {
  const response = await fetch(`${BASE_URL}/location?page=${pageParam}`);
  const data = await response.json();
  const validatedData = locationsListResponseSchema.safeParse(data);

  if (!validatedData.success) {
    console.error("Invalid data", validatedData.error);
    return data;
  }

  return validatedData.data;
};

export const useGetLocations = () => {
  return useInfiniteQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages) => {
      if (lastPage.info.next) {
        return parseInt(lastPage.info.next.slice(-1), 10);
      }
    },
  });
};
