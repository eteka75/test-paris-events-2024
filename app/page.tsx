import EventsList from "@/components/Events/EventsList";
import { fetchEvents } from "@/lib/fetchEvents";
import { HomePageProps } from "@/types/search.type";

export const metadata = {
  title: "Beebs Event",
  description: "Découvrez tous évènements sur Paris et environs",
};

const Home = async ({ searchParams }: HomePageProps) => {
  const search = searchParams.search || "";
  const currentPage = parseInt(searchParams.page || "1", 10);
  const eventsPerPage = parseInt(searchParams.nb_par_page || "4", 10);

  // Fetch des événements avec les paramètres URL
  const response = await fetchEvents(search, eventsPerPage, currentPage);
  const events = response.results;
  const totalEvents = response.total_count;

  return (
    <EventsList
      key={"event_list"}
      initialPage={currentPage}
      initialSearch={search}
      initialEventsPerPage={eventsPerPage}
      initialTotalEvents={totalEvents}
      initialEvents={events}
    />
  );
};

export default Home;
