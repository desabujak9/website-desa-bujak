import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const artikel = await prisma.artikelContent.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(artikel);
}

export async function POST(req: NextRequest) {
  try {
    const { title, content, image } = await req.json();
    const slug = title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

    const result = await prisma.artikelContent.create({
      data: {
        title,
        slug,
        thumbnail: image,
        content: [{ paragraphs: content }],
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menambah artikel" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, image } = await req.json();

    const result = await prisma.artikelContent.update({
      where: { id },
      data: {
        title,
        thumbnail: image,
        content: [{ paragraphs: content }],
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal mengupdate artikel" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "ID tidak ditemukan" }, { status: 400 });

  try {
    await prisma.artikelContent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menghapus artikel" },
      { status: 500 }
    );
  }
}
