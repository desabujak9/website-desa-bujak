"use client";

import H1 from "@/components/atoms/H1";
import H4 from "@/components/atoms/H4";
import P from "@/components/atoms/P";
import Image from "next/image";

type ParagraphContent = {
  title: string;
  paragraphs: string[];
  image?: string;
};

type ImageItem = {
  src: string;
  alt: string;
  title: string;
  desc: string;
};

type SectionDynamicProps = {
  content: ParagraphContent;
  items?: ImageItem[];
  hasTopBorder?: boolean;
};

export default function SectionDynamic({
  content,
  items,
  hasTopBorder = false,
}: SectionDynamicProps) {
  return (
    <section
      className={`w-full px-24 md:px-24 py-12 md:py-20 ${
        hasTopBorder ? "border-t border-gray-300" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-12 max-w-3xl mx-auto">
        {/* Judul */}
        <H1 className="text-2xl md:text-3xl text-center">{content.title}</H1>

        {/* Jika ada konten paragraf */}
        {content.paragraphs && content.paragraphs.length > 0 && (
          <div className="flex flex-col text-justify gap-6 w-full">
            {/* Gambar paragraf (jika ada) */}
            {content.image && (
              <div className="relative w-full mx-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={content.image}
                  alt={content.title}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
            )}
            {content.paragraphs.map((para, idx) => (
              <P key={idx} className="leading-relaxed">
                {para}
              </P>
            ))}
          </div>
        )}

        {/* Jika ada item gambar */}
        {items && items.length > 0 && (
          <div className="grid md:grid-cols-1 gap-8 w-full">
            {items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6">
                <Image
                  src={item.src}
                  width={400}
                  height={200}
                  alt={item.alt}
                  className="rounded-md mb-4 w-full aspect-[16/9] object-cover"
                />
                <H4 className="text-lg font-semibold mb-2">{item.title}</H4>
                <P>{item.desc}</P>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
