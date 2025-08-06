// src/app/api/chart/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const charts = await prisma.chart.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(charts);
  } catch (error) {
    console.error("Failed to fetch charts:", error);
    return NextResponse.json(
      { error: "Failed to fetch charts" },
      { status: 500 }
    );
  }
}
