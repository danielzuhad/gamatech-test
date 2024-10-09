"use client";

import LayoutContainer from "@/components/layout/layout-container";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TypographyH4 } from "@/components/ui/typhography-h4";
import { TypographyP } from "@/components/ui/typhography-p";
import { formatDate } from "@/lib/format-date";
import { useArticleStore } from "@/store/article-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DetailArticlePage = () => {
  const { articles } = useArticleStore();
  const router = useRouter();

  console.log(articles);

  useEffect(() => {
    if (articles === null) {
      router.push("/");
    }
  }, [articles]);

  return (
    <LayoutContainer className="flex h-full w-full flex-col items-start pt-0 lg:px-10 lg:pt-10">
      <ScrollArea className="h-[87vh]">
        <img
          src={articles?.image}
          alt={articles?.title}
          className="h-full max-h-72 w-full rounded-sm object-cover"
        />
        <TypographyP className="text-xs font-light text-muted-foreground 2xl:text-sm">
          {articles?.date
            ? formatDate(articles?.date, "dd MMMM yyyy, HH:mm")
            : ""}
        </TypographyP>
        <TypographyH4 className="my-5 2xl:text-3xl">
          {articles?.title}
        </TypographyH4>
        <TypographyP>{articles?.description}</TypographyP>
      </ScrollArea>
    </LayoutContainer>
  );
};

export default DetailArticlePage;
