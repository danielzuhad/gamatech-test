import { ArticleType } from "@/components/articles/type";
import { create } from "zustand";

export interface ArticleStateType {
  articles: ArticleType | null;
  setArticles: (articles: ArticleType) => void;
}

export const useArticleStore = create<ArticleStateType>((set) => ({
  articles: null,
  setArticles: (articles: ArticleType) => set({ articles }),
}));
