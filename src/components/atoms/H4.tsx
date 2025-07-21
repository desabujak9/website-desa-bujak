type H4Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H4({ children, className = "" }: H4Props) {
  return (
    <h4 className={`text-[20px] md:text-[24px] font-medium ${className}`}>
      {children}
    </h4>
  );
}
