import H1 from "../atoms/H1";
import P from "../atoms/P";

export default function HeroSection() {
  return (
    <div className="relative flex min-h-screen md:min-h-0 md:h-[50vh] w-full items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        src="/Video Background.mp4"
      />

      {/* Optional overlay agar teks lebih kontras */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Konten di atas video */}
      <div className="relative z-[2] text-white text-center px-4 flex flex-col gap-[12px]">
        <H1 className="text-3xl md:text-5xl font-bold">
          Selamat Datang di Desa Bujak
        </H1>
        <P>
          Tempat di mana kearifan lokal, semangat gotong royong, dan keindahan
          alam berpadu harmonis.
        </P>
      </div>
    </div>
  );
}
