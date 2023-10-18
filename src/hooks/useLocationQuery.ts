import { queryClient } from "@/api/client";
import { BASE_URL } from "@/api/constants";
import { LocationParams } from "@/pages/locations/[id]";
import { locationSchema, type Location } from "@/types/Location";
import { useQuery } from "@tanstack/react-query";
import { LocationsInfiniteListResponse } from "@/types/InfiniteListResponse";

const fetchLocation = async ({ id }: LocationParams): Promise<Location> => {
  const response = await fetch(`${BASE_URL}/location/${id}`);
  const data = await response.json();
  const validatedData = locationSchema.safeParse(data);

  if (!validatedData.success) {
    console.error("Invalid data", validatedData.error);
    return data;
  }

  return validatedData.data;
};

export const useGetLocation = ({ id }: LocationParams) => {
  return useQuery({
    queryKey: ["location", id],
    queryFn: () => fetchLocation({ id }),
    placeholderData: () =>
      queryClient
        .getQueryData<LocationsInfiniteListResponse>(["locations"])
        ?.pages.flatMap((r) => r.results)
        .find((location) => location.id === id),
    enabled: !!id,
  });
};
