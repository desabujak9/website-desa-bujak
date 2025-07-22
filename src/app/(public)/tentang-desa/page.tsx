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

export default function TentangDesaPage() {
  const [content, setContent] = useState<SectionDynamicProps[]>([
    {
      content: {
        title: "Sekilas Desa Bujak",
        image: "/images/peternakan.jpg",
        paragraphs: [
          `Desa Bujak merupakan bagian dari Kecamatan Batukliang, Kabupaten Lombok Tengah, Provinsi Nusa Tenggara Barat. Secara resmi, desa ini dimekarkan dari Desa Barabali pada 29 Desember 1968 atas prakarsa tokoh masyarakat setempat, salah satunya Bapak H. Ahmad Mas’udi atau dikenal sebagai Bapak Depan. Beliau rela meninggalkan jabatannya di pemerintahan kabupaten demi mengabdi sebagai Kepala Desa Bujak pertama.`,
          `Ungkapan legendaris beliau, “Lebih baik jadi kepala kambing daripada menjadi ekor macan”, menjadi semangat awal berdirinya desa ini. Kini, Desa Bujak dikenal sebagai desa dengan kekayaan budaya, pertanian yang subur, dan masyarakat yang menjunjung tinggi nilai kekeluargaan dan gotong royong.`,
        ],
      },
      hasTopBorder: false,
    },
    {
      content: {
        title: "Letak dan Wilayah",
        image: "/images/peta-bujak.jpg",
        paragraphs: [
          `Secara geografis, Desa Bujak terletak di kaki Gunung Rinjani pada koordinat 8.6892° LS dan 116.3083° BT. Luas wilayahnya mencapai sekitar 605,72 hektar dan terdiri atas 19 dusun, di antaranya Dusun Montong Belok, Gunung Amuk, Bujak, Bajur, Dasan Lekong, dan lainnya. Desa ini memiliki topografi datar hingga sedikit bergelombang, yang mendukung pertanian padi secara intensif.`,
          `Letaknya yang hanya berjarak 3,81 km dari pusat pemerintahan Kecamatan Batukliang menjadikan Desa Bujak sebagai desa yang cukup strategis dalam hal akses layanan publik maupun mobilitas warga.`,
        ],
      },
      hasTopBorder: true,
    },
    {
      content: {
        title: "Karakteristik Alam & Sumber Daya",
        image: "/images/pertanian.jpg",
        paragraphs: [
          `Desa Bujak memiliki lahan pertanian yang sangat dominan, terutama berupa sawah. Selain itu, terdapat juga ladang, permukiman, serta kawasan bambu yang mendukung industri kerajinan lokal. Kesuburan tanahnya menjadikan desa ini cocok untuk komoditas seperti padi dan cabai.`,
          `Untuk mendukung produktivitas, masyarakat mulai memanfaatkan teknologi seperti silase untuk pakan ternak, serta pestisida alami berbahan dasar mimba dan bawang putih. Semua ini menunjukkan potensi pengembangan desa yang kuat dalam sektor pertanian berkelanjutan.`,
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
