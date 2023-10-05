import { useGetCharacter } from "@/hooks/useCharacterQuery";
import { LayoutHome } from "@/layouts/_home";
import { useRouter } from "next/router";
import { z } from "zod";

const characterParamsSchema = z.object({
  id: z.coerce.number().positive().default(1),
});

export type CharacterParams = z.infer<typeof characterParamsSchema>;

export default function Character() {
  const router = useRouter();
  const validatedCharacterId = characterParamsSchema.safeParse(router.query);

  if (!validatedCharacterId.success) {
    throw new Error("Invalid character ID");
  }

  const {
    isLoading,
    data: character,
    error,
  } = useGetCharacter({ id: validatedCharacterId.data.id });

  return (
    <LayoutHome>
      <h1>Characters</h1>

      {isLoading && <span>Loading...</span>}

      {error instanceof Error && <span>Error: {error.message}</span>}

      {character && (
        <>
          <p>{character?.id}</p>
          <p>{character?.name}</p>
          <p>{character?.status}</p>
          <p>{character?.species}</p>
          <p>{character?.type}</p>
          <p>{character?.gender}</p>
          <p>{character?.origin.name}</p>
          <p>{character?.location.name}</p>
          <img src={character?.image} alt={character?.name} />
        </>
      )}
    </LayoutHome>
  );
}
