import EventsList from "@/components/EventsList";
import { fetchEvents } from "@/lib/fetchEvents";
import { HomePageProps } from "@/lib/props.type";

export const metadata = {
  title: "Les évènement sur Paris - Beebs Event",
  description: "Découvrez tous évènements sur Paris et environs",
};

const Home = async ({ searchParams }: HomePageProps) => {
  const search = searchParams.search || "";
  const currentPage = parseInt(searchParams.page || "1", 10);
  const eventsPerPage = parseInt(searchParams.nb_par_page || "4", 10);

  // Fetch des événements avec les paramètres URL
  const response = await fetchEvents(search, eventsPerPage, currentPage);
  const events = response.records;
  const totalEvents = response.nhits;

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
