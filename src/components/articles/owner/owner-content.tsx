import { TypographyH2 } from "@/components/ui/typhography-h2";
import ArticleList from "./article-list";

const OwnerContent = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <TypographyH2 className="mb-5">Articles (Owner)</TypographyH2>
      <ArticleList />
    </div>
  );
};

export default OwnerContent;
