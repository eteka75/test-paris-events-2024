"use client";
import EventCard from "@/components/Events/EventCard";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import SkeletonCard from "@/components/SkeletonCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchEvents } from "@/lib/fetchEvents";
import { Drama } from "lucide-react";
import { useFilterContext } from "@/context/FilterContext";
import { Event } from "@/types/search.type";
import FilterDisplay from "../FilterDisplay";
import useSWR from "swr";

interface EventsListProps {
  initialSearch: string;
  initialPage: number;
  initialEventsPerPage: number;
  initialTotalEvents: number;
  initialEvents: Event[] | null;
}

const EventsList = ({
  initialSearch,
  initialPage = 1,
  initialEventsPerPage,
  initialTotalEvents,
  initialEvents,
}: EventsListProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [eventsPerPage, setEventsPerPage] = useState(initialEventsPerPage);
  const [refreshData, setRefreshData] = useState(false);

  const { filters } = useFilterContext();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newSearch = searchParams.get("search") || initialSearch;
    const newPage = parseInt(searchParams.get("page") || `${initialPage}`, 10);
    const newPerPage = parseInt(
      searchParams.get("nb_par_page") || `${initialEventsPerPage}`,
      10
    );

    // mise a jour au besoin
    if (
      search !== newSearch ||
      currentPage !== newPage ||
      eventsPerPage !== newPerPage
    ) {
      setSearch(newSearch);
      setCurrentPage(newPage);
      setEventsPerPage(newPerPage);
    }
  }, [searchParams, initialSearch, initialPage, initialEventsPerPage]);

  //utilitaire derecherche
  const { data, error, isLoading, mutate } = useSWR(
    refreshData ? [search, eventsPerPage, currentPage, filters] : null,
    ([search, eventsPerPage, currentPage, filters]) =>
      fetchEvents(search, eventsPerPage, currentPage, filters),
    {
      fallbackData: { results: initialEvents, total_count: initialTotalEvents },
      revalidateOnFocus: false,
    }
  );

  const events = data?.results ?? [];
  const totalEvents = data?.total_count ?? initialTotalEvents;
  // Arrondi du nombre de page
  const totalPages = Math.ceil(totalEvents / eventsPerPage);

  const handleSearch = (query: string) => {
    setSearch(query);
    setCurrentPage(1);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("search", query);
    newUrl.searchParams.set("page", "1");
    window.history.pushState({}, "", newUrl.toString());
    setRefreshData(true);
    mutate();
  };

  const newSearch = () => {
    if (!isLoading) {
      handleSearch(search);
    }
  };

  return (
    <>
      <Filters key={"search"} search={search} onSearch={handleSearch} />

      {!isLoading && totalEvents && search !== "" ? (
        <div className="text-sm text-center md:text-start opacity-80 mb-2">
          {totalEvents} résultats trouvé{totalEvents > 1 ? "s" : ""}
        </div>
      ) : null}

      <FilterDisplay newSearch={newSearch} />

      {error ? (
        <DisplayError error={"Erreur lors de la récupération des événements"} />
      ) : (
        <div className="pb-4">
          {isLoading ? (
            <SkeletonCard nb={eventsPerPage} />
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2">
              {events.map((event: Event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EventNull key={"eventnull"} />
          )}
        </div>
      )}

      <Pagination
        key={"pagination"}
        loading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("page", newPage.toString());
          window.history.pushState({}, "", newUrl.toString());
          setCurrentPage(newPage);
          setRefreshData(true);
        }}
        itemsPerPage={eventsPerPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("nb_par_page", newItemsPerPage.toString());
          window.history.pushState({}, "", newUrl.toString());
          setEventsPerPage(newItemsPerPage);
          setRefreshData(true);
        }}
      />
    </>
  );
};

export default EventsList;

const DisplayError = ({ error }: { error: string }) => {
  if (!error) {
    return;
  }
  return (
    <div className="px-4 py-2 shadow rounded-md my-4 border-red-700 text-red-800 bg-red-100 text-sm">
      {error}
    </div>
  );
};

const EventNull = () => {
  return (
    <div className="text-center p-4 border dark:border-gray-800 dark:bg-gray-800 shadow-sm rounded-lg py-10">
      <Drama className="h-16 w-16 mx-auto mb-4 opacity-35" />
      <h2 className="text-lg font-bold">Aucun événement trouvé</h2>
      <p className="text-gray-600 text-sm">
        Essayez de modifier vos critères de recherche.
      </p>
    </div>
  );
};
