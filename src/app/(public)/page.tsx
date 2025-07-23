"use client";

import { useEffect, useState } from "react";
import H1 from "@/components/atoms/H1";
import P from "@/components/atoms/P";
import SectionDynamic from "@/components/organisms/SectionDynamic";

type ContentBlock = {
  title: string;
  image?: string;
  paragraphs: string[];
};

type Item = {
  src: string;
  alt: string;
  title: string;
  desc: string;
};

type Section = {
  content?: ContentBlock;
  items?: Item[];
  hasTopBorder: boolean;
};

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/page-content?page=beranda");
        if (!res.ok) throw new Error("Gagal mengambil data dari server.");
        const json = await res.json();
        setSections(json.data || []);
      } catch (err: any) {
        console.error("Gagal mengambil data:", err);
        setError("Gagal memuat konten. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <div className="relative flex min-h-screen md:min-h-0 md:h-[50vh] w-full items-center justify-center overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          src="/Video Background.mp4"
        />
        <div className="absolute inset-0 bg-black/40 z-[1]" />
        <div className="relative z-[2] text-white text-center px-4 flex flex-col gap-3">
          <H1>Selamat Datang di Desa Bujak</H1>
          <P>
            Tempat di mana kearifan lokal, semangat gotong royong, dan keindahan
            alam berpadu harmonis.
          </P>
        </div>
      </div>

      {/* Section Content */}
      {loading && <p className="py-10">Memuat konten...</p>}
      {error && <p className="py-10 text-red-600">{error}</p>}
      {!loading && !error && sections.length === 0 && (
        <p className="py-10 text-gray-500">Belum ada konten tersedia.</p>
      )}
      {!loading &&
        !error &&
        sections.map((section, index) =>
          section.content ? (
            <SectionDynamic
              key={index}
              content={section.content}
              items={section.items}
              hasTopBorder={section.hasTopBorder}
            />
          ) : null
        )}
    </main>
  );
}
