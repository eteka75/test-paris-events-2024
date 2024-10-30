// components/Filters.tsx
"use client";

import { Search, SearchCheckIcon, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import SearchFilters from "./SearchFilters";
import { FiltersProps } from "@/types/search.type";

const cities = [
  "Montparnasse",
  "Champs-Élysées",
  "Le Marais",
  "Quartier latin",
];

/**
 *
 * @param FiltersProps
 * @returns search View
 */
export default function Filters({ onSearch, search }: FiltersProps) {
  const [query, setQuery] = useState<string>();
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query ? query.trim() : "");
    setActiveCity(`${query}`);
  };

  const handleCityClick = (city: string | null) => {
    setActiveCity(city);
    setQuery(city ? city.trim() : "");
  };

  const handleFilter = () => {
    onSearch(query ? query.trim() : "");
  };
  useEffect(() => {
    setQuery(search ?? "");
    setActiveCity(search ?? "");
  }, [search]);

  const searchParams = useSearchParams();
  const nbPerPage = searchParams.get("nb_par_page") || "10";

  return (
    <div>
      <form onSubmit={handleSearch} className="mx-auto mb-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Rechercher
        </label>
        <div className="relative flex ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-1 ">
            <SearchFilters onFilters={handleFilter} />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-16 text-sm text-gray-900 border bg-white border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Trouvez votre événement à Paris..."
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="text-white min-h-6 flex items-center h-12 whitespace-nowrap absolute end-1 bottom-[3px] bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5 mr-1 md:hidden" />
            <span className="hidden md:flex">Rechercher</span>
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center md:justify-start  space-x-3space-y-4 text-sm">
        <Link
          className={`border dark:border-gray-800   mr-2 mb-2 whitespace-nowrap py-1 px-3 h-7 items-center flex rounded-full shadow-ms ${
            (activeCity === null || activeCity === "") &&
            (search === "" || search === null)
              ? "bg-blue-500 dark:bg-blue-600 border-0 text-white"
              : "dark:bg-gray-800 bg-white"
          }`}
          href={`/?nb_par_page=${nbPerPage}`}
          onClick={() => handleCityClick(null)}
        >
          Accueil
        </Link>
        {cities.map((city) => (
          <Link
            key={city}
            className={`border dark:border-gray-800   mr-2 mb-2 whitespace-nowrap py-1 px-3 h-7 items-center flex rounded-full shadow-ms ${
              activeCity === city
                ? "bg-blue-500 dark:bg-blue-600 border-0 text-white"
                : "dark:bg-gray-800 bg-white"
            }`}
            href={`/?search=${city}&nb_par_page=${nbPerPage}`}
            onClick={() => handleCityClick(city ?? "")}
          >
            {city}
          </Link>
        ))}
      </div>
    </div>
  );
}
