import { useState } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};
export default function ButtonTetiary({ children }: ButtonProps) {
  const [isHover, setIsHover] = useState(false);
  const switchIsHover = () => {
    setIsHover(!isHover);
  };
  return (
    <button
      onMouseEnter={switchIsHover}
      onMouseLeave={switchIsHover}
      className={`text-[12px] md:text-[16px]`}
    >
      {children}
      <div
        className={`h-[1px] bg-black transition-all ${
          isHover ? "w-full" : "w-0"
        }`}
      />
    </button>
  );
}
