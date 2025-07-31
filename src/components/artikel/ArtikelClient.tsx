"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import H1 from "@/components/atoms/H1";
import H2 from "@/components/atoms/H2";
import P from "@/components/atoms/P";

type Artikel = {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  content: { paragraphs: string[] }[];
};

export default function ArtikelClient() {
  const [data, setData] = useState<Artikel[] | Artikel | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/artikel${id ? `?id=${id}` : ""}`);
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, [id]);

  if (!data) return <P>Memuat...</P>;

  if (Array.isArray(data)) {
    return (
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <H1>Daftar Artikel</H1>
        {data.map((a) => (
          <div
            key={a.id}
            className="border p-4 rounded shadow hover:bg-gray-50 transition cursor-pointer"
            onClick={() =>
              window.history.pushState(null, "", `/artikel?id=${a.id}`)
            }
          >
            <H2>{a.title}</H2>
            <P className="text-gray-500 mb-2">
              {new Date(a.createdAt).toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </P>
            <div className="relative w-full aspect-[3/2] rounded overflow-hidden mb-4">
              <Image
                src={a.thumbnail}
                alt={a.title}
                fill
                className="object-cover"
              />
            </div>
            <P>{a.content[0]?.paragraphs[0].slice(0, 150)}...</P>
          </div>
        ))}
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <H1>{data.title}</H1>
      <P className="text-gray-500">
        {new Date(data.createdAt).toLocaleString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </P>
      <div className="relative w-full aspect-[3/2] rounded overflow-hidden mb-4">
        <Image
          src={data.thumbnail}
          alt={data.title}
          fill
          className="object-cover"
        />
      </div>
      {data.content[0]?.paragraphs.map((para, i) => (
        <P key={i}>{para}</P>
      ))}
    </main>
  );
}
