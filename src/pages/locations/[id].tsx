import { useGetLocation } from "@/hooks/useLocationQuery";
import { LayoutHome } from "@/layouts/_home";
import { useRouter } from "next/router";
import { z } from "zod";

const locationParamsSchema = z.object({
  id: z.coerce.number().positive().default(1),
});

export type LocationParams = z.infer<typeof locationParamsSchema>;

export default function Location() {
  const router = useRouter();
  const validatedLocationId = locationParamsSchema.safeParse(router.query);

  if (!validatedLocationId.success) {
    throw new Error("Invalid location ID");
  }

  const {
    isLoading,
    data: location,
    error,
  } = useGetLocation({ id: validatedLocationId.data.id });

  return (
    <LayoutHome>
      <h1>Locations</h1>

      {isLoading && <span>Loading...</span>}

      {error instanceof Error && <span>Error: {error.message}</span>}

      {location && (
        <>
          <p>{location?.id}</p>
          <p>{location?.name}</p>
          <p>{location?.type}</p>
          <p>{location?.dimension}</p>
        </>
      )}
    </LayoutHome>
  );
}
