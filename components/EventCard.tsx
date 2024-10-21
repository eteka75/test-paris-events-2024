import { EventRecord } from "@/lib/models.type";
import { Calendar1, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function EventCard({ event }: { event: EventRecord }) {
  const { id, title, address_name, cover_url, date_start, address_city } =
    event.fields;
  const img = cover_url ?? "/assets/img/default.png";
  return (
    <div className="border dark:border-gray-800  dark:bg-gray-800 dark:shadow-lg rounded-lg shadow-md overflow-hidden">
      <Link href={`/event/${id}`}>
        <Image
          src={img}
          alt={title}
          className="w-full h-48 object-cover"
          width={500}
          height={500}
        />
      </Link>
      <div className="p-4">
        <Link href={`/event/${id}`}>
          <h3 className="text-lg font-semibold">{title}</h3>
        </Link>
        <p className="text-sm text-gray-600">{address_name}</p>

        <div className="text-sm text-gray-500 flex  gap-4 mt-3">
          {date_start && (
            <p className="flex whitespace-nowrap gap-1 items-center">
              <Calendar1 className="w-4 h-4 -mt-0.5" />{" "}
              {new Date(date_start ?? "").toLocaleDateString()}
            </p>
          )}
          {address_city && (
            <p className="flex whitespace-nowrap gap-1 items-center">
              <MapPin className="w-4 h-4 -mt-0.5" />
              {address_city ?? null}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
