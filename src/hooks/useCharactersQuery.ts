import { BASE_URL } from "@/api/constants";
import { CharactersParams } from "@/pages/characters";
import {
  CharactersListResponse,
  charactersListResponseSchema,
} from "@/types/ListResponse";
import { useQuery } from "@tanstack/react-query";

const fetchCharacters = async ({
  page,
}: CharactersParams): Promise<CharactersListResponse> => {
  const response = await fetch(`${BASE_URL}/character?page=${page}`);
  const data = await response.json();
  const validatedData = charactersListResponseSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("Invalid data", validatedData.error);
  }

  return validatedData.data;
};

export const useGetCharacters = ({ page }: CharactersParams) => {
  return useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters({ page }),
    enabled: !!page,
  });
};
