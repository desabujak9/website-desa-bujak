// components/molecules/AdminNavCard.tsx
import H3 from "@/components/atoms/H3";
import P from "@/components/atoms/P";
import ButtonTetiary from "@/components/atoms/ButtonTetiary";
import Link from "next/link";

type AdminNavCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function AdminNavCard({
  title,
  description,
  href,
}: AdminNavCardProps) {
  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white flex flex-col justify-between gap-4">
      <div>
        <H3>{title}</H3>
        <P className="text-gray-600">{description}</P>
      </div>
      <Link href={href}>
        <ButtonTetiary>Kelola</ButtonTetiary>
      </Link>
    </div>
  );
}
