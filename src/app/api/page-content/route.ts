import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");

  if (!page) {
    return NextResponse.json(
      { error: "Missing page parameter" },
      { status: 400 }
    );
  }

  try {
    const content = await prisma.pageContent.findFirst({
      where: { page },
    });

    if (!content) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ data: content.data });
  } catch (err) {
    console.error("Error fetching page content:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");

  if (!page || page.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Parameter 'page' wajib diisi." },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const { data } = body;

    if (!data || !Array.isArray(data)) {
      return NextResponse.json(
        { success: false, error: "'data' harus berupa array section." },
        { status: 400 }
      );
    }

    const existing = await prisma.pageContent.findFirst({ where: { page } });

    if (existing) {
      await prisma.pageContent.update({
        where: { id: existing.id },
        data: { data },
      });
    } else {
      await prisma.pageContent.create({
        data: { page, data },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Data berhasil disimpan.",
    });
  } catch (err) {
    console.error("[PUT /api/page-content] Error updating content:", err);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
