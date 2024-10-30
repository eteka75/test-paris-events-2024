"use client";
import { useFilterContext } from "@/context/FilterContext";
import { FilterType } from "@/types/search.type";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { X } from "lucide-react";
import React, { useEffect } from "react";

const FilterDisplay = ({
  newSearch,
}: {
  newSearch: (filter: FilterType) => void;
}) => {
  const { filters, dispatch } = useFilterContext();

  // Suppression filtre
  const handleRemoveFilter = (key: keyof FilterType) => {
    dispatch({ type: "CLEAR_FILTER", payload: key });
  };
  useEffect(() => {
    newSearch(filters);
  }, [filters]);

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {filters && filters["sort"] && (
        <div className="flex rounded-sm items-center border px-2 text-sm space-x-2">
          <span className="">
            <b>Trier par:</b>{" "}
            {filters["sort"] === "date_asc" ? "Plus anciens" : "Plus récents"}
          </span>
          <button onClick={() => handleRemoveFilter("sort")}>
            <X />
          </button>
        </div>
      )}
      {filters && filters["audience"] && (
        <div className="flex rounded-sm items-center border px-2 text-sm space-x-2">
          <span className="capitalize">
            <b> Audience</b>:{" "}
            {filters["audience"] === "public_public"
              ? "Tout public"
              : filters["audience"] === "public_adultes"
              ? "Adultes"
              : filters["audience"] === "Tout"
              ? "Tout"
              : ""}
          </span>
          <button onClick={() => handleRemoveFilter("audience")}>
            <X />
          </button>
        </div>
      )}
      {filters && filters["locale"] && (
        <div className="flex rounded-sm items-center border px-2 text-sm space-x-2">
          <span className="capitalize">
            <b>Langue:</b>
            {filters["locale"] == "fr"
              ? "Français"
              : filters["locale"] == "en"
              ? "Anglais"
              : ""}
          </span>
          <button onClick={() => handleRemoveFilter("locale")}>
            <X />
          </button>
        </div>
      )}
      {filters && filters["price"] && (
        <div className="flex rounded-sm items-center border px-2 text-sm space-x-2">
          <span className="capitalize">
            <b>Type: </b>
            {filters["price"] === "All" ? "Tout" : filters["price"]}
          </span>
          <button onClick={() => handleRemoveFilter("price")}>
            <X />
          </button>
        </div>
      )}
      {filters && filters["startDate"] && (
        <div className="flex rounded-sm items-center border px-2 text-sm space-x-2">
          <span>
            <b> Débute le:</b>{" "}
            {format(filters["startDate"], "PPP", { locale: fr })}
          </span>
          <button onClick={() => handleRemoveFilter("startDate")}>
            <X />
          </button>
        </div>
      )}
      {filters && filters["endDate"] && (
        <div className="flex rounded-sm items-center border px-2 text-sm space-x-2">
          <span>
            <b> Prend fin le:</b>{" "}
            {format(filters["endDate"], "PPP", { locale: fr })}
          </span>
          <button onClick={() => handleRemoveFilter("endDate")}>
            <X />
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterDisplay;
