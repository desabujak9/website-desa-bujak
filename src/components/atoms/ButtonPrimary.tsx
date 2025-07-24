// components/atoms/ButtonPrimary.tsx
type ButtonPrimaryProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function ButtonPrimary({
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonPrimaryProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white bg-black hover:bg-gray-800 transition-all px-4 py-2 rounded-md text-[14px] md:text-[16px] font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
