// =====================
// File: app/api/galeri/route.ts
// =====================

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(galeri);
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal mengambil data galeri" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { src, alt } = body;

    if (!src || !alt) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const added = await prisma.galeri.create({ data: { src, alt } });
    return NextResponse.json(added);
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menambahkan gambar" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID tidak disediakan" }, { status: 400 });
  }

  try {
    await prisma.galeri.delete({ where: { id } });
    return NextResponse.json({ message: "Gambar berhasil dihapus" });
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menghapus gambar" },
      { status: 500 }
    );
  }
}
