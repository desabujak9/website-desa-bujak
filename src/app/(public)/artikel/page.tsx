"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import H1 from "@/components/atoms/H1";
import P from "@/components/atoms/P";

type Artikel = {
  id: string;
  title: string;
  slug: string;
  image?: string;
  createdAt: string;
};

// Dummy data for Artikel
const dummyArticles: Artikel[] = [
  {
    id: "1",
    title: "Mengenal Sejarah Batik di Indonesia",
    slug: "mengenal-sejarah-batik-di-indonesia",
    image: "/images/batik.jpg",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Keindahan Alam Raja Ampat yang Memukau",
    slug: "keindahan-alam-raja-ampat-yang-memukau",
    image: "/images/raja-ampat.jpg",
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "3",
    title: "Kuliner Khas Nusantara yang Wajib Dicoba",
    slug: "kuliner-khas-nusantara-yang-wajib-dicoba",
    createdAt: "2024-03-05T08:45:00Z",
  },
  {
    id: "4",
    title: "Tips Liburan Hemat ke Bali",
    slug: "tips-liburan-hemat-ke-bali",
    image: "/images/bali.jpg",
    createdAt: "2024-04-10T11:00:00Z",
  },
  {
    id: "5",
    title: "Manfaat Yoga untuk Kesehatan Mental dan Fisik",
    slug: "manfaat-yoga-untuk-kesehatan-mental-dan-fisik",
    createdAt: "2024-05-01T09:15:00Z",
  },
];

export default function ArtikelPage() {
  const [articles, setArticles] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/artikel");
        if (!res.ok) throw new Error("Gagal fetch data");
        const data = await res.json();
        setArticles(data);
        setArticles(dummyArticles);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) return <p className="text-center py-10">Memuat artikel...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-10">Gagal memuat artikel.</p>
    );

  return (
    <main className="w-full px-6 md:px-24 py-12 md:py-20">
      <div className="flex flex-col items-center gap-12 max-w-5xl mx-auto">
        <H1 className="text-center text-3xl md:text-4xl">Daftar Artikel</H1>

        <div className="grid gap-10 md:grid-cols-2 w-full">
          {articles.map((artikel) => (
            <Link
              key={artikel.id}
              href={`/artikel/${artikel.slug}`}
              className="group border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all bg-white"
            >
              {artikel.image ? (
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={artikel.image}
                    alt={artikel.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 480px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/fallback.jpg";
                    }}
                  />
                </div>
              ) : (
                <div className="w-full aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  Tanpa Gambar
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold group-hover:underline mb-1">
                  {artikel.title}
                </h3>
                <P className="text-gray-500">
                  {new Date(artikel.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </P>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
