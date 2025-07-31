// src/app/api/artikel/konten/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prismaDetail = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Parameter 'slug' diperlukan" },
      { status: 400 }
    );
  }

  try {
    const artikel = await prismaDetail.artikelContent.findUnique({
      where: { slug },
    });

    if (!artikel) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(artikel);
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal mengambil artikel" },
      { status: 500 }
    );
  }
}
