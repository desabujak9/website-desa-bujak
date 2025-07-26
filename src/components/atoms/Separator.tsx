// components/atoms/Separator.tsx
export default function Separator({ className = "" }: { className?: string }) {
  return <div className={`h-[1px] w-full bg-gray-300 ${className}`} />;
}
