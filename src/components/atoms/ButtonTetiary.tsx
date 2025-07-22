import { useState } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ButtonTetiary({ children }: ButtonProps) {
  const [isHover, setIsHover] = useState(false);

  const switchIsHover = () => setIsHover(!isHover);

  return (
    <button
      onMouseEnter={switchIsHover}
      onMouseLeave={switchIsHover}
      className={`text-[12px] md:text-[16px] w-fit px-2 py-1 text-nowrap`}
    >
      {children}
      <div
        className={`h-[1px] bg-black transition-all duration-300 ${
          isHover ? "w-full" : "w-0"
        }`}
      />
    </button>
  );
}
