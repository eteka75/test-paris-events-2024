// components/Filters.tsx
"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchFilters from "./SearchFilters";
import { FiltersProps } from "@/types/search.type";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const cities = [
  "Montparnasse",
  "Champs-Elysées",
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
          <div className="absolute inset-y-0 text-white start-0 flex items-center ps-[3px] ">
            <SearchFilters onFilters={handleFilter} />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full py-4 ps-14 pe-16 md:pe-32  text-sm text-gray-900 border bg-white border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Trouvez votre événement à Paris..."
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="text-white shadow-none min-h-6 flex items-center h-12 whitespace-nowrap absolute end-[3px] bottom-[3px] border cursor-pointer bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5 mr-1 md:hidden" />
            <span className="hidden md:flex">Rechercher</span>
          </button>
        </div>
      </form>

      <Swiper
        spaceBetween={5}
        slidesPerView={3}
        slidesPerGroup={1}
        breakpoints={{
          240: {
            slidesPerView: 2,
          },
          340: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
        }}
        className="mb-2 mt-4 mx-auto"
      >
        <SwiperSlide>
          <Link
            className={`text-xs md:text-sm rounded-full py-1 px-2 flex justify-center items-center ${
              !activeCity && !search
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-800"
            }`}
            href={`/?nb_par_page=${nbPerPage}`}
            onClick={() => handleCityClick(null)}
          >
            Accueil
          </Link>
        </SwiperSlide>
        {cities.map((city) => (
          <SwiperSlide key={city}>
            <Link
              className={`text-xs md:text-sm max-w-40 text-ellipsis truncate whitespace-nowrap rounded-full py-1 px-2 flex justify-center items-center ${
                activeCity === city
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800"
              }`}
              href={`/?search=${city}&nb_par_page=${nbPerPage}`}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
