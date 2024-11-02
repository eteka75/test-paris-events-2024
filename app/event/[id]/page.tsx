import { fetchEventById } from "@/lib/fetchEvents";
import {
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  Link2Icon,
  MapPin,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BottomBack, MiniLinkBack } from "./ui/BackBtn";

async function getEventData(id: string) {
  const event = await fetchEventById(id);
  if (!event) {
    notFound();
  }
  return event;
}

const Event = async ({ params }: { params: { id: string } }) => {
  const event = await getEventData(params.id);
  if (!event) return null;
  return (
    <div className="md:shadow event-article md:py-8 md:px-10 md:border dark:border-gray-800 dark:md:bg-gray-800 md:rounded-md">
      <div className="flex gap-1 md:-ml-8 font-bold items-center md:items-start mb-4 -mt-2 md:mt-0">
        <MiniLinkBack />
        <h1 className="text-2xl w-full md:w-auto md:text-start text-center">
          {String(event.title).trim()}
        </h1>
      </div>

      <div className="text-sm md:justify-start justify-center opacity-70 flex flex-wrap gap-x-4 gap-y-2 my-3">
        {event.date_start && (
          <p className="flex whitespace-pre-wrap break-words gap-1 items-center">
            <CalendarArrowUpIcon className="w-4 h-4 -mt-0.5" />
            <span>Début:</span>{" "}
            {new Date(event.date_start ?? "").toLocaleDateString()}
          </p>
        )}
        {event.date_end && (
          <p className="flex whitespace-pre-wrap break-words gap-1 items-center">
            <CalendarArrowDownIcon className="w-4 h-4 -mt-0.5" />
            <span>Fin:</span>{" "}
            {new Date(event.date_end ?? "").toLocaleDateString()}
          </p>
        )}
        {event.price_type && (
          <p className="flex whitespace-pre-wrap capitalize break-words gap-1 items-center">
            <Ticket className="h-4 w-4 -mt-0.5" />
            {event.price_type}
          </p>
        )}
        {event.address_city && (
          <p className="flex whitespace-pre-wrap break-words gap-1 items-center">
            <MapPin className="w-4 h-4 -mt-0.5" />
            {event.address_city}
            {event.address_name ? ", " + event.address_name : null}
          </p>
        )}
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex underline items-center whitespace-pre-wrap break-words gap-1"
          >
            <Link2Icon className="w-4 h-4 -mt-0.5" />
            Consulter
          </a>
        )}
      </div>
      <div>
        {event.cover_url && (
          <Image
            src={event.cover_url}
            alt={event.title}
            priority
            decoding="async"
            className="w-full h-48 object-cover rounded-lg"
            width={500}
            height={500}
          />
        )}
        {event.cover_credit && (
          <div className="text-sm text-center opacity-70">
            Crédit photo : {event.cover_credit}
          </div>
        )}
      </div>
      {event.lead_text && (
        <div className="text-xl lead font-bold py-4 break-words overflow-hidden overflow-ellipsis max-w-full">
          {event.lead_text}
        </div>
      )}
      <div
        className="space-y-4 leading-relaxed font-serif add event-content max-w-[100%] overflow-hidden overflow-ellipsis"
        dangerouslySetInnerHTML={{ __html: event.description }}
      />
      <BottomBack />
    </div>
  );
};

export default Event;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const event = await getEventData(params.id);

  return {
    title: event ? `${event.title} - Beebs Events` : "Événement non trouvé",
    description: event?.lead_text || "Evènement non trouvé.",
  };
}
