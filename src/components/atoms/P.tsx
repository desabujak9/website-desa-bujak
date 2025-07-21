type PProps = {
  children: React.ReactNode;
  className?: string;
};

export default function P({ children, className = "" }: PProps) {
  return (
    <p className={`text-[12px] md:text-[16px] font-medium ${className}`}>
      {children}
    </p>
  );
}
