"use client";

import DataTable from "@/components/data-table/data-table";
import useArticle from "../hooks/use-articles";
import ArticleLoadingTable from "./article-loading-table";

const AdminArticleTable = () => {
  const { articles, isLoading, handlePageChange, pagination, columns } =
    useArticle();

  if (isLoading) {
    return <ArticleLoadingTable />;
  }

  return (
    <DataTable
      columns={columns}
      data={articles?.data || []}
      isLoading={isLoading}
      onPageChange={handlePageChange}
      pagination={pagination}
    />
  );
};

export default AdminArticleTable;
