import axios from "axios";

export async function fetchEvents(query = "", limit = 4, currentPage = 1) {
  try {
    console.log(query, limit);
    const response = await axios.get(
      "https://opendata.paris.fr/api/records/1.0/search/",
      {
        params: {
          dataset: "que-faire-a-paris-",
          rows: limit,
          start: (currentPage - 1) * limit,
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
    console.log(response, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    if (response.data.records.length > 0) {
      return response.data.records[0]; // Retourne la première entrée
    } else {
      console.error("Aucun événement trouvé avec cet ID :", eventId);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'événement :", error);
    return null;
  }
}
