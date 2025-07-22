import Image from "next/image";

export default function DisplayLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/DESA BAHA.jpeg"
        alt="Logo Desa"
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
      <div className="leading-tight text-sm md:text-base">
        <p className="font-bold">Desa Bujak</p>
        <p className="text-gray-600">Bujak Bijak Bajik</p>
      </div>
    </div>
  );
}
