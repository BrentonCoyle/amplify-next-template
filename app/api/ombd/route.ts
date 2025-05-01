import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  const omdbRes = await fetch(`https://www.omdbapi.com/?apikey=49b00c58&t=${title}`);
  const data = await omdbRes.json();

  return NextResponse.json(data);
}