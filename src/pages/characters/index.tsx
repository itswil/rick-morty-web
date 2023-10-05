import { useGetCharacters } from "@/hooks/useCharactersQuery";
import { LayoutHome } from "@/layouts/_home";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

const charactersParamsSchema = z.object({
  page: z.coerce.number().positive().default(1),
});

export type CharactersParams = z.infer<typeof charactersParamsSchema>;

export default function Characters() {
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const validatedSearchParams =
    charactersParamsSchema.safeParse(searchParamsObject);

  if (!validatedSearchParams.success) {
    throw new Error("Invalid search parameters");
  }

  const currentPage = validatedSearchParams.data.page;

  const { isLoading, data, error } = useGetCharacters({
    page: currentPage,
  });

  return (
    <LayoutHome>
      <h1>Characters</h1>

      {isLoading && <span>Loading...</span>}

      {error instanceof Error && <span>Error: {error.message}</span>}

      <ul className="flex flex-col gap-4">
        {data?.results.map((character) => (
          <Link href={`/characters/${character.id}`} key={character.id}>
            <li className="bg-slate-50 flex p-4 items-center">
              <img
                src={character.image}
                alt={character.name}
                className="h-12 w-12 rounded-full mr-4"
              />
              <p>{character.name}</p>
            </li>
          </Link>
        ))}
      </ul>

      <div className="flex mt-8 mb-36">
        {data?.info.prev ? (
          <Link
            href={{
              pathname: "/characters",
              query: { page: currentPage - 1 },
            }}
            className="hover:bg-slate-100 py-6 w-1/2"
          >
            ← Previous
          </Link>
        ) : (
          <i className="w-1/2"></i>
        )}
        {data?.info.next ? (
          <Link
            href={{
              pathname: "/characters",
              query: { page: currentPage + 1 },
            }}
            className="hover:bg-slate-100 py-6 w-1/2"
          >
            Next →
          </Link>
        ) : (
          <i className="w-1/2"></i>
        )}
      </div>
    </LayoutHome>
  );
}
