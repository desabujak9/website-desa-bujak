"use client";
import H1 from "@/components/atoms/H1";
import P from "@/components/atoms/P";
import Image from "next/image";
import { useState } from "react";

type SectionContentProps = {
  title: string;
  paragraphs: string[];
  image?: string;
  hasTopBorder?: boolean;
};

export default function SectionContent({
  title,
  paragraphs,
  image,
  hasTopBorder = false,
}: SectionContentProps) {
  return (
    <section
      className={`w-full px-24 py-12 md:py-20 ${
        hasTopBorder ? "border-t border-gray-300" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
        {/* Teks */}
        <div className="flex flex-col text-justify gap-6 w-full">
          <H1 className="text-2xl md:text-3xl text-center">{title}</H1>
          {/* Gambar (jika ada) */}
          {image && (
            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
          {paragraphs.map((para, idx) => (
            <P key={idx} className="leading-relaxed">
              {para}
            </P>
          ))}
        </div>
      </div>
    </section>
  );
}
