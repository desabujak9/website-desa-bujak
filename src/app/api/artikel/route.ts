// src/app/api/artikel/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    const artikel = await prisma.artikelContent.findUnique({ where: { id } });
    if (!artikel) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    return NextResponse.json({ mode: "single", data: artikel });
  }

  const list = await prisma.artikelContent.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ mode: "list", data: list });
}
