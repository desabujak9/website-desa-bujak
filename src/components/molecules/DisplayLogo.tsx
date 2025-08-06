import Image from "next/image";

export default function DisplayLogo() {
  return (
    <div className="flex items-center gap-2 ">
      <Image
        src="/logo_desa.jpeg"
        alt="Logo Desa"
        width={100}
        height={100}
        className="rounded-full w-fit h-[32px]"
      />
      <div className="leading-tight text-sm md:text-base">
        <p className="font-bold">Desa Bujak</p>
        <p className="text-gray-600">Bujak Bijak Bajik</p>
      </div>
    </div>
  );
}
