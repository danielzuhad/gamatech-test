import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const ArticleLoadingList = () => {
  return (
    <ScrollArea className="h-[60vh] w-full lg:h-[70vh]">
      <div className="grid h-full w-full grid-cols-1 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-80 w-full" />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ArticleLoadingList;
