// app/api/upload/route.ts
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";
import mime from "mime";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const tempDir = os.tmpdir();
  const filename = `${uuidv4()}.${mime.getExtension(file.type)}`;
  const tempFilePath = path.join(tempDir, filename);

  await writeFile(tempFilePath, buffer);

  const result = await cloudinary.uploader.upload(tempFilePath, {
    folder: "desa-bujak", // Opsional, nama folder Cloudinary
  });

  return NextResponse.json({ secure_url: result.secure_url });
}
