"use client";

import { useEffect, useState } from "react";
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

export default function BudayaPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/page-content?page=budaya");
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
