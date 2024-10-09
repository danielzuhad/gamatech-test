"use client";

import { TypographyP } from "@/components/ui/typhography-p";
import useArticle from "../hooks/use-articles";
import ArticleCard from "./article-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ArticleLoadingList from "./article-loading-list";

const ArticleList = () => {
  const { articles, isLoading, pagination, handlePageChange, isError } =
    useArticle();

  if (isLoading) {
    return <ArticleLoadingList />;
  }

  if (isError) {
    return <TypographyP>Error</TypographyP>;
  }

  return (
    <div className="h-full w-full flex-col lg:px-10">
      <ScrollArea className="h-[60vh] w-full lg:h-[70vh]">
        <div className="grid h-full w-full grid-cols-1 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-2">
          {articles?.data?.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </ScrollArea>

      {/* pagination */}
      {pagination && (
        <div className="mt-4 flex w-full items-center justify-end gap-2">
          <Button
            variant="outline"
            size={"sm"}
            disabled={pagination.page === 1}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size={"sm"}
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={articles && articles?.data.length < pagination.limit}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
