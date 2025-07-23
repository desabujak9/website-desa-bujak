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
          "Secara administratif, Desa Bujak pada awalnya merupakan bagian dari Desa Barabali. Namun demikian, pada saar itu tatanan kehidupan masyarakat masih jauh dari akses informasi yang berkaitan dengan aspek pendidikan, ekonomi, sosial budaya, dan keagamaan.",
          "Kondisi ini diperparah oleh minimnya infrastruktur jalan penghubung antar desa, yang menyebabkan keterjangkauan pelayanan pemerintahan menjadi terbatas.",
          "Melihat hal tersebut, sejumlah tokoh masyarakat terdahulu mulai bergerak dalam berbagai bidang, salah satunya pendidikan, yang ditandai dengan berdirinya sekolah dasar pertama di Desa Bujak, yaitu SDN Gunung Amuk.",
          "Muncul perada yang mengijinkan Desa Barabali untuk dimekarkan dengan Bapak H. Ahmad Mas’udi atau yang biasa disebut sebagai Bapak Depan untuk menjadi kepala desa.",
          "Ketika itu, Bapak Depan masih menjabat sebagai pegawai di Kabupaten Lombok Tengah, hingga akhirnya rela melepas jabatan tersebut untuk menjadi Kepala Desa Bujak.",
          "Sikap Bapak Depan diikuti dengan pernyataan beliau berupa perumpamaan “Lebih Baik jadi Kepala Kambing daripada menjadi Ekor Macan”",
          "Desa Bujak secara resmi ditetapkan sebagai desa baru hasil pemekaran Desa Barabali pada tanggal 29 Desember 1968",
        ],
      },
      hasTopBorder: false,
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
