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

export default function KebudayaanPage() {
  const [content, setContent] = useState<SectionDynamicProps[]>([
    {
      content: {
        title: "Kebudayaan di Desa Bujak",
        image: "/images/gendang-beleq.jpg", // ganti dengan path gambar Gendang Beleq
        paragraphs: [
          "Desa Bujak memiliki kekayaan budaya yang sangat beragam. Salah satu kesenian tradisional yang menjadi kebanggaan adalah Gendang Beleq. Gendang Beleq merupakan musik tradisional dari masyarakat Sasak, terdiri dari gendang, gong, reyong, ricik, petuk, dan suling.",
          "Gendang Beleq dahulu digunakan untuk membakar semangat prajurit di medan perang, namun kini bertransformasi menjadi pengiring upacara pernikahan, tradisi nyongkolan, dan hiburan masyarakat.",
          "Dalam kelompok Gendang Beleq terdapat susunan instrumen dan barisan yang tertata demi keseimbangan irama dan estetika. Pemainnya mengenakan pakaian adat khas Sasak.",
          "Di Desa Bujak, terdapat tiga kelompok seni Gendang Beleq yang tersebar di Dusun Montong Geria, Tilawah, dan Gunung Amuk.",
        ],
      },
      hasTopBorder: false,
    },
    {
      content: {
        title: "Kelepon Kecerit: Jajanan Pasar Khas Bujak",
        image: "/images/kelepon-kecerit.jpg", // ganti sesuai gambar kelepon
        paragraphs: [
          "Salah satu jajanan pasar unik dari Desa Bujak adalah Kelepon Kecerit. Bentuknya yang bulat dengan ujung mencuat keluar dan isian gula aren cair yang meledak di mulut membuatnya dijuluki 'kecerit'.",
          "Inak Wira, pedagang kelepon dari Desa Bujak, menjelaskan bahwa bentuk tersebut dibuat agar mudah diingat oleh pembeli.",
          "Proses pembuatan kelepon dilakukan dari siang hingga sore dan dijual keesokan harinya di pasar Barabali. Selain kelepon, juga dijual kue lupis, serabi, ketan hitam, dan tape singkong.",
        ],
      },
      hasTopBorder: true,
    },
    {
      content: {
        title: "Kerajinan Bambu: Warisan Lokal Bernilai Ekonomi",
        image: "/images/berugak-bambu.jpg", // ganti dengan gambar berugak
        paragraphs: [
          "Kerajinan bambu merupakan salah satu potensi budaya dan ekonomi masyarakat Desa Bujak. Produk unggulan antara lain berugak (gazebo), kandang ayam, sangkar burung, hingga piring cetak dari rotan.",
          "Sepanjang Jalan Raya Mataram–Sikur, dapat ditemukan banyak pengrajin berugak. Produk ini diminati hingga ke Bali dan Sumbawa.",
          "Bambu yang digunakan berasal dari jenis galah, tali, petung, dan aur. Atap berugak dibuat dari ilalang yang didatangkan dari Lombok Timur.",
          "Pengrajin aktif memasarkan produknya melalui media sosial seperti Facebook. Harga berugak menyesuaikan ukuran, berkisar antara dua hingga tiga juta rupiah.",
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
