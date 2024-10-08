"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface LayoutPageProps {
  children: React.ReactNode;
}

const LayoutPage = ({ children }: LayoutPageProps) => {
  const { status } = useSession();

  return (
    <div className="p container mx-auto flex h-screen items-center justify-center p-5 md:max-w-screen-sm lg:max-w-screen-lg 2xl:max-w-screen-xl">
      <div
        className={cn(
          "relative h-full w-full rounded-md border p-2",
          status === "authenticated" && "lg:grid lg:grid-cols-[200px_1fr]",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutPage;
