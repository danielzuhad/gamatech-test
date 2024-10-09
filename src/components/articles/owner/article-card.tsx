import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format-date";
import { TypographyP } from "@/components/ui/typhography-p";
import { ArticleType } from "../type";

interface ArticleCardProps {
  article: ArticleType;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <img
          src={
            article.image === null ? "https://picsum.photos/200" : article.image
          }
          alt={article.title}
          className="h-36 w-full rounded-md object-cover"
        />
        <TypographyP className="text-xs font-light text-muted-foreground">
          {formatDate(article.date, "dd MMMM yyyy, HH:mm")}
        </TypographyP>
        <CardTitle className="line-clamp-3 h-14 leading-6 lg:h-16 lg:leading-5">
          {article.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="line-clamp-4 px-3 text-xs">
        <TypographyP className="leading-5">{article.description}</TypographyP>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
