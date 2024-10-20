import axios from "axios";

export async function fetchEvents(
  query: string = "",
  limit: number = 4,
  currentPage: number = 1
) {
  try {
    const safeLimit = isNaN(limit) || limit <= 0 ? 4 : limit;
    const safePage = isNaN(currentPage) || currentPage <= 0 ? 1 : currentPage;

    const start = (safePage - 1) * safeLimit;

    // console.log(`Query: ${query}, Limit: ${safeLimit}, Start: ${start}`);

    const response = await axios.get(
      "https://opendata.paris.fr/api/records/1.0/search/",
      {
        params: {
          dataset: "que-faire-a-paris-",
          rows: safeLimit,
          start: start,
          ...(query && { q: query }),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des événements :", error);
    return [];
  }
}

export async function fetchEventById(eventId: string) {
  try {
    const response = await axios.get(
      `https://opendata.paris.fr/api/records/1.0/search/`,
      {
        params: {
          dataset: "que-faire-a-paris-",
          rows: 1,
          ...(eventId && { q: `id:${eventId}` }), // Recherche par ID
        },
      }
    );
    if (response.data.records.length > 0) {
      return response.data.records[0];
    } else {
      console.error("Aucun événement trouvé avec cet ID :", eventId);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'événement :", error);
    return null;
  }
}
