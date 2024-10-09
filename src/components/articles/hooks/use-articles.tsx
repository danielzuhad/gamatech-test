import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ArticleType } from "../type";
import { ApiResponseType, PaginationType } from "@/types/api-response";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

const useArticle = () => {
  const [pagination, setPagination] = useState<PaginationType>({
    limit: 10,
    page: 1,
  });

  const { data: session } = useSession();

  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery<ApiResponseType<ArticleType>>({
    queryKey: ["admin-articles", pagination.page],
    queryFn: async () => {
      const response = await api.get("/api/articles", {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },

        params: pagination,
      });

      return response.data;
    },
  });

  const handlePageChange = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };

  const columns: ColumnDef<ArticleType>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell({ row }) {
          return (
            <p className="line-clamp-1 w-[50px] text-xs lg:text-sm">
              {row.original.id}
            </p>
          );
        },
      },
      {
        accessorKey: "title",
        header: "Title",
        cell({ row }) {
          return (
            <p className="line-clamp-3 text-xs lg:text-sm">
              {row.original.title}
            </p>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell({ row }) {
          return (
            <p className="line-clamp-3 text-xs lg:text-sm">
              {row.original.description}
            </p>
          );
        },
      },
    ],
    [],
  );

  return {
    articles,
    isLoading,
    isError,
    pagination,
    handlePageChange,
    columns,
  };
};

export default useArticle;
