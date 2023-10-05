import { queryClient } from "@/api/client";
import { BASE_URL } from "@/api/constants";
import { CharacterParams } from "@/pages/characters/[id]";
import { characterSchema, type Character } from "@/types/Character";
import { CharactersListResponse } from "@/types/ListResponse";
import { useQuery } from "@tanstack/react-query";

const fetchCharacter = async ({ id }: CharacterParams): Promise<Character> => {
  const response = await fetch(`${BASE_URL}/character/${id}`);
  const data = await response.json();
  const validatedData = characterSchema.safeParse(data);

  if (!validatedData.success) {
    console.error("Invalid data", validatedData.error);
    return data;
  }

  return validatedData.data;
};

export const useGetCharacter = ({ id }: CharacterParams) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter({ id }),
    placeholderData: () =>
      queryClient
        .getQueryData<CharactersListResponse>(["characters"])
        ?.results.find((character) => character.id === id),
    enabled: !!id,
  });
};
