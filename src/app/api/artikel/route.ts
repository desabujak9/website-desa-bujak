// src/app/api/artikel/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const articles = await prisma.artikelContent.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        thumbnail: true,
        createdAt: true,
      },
    });
    return NextResponse.json(articles);
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal mengambil artikel" },
      { status: 500 }
    );
  }
}
