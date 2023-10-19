import { NextResponse } from "next/server";
import { tags } from "./mock-data";

export async function GET() {
  return NextResponse.json({ tags }, { status: 200 });
}
