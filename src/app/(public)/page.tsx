import H1 from "@/components/atoms/H1";
import P from "@/components/atoms/P";
import HeroSection from "@/components/organisms/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
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
          <H1 className="">Selamat Datang di Desa Bujak</H1>
          <P>
            Tempat di mana kearifan lokal, semangat gotong royong, dan keindahan
            alam berpadu harmonis.
          </P>
        </div>
      </div>

      {/* Sekilas Desa */}
      <section className="w-full min-h-screen flex flex-col items-center place-content-center text-justify px-[144px] gap-[48px]">
        <H1 className="">Sekilas Desa Bujak</H1>
        <P>
          Desa Bujak adalah sebuah desa yang terletak di Kecamatan Batukliang,
          Kabupaten Lombok Tengah, Provinsi Nusa Tenggara Barat. Desa ini berada
          di kawasan kaki Gunung Rinjani, yang memberikan suasana alam yang
          sejuk, subur, dan kaya akan potensi alam maupun budaya. Dengan luas
          wilayah mencapai 605 hektar dan terdiri atas 19 dusun, Desa Bujak
          memiliki karakteristik geografis yang mendukung sektor pertanian,
          peternakan, serta kehutanan rakyat.
          <br />
          <br />
          Masyarakat Desa Bujak dikenal dengan semangat gotong royong yang
          tinggi, tercermin dalam berbagai kegiatan sosial seperti pembangunan
          infrastruktur desa, perayaan adat, dan pemeliharaan lingkungan.
          Pertanian merupakan sektor utama penggerak ekonomi masyarakat, dengan
          komoditas unggulan seperti padi, cabai, dan palawija yang tumbuh subur
          berkat kesuburan tanah dan ketersediaan air yang cukup.
          <br />
          <br />
          Selain potensi agraria, Desa Bujak juga memiliki kekayaan budaya yang
          khas. Salah satunya adalah seni tradisional Gendang Beleq, yang biasa
          ditampilkan dalam upacara adat dan perayaan penting sebagai simbol
          kekuatan dan kebersamaan. Tradisi budaya seperti Nyongkolan
          (iring-iringan pernikahan adat Sasak), kegiatan ziarah makam leluhur,
          dan kerajinan bambu masih terus dilestarikan oleh masyarakat. Semua
          ini menjadikan Desa Bujak sebagai potret desa yang tidak hanya kaya
          sumber daya alam, tetapi juga memegang teguh nilai-nilai budaya
          leluhur.
        </P>
      </section>

      {/* Potensi Utama */}
      <section className="w-full min-h-screen flex flex-col items-center place-content-center text-justify px-[144px] gap-[48px] bg-gray-100">
        <H1 className="">Potensi Utama Desa</H1>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              src: "/images/sawah.jpg",
              alt: "Sawah",
              title: "Pertanian",
              desc: "Desa Bujak didominasi lahan sawah. Komoditas utama seperti padi dan cabai tumbuh subur karena kondisi tanah yang baik.",
            },
            {
              src: "/images/peternakan.jpg",
              alt: "Peternakan",
              title: "Peternakan",
              desc: "Peternakan berkembang lewat inovasi seperti pembuatan silase dan mineral blok untuk meningkatkan produktivitas ternak.",
            },
            {
              src: "/images/kerajinan.jpg",
              alt: "Kerajinan Bambu",
              title: "Kerajinan Bambu",
              desc: "Pengrajin membuat berugak, piring cetak, dan furnitur bambu yang dikenal hingga luar Lombok.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <Image
                src={item.src}
                width={400}
                height={200}
                alt={item.alt}
                className="rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <P>{item.desc}</P>
            </div>
          ))}
        </div>
      </section>

      {/* Kebudayaan Lokal */}
      <section className="w-full min-h-screen flex flex-col items-center place-content-center text-justify px-[144px] gap-[48px]">
        <H1>Kearifan Lokal & Budaya</H1>
        <P>
          Desa Bujak merupakan salah satu desa di Lombok Tengah yang kaya akan
          nilai-nilai kearifan lokal dan tradisi budaya yang masih terjaga
          dengan baik. Salah satu warisan budaya paling menonjol dari desa ini
          adalah seni Gendang Beleq — sebuah pertunjukan musik tradisional yang
          megah dan energik, dimainkan oleh sekelompok pemuda dengan irama
          gendang besar dan instrumen tradisional lainnya. Gendang Beleq tidak
          hanya menjadi hiburan, tetapi juga memiliki makna spiritual dan
          simbolis, terutama dalam prosesi adat, penyambutan tamu kehormatan,
          dan upacara keagamaan.
          <br />
          <br />
          Tradisi Nyongkolan juga menjadi bagian tak terpisahkan dari budaya
          masyarakat Bujak. Nyongkolan adalah prosesi pengantin yang diiringi
          oleh musik tradisional Sasak dan arak-arakan masyarakat yang
          mengenakan pakaian adat. Kegiatan ini bukan hanya ritual pernikahan,
          tetapi juga ekspresi kebersamaan, kegembiraan, serta identitas sosial
          budaya masyarakat Sasak.
          <br />
          <br />
          Selain itu, kehidupan masyarakat Desa Bujak juga dipengaruhi oleh
          sistem nilai yang kuat seperti gotong royong (saling bantu),
          musyawarah mufakat, serta penghormatan terhadap alam dan leluhur. Ini
          terlihat dalam kegiatan seperti bersih desa, upacara adat tanam padi,
          dan kegiatan keagamaan yang menyatukan seluruh lapisan masyarakat.
          <br />
          <br />
          Tak kalah menarik adalah kegiatan seni dan kerajinan lokal seperti
          anyaman bambu, pembuatan berugak (gazebo khas Sasak), serta pementasan
          tari-tarian tradisional. Semua ini menunjukkan bahwa budaya bukan
          sekadar warisan, melainkan bagian dari kehidupan sehari-hari yang
          hidup dan terus berkembang bersama masyarakat Desa Bujak.
        </P>
      </section>

      {/* Galeri */}
      <section className="py-16 bg-gray-100 px-6 md:px-20">
        <H1 className="text-2xl md:text-3xl font-semibold text-center mb-10">
          Galeri Desa
        </H1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["galeri1", "galeri2", "galeri3", "galeri4"].map((img, idx) => (
            <Image
              key={idx}
              src={`/images/${img}.jpg`}
              width={300}
              height={200}
              alt={`Galeri ${idx + 1}`}
              className="rounded-md"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
