import { cn } from "@/lib/utils";

interface TypographyH2Props {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH2({ children, className }: TypographyH2Props) {
  return (
    <h2
      className={cn(
        '"scroll-m-20 first:mt-0" border-b pb-2 text-3xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h2>
  );
}
