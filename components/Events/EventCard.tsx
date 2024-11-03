"use client";
import { Event } from "@/types/search.type";
import { Calendar1, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import EventTitle from "./EventTitle";
import { format } from "date-fns";

export default function EventCard({ event }: { event: Event }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const {
    id,
    title,
    price_type,
    cover_alt,
    cover_url,
    address_city,
    date_start,
    lead_text,
  } = event;

  const img = cover_url ?? "/assets/img/default.png";

  return (
    <div className=" dark:border-gray-800 dark:bg-gray-800 dark:shadow-lg rounded-lg shadow-md overflow-hidden flex flex-col">
      <Link
        href={`/event/${id}`}
        aria-label={`Voir les details de l'évènement ${title}`}
      >
        <Image
          src={img}
          alt={cover_alt ?? ""}
          decoding="async"
          className="w-full h-48 object-cover"
          width={500}
          height={500}
          priority
        />
      </Link>
      <div className="flex flex-wrap justify-between flex-grow p-4">
        <Link
          href={`/event/${id}`}
          aria-label={`Voir les details de l'évènement ${title}`}
          passHref
        >
          <h2 className="text-lg hover:text-blue-700 dark:hover:text-blue-400 font-semibold">
            <EventTitle title={title ?? ""} query={query ?? ""} />
          </h2>
        </Link>
        <Link
          href={`/event/${id}`}
          aria-label={`Voir les details de l'évènement ${title}`}
          passHref
        >
          <h3 title={lead_text ?? ""} className="text-sm opacity-70">
            {lead_text?.slice(0, 100)}...
          </h3>
        </Link>
        <div className="text-sm flex flex-wrap truncate opacity-60 gap-4 mt-3">
          {date_start && (
            <div className="flex whitespace-nowrap gap-1 items-center">
              <Calendar1 className="w-4 h-4 -mt-0.5" />
              {format(new Date(date_start), "dd/MM/yyyy")}
            </div>
          )}
          {price_type && (
            <div className="capitalize  max-w-20 truncate items-center flex gap-1  text-sm ">
              <Ticket className="h-4 w-4" />
              {price_type}
            </div>
          )}
          {address_city && (
            <p className="flex whitespace-nowraps gap-1 items-center">
              <MapPin className="w-4 h-4 -mt-0.5" />
              {address_city ?? null}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
