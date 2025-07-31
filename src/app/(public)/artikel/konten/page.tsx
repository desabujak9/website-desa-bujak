"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import H1 from "@/components/atoms/H1";
import P from "@/components/atoms/P";

type ParagraphBlock = {
  image?: string;
  paragraphs: string[];
};

type Artikel = {
  id: string;
  title: string;
  createdAt: string;
  thumbnail: string;
  content: ParagraphBlock[];
};

export default function ArtikelKontenPage() {
  const params = useSearchParams();
  const id = params.get("id");

  const [artikel, setArtikel] = useState<Artikel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchArtikel() {
      try {
        const res = await fetch(`/api/artikel/konten?id=${id}`);
        if (!res.ok) throw new Error("Gagal memuat artikel");
        const data = await res.json();
        setArtikel(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArtikel();
  }, [id]);

  if (!id) return <p className="py-10 text-center">ID tidak ditemukan.</p>;
  if (loading) return <p className="py-10 text-center">Memuat artikel...</p>;
  if (error || !artikel)
    return (
      <p className="py-10 text-center text-red-500">Gagal memuat artikel.</p>
    );

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <H1 className="mb-4">{artikel.title}</H1>
      <P className="text-gray-500 mb-6">
        {new Date(artikel.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </P>

      {artikel.thumbnail && (
        <div className="relative w-full aspect-[16/9] mb-6">
          <Image
            src={artikel.thumbnail}
            alt={artikel.title}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
      )}

      <div className="flex flex-col gap-8">
        {artikel.content.map((block, i) => (
          <div key={i} className="flex flex-col gap-4">
            {block.image && (
              <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden shadow">
                <Image
                  src={block.image}
                  alt={`Gambar paragraf ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 720px"
                />
              </div>
            )}
            {block.paragraphs.map((p, j) => (
              <P key={j} className="text-justify leading-relaxed">
                {p}
              </P>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
