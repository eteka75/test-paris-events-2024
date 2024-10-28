// components/Filters.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FiltersProps {
  onSearch: (query: string) => void;
  search?: string;
}
const cities = [
  "Evènement gratuit",
  "Evènement payant",
  "Soirée spéciale",
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
    setActiveCity(search ?? "");
  }, [search]);

  const searchParams = useSearchParams();
  const nbPerPage = searchParams.get("nb_par_page") || "10";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    onSearch(query ? query.trim() : "");
    setActiveCity(`${query}`);
  };
  const handleCityClick = (city: string | null) => {
    setActiveCity(city);
    setQuery(city ? city.trim() : "");
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border bg-white border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Trouvez votre événement à Paris..."
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="text-white min-h-6 flex items-center whitespace-nowrap absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5 mr-1 md:hidden" />
            <span className="hidden md:flex">Rechercher</span>
            <span className="sr-only">Rechercher</span>
          </button>
        </div>
      </form>
      <div className="flex max-w-screen-sm justify-center md:justify-start  space-x-3space-y-4 text-sm">
        <Carousel
          opts={{
            align: "start",
          }}
          className=" max-w-screen-sm mb-4"
        >
          <CarouselContent className="my-1 ">
            <CarouselItem key={"index"} className="basis-1/4  ">
              <div
                className={`w-full text-center py-1 rounded-full px-2 truncate border ${
                  search === "" || search === null
                    ? "bg-blue-500 dark:bg-blue-600 border-0 text-white"
                    : "dark:bg-gray-800 bg-white"
                }`}
              >
                <Link
                  className="text-sm mx-auto"
                  href={`/?nb_par_page=${nbPerPage}`}
                  onClick={() => handleCityClick(null)}
                >
                  Accueil
                </Link>
              </div>
            </CarouselItem>

            {cities.map((city, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <div
                  className={`w-full text-center py-1 rounded-full px-2 truncate border ${
                    activeCity === city
                      ? "bg-blue-500 dark:bg-blue-600 border-0 text-white"
                      : "dark:bg-gray-800 bg-white"
                  }`}
                >
                  <Link
                    key={city}
                    href={`/?search=${city}&nb_par_page=${nbPerPage}`}
                    onClick={() => handleCityClick(city ?? "")}
                    className=" text-sm mx-auto"
                  >
                    {city}
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
