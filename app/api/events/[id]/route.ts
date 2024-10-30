import { NextResponse } from "next/server";
import { fetchEventById } from "@/lib/fetchEvents";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const event = await fetchEventById(id);
    if (event) {
      return NextResponse.json({ event });
    } else {
      return NextResponse.json(
        { error: "Aucun événement trouvé." },
        { status: 404 }
      );
    }
  } catch (error) {
    const msg = "Erreur lors de la récupération de l'événement.";

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
