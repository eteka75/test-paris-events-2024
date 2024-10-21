"use client";
import EventCard from "@/components/EventCard";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import SkeletonCard from "@/components/Spinner";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchEvents } from "@/lib/fetchEvents";
import { Drama } from "lucide-react";
import { EventRecord } from "@/lib/models.type";

interface EventsListProps {
  initialSearch: string;
  initialPage: number;
  initialEventsPerPage: number;
  initialTotalEvents: number;
  initialEvents: EventRecord[];
}

const EventsList = ({
  initialSearch,
  initialPage = 1,
  initialEventsPerPage,
  initialTotalEvents,
  initialEvents,
}: EventsListProps) => {
  const [error, setError] = useState("");
  const [search, setSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [eventsPerPage, setEventsPerPage] = useState(initialEventsPerPage);
  const [events, setEvents] = useState(initialEvents ?? []);
  const [totalEvents, setTotalEvents] = useState(initialTotalEvents);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const newSearch = searchParams.get("search") || initialSearch;
    const newPage = parseInt(searchParams.get("page") || `${initialPage}`, 10);

    const newPerPage = parseInt(
      searchParams.get("nb_par_page") || `${initialEventsPerPage}`,
      10
    );

    setSearch(newSearch);
    setCurrentPage(newPage);
    setEventsPerPage(newPerPage);

    // optimisation de la requete
    if (
      initialEvents.length === 0 ||
      currentPage !== initialPage || // je verifie si la page a changé
      search !== initialSearch ||
      currentPage !== initialPage ||
      initialEventsPerPage !== eventsPerPage // je verifie aussi si la le nombre d'event par page a changé
    ) {
      const fetchData = async () => {
        setError("");
        setLoading(true);
        try {
          const response = await fetchEvents(newSearch, newPerPage, newPage);
          setEvents(response.records);
          setTotalEvents(response.nhits);
        } catch {
          setError("Erreur lors de la récupération des événements");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [
    searchParams,
    initialSearch,
    initialPage,
    currentPage,
    search,
    initialEventsPerPage,
    initialEvents.length,
  ]);

  // Arrondi du nombre de page
  const totalPages = Math.ceil(totalEvents / eventsPerPage);

  const handleSearch = async (query: string) => {
    setSearch(query);
    setCurrentPage(1);

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("search", query);
    newUrl.searchParams.set("page", "1");
    window.history.pushState({}, "", newUrl.toString());

    const response = await fetchEvents(query, eventsPerPage, 1);
    setEvents(response.records);
    setTotalEvents(response.nhits);
  };

  return (
    <>
      <Filters key={"search"} search={search} onSearch={handleSearch} />

      <div className="text-sm opacity-80">
        {!loading && totalEvents && search !== "" ? (
          <>
            {totalEvents} résultats trouvé{totalEvents > 1 ? "s" : ""}
          </>
        ) : (
          ""
        )}
      </div>
      {error && (
        <div className="px-4 py-2 shadow rounded-md my-4 border-red-700 text-red-800 bg-red-100 text-sm">
          {error}
        </div>
      )}

      <div className="py-4">
        {loading ? (
          <SkeletonCard nb={eventsPerPage ?? 4} />
        ) : events?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <EventCard
                key={index + "_" + Math.random() * 999}
                event={event}
              />
            ))}
          </div>
        ) : (
          <EventNull key={"eventnull"} />
        )}
      </div>

      <Pagination
        key={"pagination"}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("page", newPage.toString());
          window.history.pushState({}, "", newUrl.toString());
          setCurrentPage(newPage);
        }}
        itemsPerPage={eventsPerPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("nb_par_page", newItemsPerPage.toString());
          window.history.pushState({}, "", newUrl.toString());
          setEventsPerPage(newItemsPerPage);
        }}
      />
    </>
  );
};

export default EventsList;

const EventNull = () => {
  return (
    <div className="text-center border dark:border-gray-800 dark:bg-gray-800 shadow-sm rounded-lg py-10">
      <Drama className="h-16 w-16 mx-auto mb-4 opacity-35" />
      <h2 className="text-lg font-bold">Aucun événement trouvé</h2>
      <p className="text-gray-600">
        Essayez de modifier vos critères de recherche.
      </p>
    </div>
  );
};
