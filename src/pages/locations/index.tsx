import { useGetLocations } from "@/hooks/useLocationsQuery";
import { LayoutHome } from "@/layouts/_home";
import Link from "next/link";
import { Fragment } from "react";

export default function Locations() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetLocations();

  return (
    <LayoutHome>
      <h1>Locations</h1>

      <p>These results are infinitely loaded (20 items per load)</p>

      {isLoading && <span>Loading... (first load)</span>}

      {error instanceof Error && <span>Error: {error.message}</span>}

      <ul className="flex flex-col gap-4">
        {data &&
          data!.pages.map((group, i) => (
            <Fragment key={i}>
              {group.results.map((location) => (
                <Link href={`/locations/${location.id}`} key={location.id}>
                  <li className="bg-slate-50 flex p-4 items-center">
                    {/* Pointless "image" just to add height */}
                    <div className="bg-slate-200 h-12 w-12 rounded-full mr-4"></div>
                    <p>{location.name}</p>
                  </li>
                </Link>
              ))}
            </Fragment>
          ))}
      </ul>

      {/* Only show on subsequent loads AFTER first load */}
      {!isLoading && (
        <>
          <div className="flex mt-8 mb-36">
            <button
              className="hover:bg-slate-100 py-6 text-center w-full"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "End of results"}
            </button>
          </div>

          {/* <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div> */}
        </>
      )}
    </LayoutHome>
  );
}
