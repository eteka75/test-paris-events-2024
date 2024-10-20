import { NextResponse } from "next/server";
import { fetchEvents } from "@/lib/fetchEvents";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const limit = parseInt(searchParams.get("limit") || "1");
  const currentPage = parseInt(searchParams.get("page") || "1");

  try {
    const events = await fetchEvents(query, limit, currentPage);
    return NextResponse.json({ events });
  } catch (error) {
    const msg = "Erreur lors de la récupération des événements.";
    console.log(msg + "" + error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
