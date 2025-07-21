import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex">
      <div className="flex flex-col place-items-center place-content-center">
        <Image
          className="w-full aspect-auto"
          width={64}
          height={64}
          alt=""
          src={"/DESA BAHA.jpeg"}
        />
        <span className="flex flex-col text-[12px] md:text-[16px] text-center">
          <p className="font-bold">Desa Bujak</p>
          <p>Tatas Tuhu Trasna</p>
        </span>
      </div>
    </footer>
  );
}
