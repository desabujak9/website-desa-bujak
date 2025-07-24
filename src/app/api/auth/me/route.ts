// src/app/api/auth/me/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: token },
      select: {
        id: true,
        email: true,
        name: true, // sesuaikan dengan field di model user kamu
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
