"use client";

import SectionDynamic from "@/components/organisms/SectionDynamic";
import { useState } from "react";

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

export default function SejarahPage() {
  const [content, setContent] = useState<SectionDynamicProps[]>([
    {
      content: {
        title: "Awal Mula Desa Bujak",
        image: "/images/sejarah-bujak.jpg", // ganti dengan path gambar relevan
        paragraphs: [
          "Secara administratif, Desa Bujak pada awalnya merupakan bagian dari Desa Barabali. Namun, pada masa itu masyarakat masih mengalami keterbatasan akses informasi terkait pendidikan, ekonomi, sosial budaya, dan keagamaan.",
          "Kondisi ini diperparah oleh minimnya infrastruktur jalan penghubung antar desa, yang menyebabkan keterjangkauan pelayanan pemerintahan menjadi terbatas.",
          "Melihat hal tersebut, sejumlah tokoh masyarakat terdahulu mulai bergerak dalam berbagai bidang, salah satunya pendidikan, yang ditandai dengan berdirinya sekolah dasar pertama di Desa Bujak, yaitu SDN Gunung Amuk.",
        ],
      },
      hasTopBorder: false,
    },
    {
      content: {
        title: "Tokoh Perintis dan Pemekaran Desa",
        paragraphs: [
          "Pemekaran Desa Barabali menjadi Desa Bujak didorong oleh inisiatif tokoh masyarakat, terutama Bapak H. Ahmad Mas’udi atau yang dikenal sebagai 'Bapak Depan'. Beliau dengan rela mengundurkan diri dari jabatan di pemerintahan Kabupaten Lombok Tengah demi mengabdi sebagai Kepala Desa Bujak pertama.",
          "Beliau dikenal dengan ungkapannya, 'Lebih baik jadi kepala kambing daripada menjadi ekor macan', yang mencerminkan semangat pengabdian terhadap masyarakat desa.",
          "Desa Bujak secara resmi ditetapkan sebagai desa hasil pemekaran dari Desa Barabali pada tanggal 29 Desember 1968.",
        ],
      },
      hasTopBorder: true,
    },
  ]);

  return (
    <main className="min-h-screen flex flex-col">
      {content.map((section, index) => (
        <SectionDynamic
          key={index}
          content={section.content}
          items={section.items}
          hasTopBorder={section.hasTopBorder}
        />
      ))}
    </main>
  );
}
