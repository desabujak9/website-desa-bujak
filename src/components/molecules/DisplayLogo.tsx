import Image from "next/image";
import H1 from "../atoms/H1";
import H2 from "../atoms/H2";
import H3 from "../atoms/H3";
import H4 from "../atoms/H4";
import P from "../atoms/P";

export default function DisplayLogo() {
  return (
    <div className="flex gap-[6px] items-center w-full">
      <Image
        className="h-full w-fit"
        alt=""
        src={"/DESA BAHA.jpeg"}
        height={32}
        width={32}
      />
      <span className="flex flex-col text-[12px] md:text-[16px]">
        <p className="font-bold">Desa Bujak</p>
        <p>Bujak Bijak Bajik</p>
      </span>
    </div>
  );
}
