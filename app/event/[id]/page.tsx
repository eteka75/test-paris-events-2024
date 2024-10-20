import { fetchEventById } from "@/lib/fetchEvents";
import { Calendar1, Link2Icon, MapPin } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BottomBack, MiniLinkBack } from "./ui/BackBtn";

const Event = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const event = await fetchEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="md:shadow md:py-8 md:px-10 md:border md:rounded-md">
      <div className="flex gap-1  md:-ml-6 font-bold items-start">
        <MiniLinkBack />
        <h1 className="text-2xl md:text-start text-center">
          {event.fields.title}
        </h1>
      </div>

      <div className="text-sm md:justify-start justify-center text-gray-500 flex flex-wrap  gap-2 space-x-2  my-3">
        {event.fields.date_start && (
          <p className="flex whitespace-pre-wrap  gap-1 items-center">
            <Calendar1 className="w-4 h-4 -mt-0.5" />{" "}
            {new Date(event.fields.date_start ?? "").toLocaleDateString()}
          </p>
        )}
        {event.fields.address_city && (
          <p className="flex whitespace-pre-wrap gap-1 items-center">
            <MapPin className="w-4 h-4 -mt-0.5" />
            {event.fields.address_city ?? null}
            {event.fields.address_name
              ? ", " + event.fields.address_name
              : null}
          </p>
        )}
        {event.fields.url && (
          <a
            href={event.fields.url}
            target="_blanck"
            className="flex underline whitespace-pre-wrap gap-1 items-start"
          >
            <Link2Icon className="w-4 h-4 -mt-0.5" />
            {event.fields.url ?? null}
          </a>
        )}
      </div>
      <div>
        {event.fields.cover_url && (
          <Image
            src={event.fields.cover_url}
            alt={event.fields.title}
            className="w-full h-48 object-cover rounded-lg"
            width={500}
            height={500}
          />
        )}
      </div>
      {event.fields.lead_text && (
        <div className="text-lg font-bold py-4">{event.fields.lead_text}</div>
      )}
      <div
        className="text-lg space-y-4 event-content"
        dangerouslySetInnerHTML={{ __html: event.fields.description }}
      />
      <BottomBack />
    </div>
  );
};

export default Event;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id || "";
  const event = await fetchEventById(id);

  if (!event) {
    return {
      title: "Événement non trouvé",
      description: "Aucun événement trouvé pour cet identifiant.",
    };
  }

  return {
    title: `${event.fields.title} - Beebs Events`,
    description: event.fields.lead_text || "Description de l'événement.",
  };
}
