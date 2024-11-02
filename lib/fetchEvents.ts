import { FilterType } from "@/types/search.type";
import axios from "axios";
import { formatDate } from "./utils";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/";

export async function fetchEvents(
  query: string = "",
  limit: number = 4,
  currentPage: number = 1,
  filters?: FilterType
) {
  try {
    // console.log(filters, "search:", new Date());
    const safeLimit = isNaN(limit) || limit <= 0 ? 4 : limit;
    const safePage = isNaN(currentPage) || currentPage <= 0 ? 1 : currentPage;

    const start = (safePage - 1) * safeLimit;
    const selectFields =
      "id,url,title,lead_text,description,date_start,date_end,date_description,cover_url,cover_alt,cover_credit,tags,address_name,address_street,address_zipcode,address_city,lat_lon,pmr,price_type,audience,locale";

    // les paramètres
    const params: Record<string, string> = {
      limit: safeLimit.toString(),
      offset: start.toString(),
      select: selectFields,
    };

    let whereConditions: string[] = [];

    // Filtrage langue
    if (filters?.locale && ["fr", "en"].includes(filters.locale)) {
      whereConditions.push(`locale="${filters.locale}"`);
    }

    // audience
    if (filters?.audience && filters?.audience !== "") {
      const audience =
        filters.audience === "public_public"
          ? "Tout public."
          : filters.audience === "public_adultes"
          ? "Public adultes."
          : null;
      if (audience) {
        whereConditions.push(`audience="${audience}"`);
      }
    }

    // startDate dateDebut
    if (filters?.startDate && filters?.startDate !== null) {
      const startDate = formatDate(filters?.startDate);
      whereConditions.push(`date_start>="${startDate}"`);
    }

    // endDate dateFin
    if (filters?.endDate && filters?.endDate !== null) {
      const endDate = formatDate(filters?.endDate);
      whereConditions.push(`date_end<="${endDate}"`);
    }

    // Filtrage de prix
    if (filters?.price && ["gratuit", "payant"].includes(filters.price)) {
      whereConditions.push(`price_type="${filters.price}"`);
    }

    // Gestion de la recherche
    let queryConditions = [...whereConditions]; // pour stocker les conditions de recherche sans query
    if (query) {
      queryConditions.push(
        `(title LIKE "%${query}%" OR description LIKE "%${query}%")`
      );
    }

    // Ajout des conditions dans `params`
    if (queryConditions.length > 0) {
      params["where"] = queryConditions.join(" AND ");
    }
    // Gestion du tri
    if (filters?.sort) {
      params["order_by"] =
        filters.sort === "date_asc" ? "updated_at asc" : "updated_at desc";
    }

    const response = await axios.get(apiUrl, { params });

    // Si aucun résultat trouvé, refaire une requête sans le `query`
    if (response.data.length === 0 && query) {
      // console.log("Pas de résultat trouvé avec le query, ...");
      delete params["where"];
      if (whereConditions.length > 0) {
        params["where"] = whereConditions.join(" AND ");
      }
      const secondResponse = await axios.get(apiUrl, { params });
      return secondResponse.data;
    }

    return response.data;
  } catch (error) {
    // console.error("Erreur lors de la récupération des événements :", error);
    return [];
  }
}

export async function fetchEventById(eventId: string) {
  try {
    const response = await axios.get(`${apiUrl}`, {
      params: {
        rows: 1,
        ...(eventId && { where: `id=${eventId}` }), // Recherche par ID
      },
    });

    if (response.data && response.data.total_count > 0) {
      return response.data.results[0];
    } else {
      // console.error("Aucun événement trouvé avec cet ID :", eventId);
      return null;
    }
  } catch (error) {
    // console.error("Erreur lors de la récupération de l'événement :", error);
    return null;
  }
}
