import { LoaderCircle } from "lucide-react";

const LoadingSection = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle className="size-20 animate-spin text-muted-foreground transition-all" />
    </div>
  );
};

export default LoadingSection;
