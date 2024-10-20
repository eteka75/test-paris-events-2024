// components/Filters.tsx
"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FiltersProps {
  onSearch: (query: string) => void;
  search?: string;
}
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
  useEffect(() => {
    setQuery(search ?? "");
    setActiveCity(`${search}`);
  }, [search]);

  const searchParams = useSearchParams();
  const nbPerPage = searchParams.get("nb_par_page") || "10";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    onSearch(query ?? "");
    setActiveCity(`${query}`);
  };
  const handleCityClick = (city: string | null) => {
    setActiveCity(city);
    setQuery(city ?? "");
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mx-auto mb-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Rechercher
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border bg-white border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Rechercher un événement sur Paris ..."
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="text-white min-h-6 flex items-center whitespace-nowrap absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <Search className="h-5 w-5 mr-1 md:hidden" />
            <span className="hidden md:flex"> Rechercher</span>
          </button>
        </div>
      </form>
      <div className="flex flex-wrap justify-center md:justify-start  space-x-3space-y-4 text-sm">
        <Link
          className={`border mr-2 mb-2 whitespace-nowrap py-1 px-3 h-7 items-center flex rounded-full shadow-ms ${
            activeCity === null && (search === "" || search === null)
              ? "bg-blue-500 border-0 text-white"
              : ""
          }`}
          href={`/?nb_par_page=${nbPerPage}`}
          onClick={() => handleCityClick(null)}
        >
          Accueil
        </Link>
        {cities.map((city) => (
          <Link
            key={city}
            className={`border mr-2 mb-2 whitespace-nowrap py-1 px-3 h-7 items-center flex rounded-full shadow-ms ${
              activeCity === city ? "bg-blue-500 border-0 text-white" : ""
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
