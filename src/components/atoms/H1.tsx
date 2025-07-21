type H1Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H1({ children, className = "" }: H1Props) {
  return (
    <h1 className={`text-[36px] md:text-[48px] font-bold ${className}`}>
      {children}
    </h1>
  );
}
