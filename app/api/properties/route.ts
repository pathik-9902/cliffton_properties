import { NextResponse } from "next/server";
import {properties} from "@/data.json";
export async function GET() {
  const result = properties.filter(
    (item) => item.status === "available"
  );

  return NextResponse.json(result);
}
