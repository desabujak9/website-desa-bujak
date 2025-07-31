import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Ambil semua artikel
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    const artikel = await prisma.artikelContent.findUnique({
      where: { id },
    });
    if (!artikel) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json(artikel);
  }

  const list = await prisma.artikelContent.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(list);
}

// Tambah artikel
export async function POST(req: NextRequest) {
  try {
    const { title, content, image } = await req.json();

    const result = await prisma.artikelContent.create({
      data: {
        title,
        image,
        content: [
          {
            title,
            paragraphs: content,
          },
        ],
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { error: "Gagal membuat artikel" },
      { status: 500 }
    );
  }
}

// Update artikel
export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, image } = await req.json();

    const result = await prisma.artikelContent.update({
      where: { id },
      data: {
        title,
        image,
        content: [
          {
            // title,
            paragraphs: content,
          },
        ],
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json(
      { error: "Gagal mengupdate artikel" },
      { status: 500 }
    );
  }
}

// Hapus artikel
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID tidak ditemukan" }, { status: 400 });
  }

  try {
    await prisma.artikelContent.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { error: "Gagal menghapus artikel" },
      { status: 500 }
    );
  }
}
