// src/app/(public)/artikel/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

type Artikel = {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  content: { paragraphs: string[] }[];
};

function ArtikelPageClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<Artikel[] | Artikel | null>(null);
  const [mode, setMode] = useState<"list" | "single" | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/artikel${id ? `?id=${id}` : ""}`);
      const json = await res.json();
      setMode(json.mode);
      setData(json.data);
    };

    fetchData();
  }, [id]);

  if (!data || !mode) {
    return <p className="p-4 text-gray-600">Memuat...</p>;
  }

  if (mode === "single" && !Array.isArray(data)) {
    return (
      <main className="max-w-3xl mx-auto p-6 space-y-4">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="text-gray-500">
          {new Date(data.createdAt).toLocaleString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="relative w-full aspect-[3/2] rounded overflow-hidden mb-4">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
        {data.content[0]?.paragraphs.map((para, i) => (
          <p key={i} className="text-gray-800 leading-relaxed">
            {para}
          </p>
        ))}
      </main>
    );
  }

  if (mode === "list" && Array.isArray(data)) {
    return (
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Daftar Artikel</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {data.map((artikel) => (
            <Link
              href={`/artikel?id=${artikel.id}`}
              key={artikel.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={artikel.thumbnail}
                  alt={artikel.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{artikel.title}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(artikel.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  }

  return <p className="p-4 text-red-500">Terjadi kesalahan format data.</p>;
}

export default function ArtikelPage() {
  return (
    <Suspense fallback={<p className="p-4 text-gray-600">Memuat konten...</p>}>
      <ArtikelPageClient />
    </Suspense>
  );
}
