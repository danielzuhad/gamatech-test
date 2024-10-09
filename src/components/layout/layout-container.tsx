import { cn } from "@/lib/utils";
import React from "react";

interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutContainer = ({ children, className }: LayoutContainerProps) => {
  return (
    <div className="h-full w-full lg:pl-2">
      <div
        className={cn("h-full w-full rounded-sm pt-10 lg:border", className)}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutContainer;
