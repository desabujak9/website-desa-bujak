import Image from "next/image";
import H3 from "../atoms/H3";
import P from "../atoms/P";

export default function Footer() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10 px-6 md:px-16 bg-gray-100 text-gray-800">
      {/* Logo & Nama Desa */}
      <div className="flex flex-col items-center text-center gap-3">
        <Image
          src="/DESA BAHA.jpeg"
          alt="Logo Desa Bujak"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <div className="text-sm md:text-base leading-tight">
          <p className="font-bold">Desa Bujak</p>
          <p className="text-gray-600 italic">Bujak Bijak Bajik</p>
        </div>
      </div>

      {/* Alamat */}
      <div className="flex flex-col items-center text-center gap-3">
        <H3>Alamat</H3>
        <address className="not-italic text-sm md:text-base text-gray-700 leading-relaxed">
          Bujak, Batukliang
          <br />
          Kabupaten Lombok Tengah
          <br />
          Nusa Tenggara Barat 83552
        </address>
      </div>

      {/* Lokasi (Google Maps) */}
      <div className="flex flex-col items-center text-center gap-3">
        <H3>Lokasi Kami</H3>
        <div className="w-full max-w-[280px] h-[180px] rounded-md overflow-hidden shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=..." // ganti dengan URL asli
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Lokasi Desa Bujak"
          />
        </div>
      </div>
    </footer>
  );
}
