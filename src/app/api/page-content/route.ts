import { NextResponse } from "next/server";
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
