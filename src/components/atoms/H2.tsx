type H2Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H2({ children, className = "" }: H2Props) {
  return (
    <h2 className={`text-[30px] md:text-[36px] font-semibold ${className}`}>
      {children}
    </h2>
  );
}
