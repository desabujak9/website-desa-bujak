import Image from "next/image";
import H1 from "@/components/atoms/H1";
import H4 from "@/components/atoms/H4";
import P from "@/components/atoms/P";

type ImageItem = {
  src: string;
  alt: string;
  title: string;
  desc: string;
};

type SectionImagesProps = {
  title: string;
  items: ImageItem[];
};

export default function SectionImages({ title, items }: SectionImagesProps) {
  return (
    <section className="w-full min-h-screen flex flex-col items-center place-content-center text-justify max-md:px-[48px] max-w-[960px] mx-auto gap-[48px] py-16">
      <H1>{title}</H1>
      <div className="grid md:grid-cols-1 gap-8">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <Image
              src={item.src}
              width={400}
              height={200}
              alt={item.alt}
              className="rounded-md mb-4 w-full aspect-[16/9] object-cover"
            />
            <H4 className="text-lg font-semibold mb-2">{item.title}</H4>
            <P>{item.desc}</P>
          </div>
        ))}
      </div>
    </section>
  );
}
