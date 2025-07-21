type H3Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H3({ children, className = "" }: H3Props) {
  return (
    <h3 className={`text-[24px] md:text-[30px] font-semibold ${className}`}>
      {children}
    </h3>
  );
}
