"use client";

import DataTable from "@/components/data-table/data-table";
import useArticle from "../hooks/use-articles";

const AdminDataTable = () => {
  const { articles, isLoading, handlePageChange, pagination, columns } =
    useArticle();

  if (articles === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <DataTable
      columns={columns}
      data={articles?.data}
      isLoading={isLoading}
      onPageChange={handlePageChange}
      pagination={pagination}
    />
  );
};

export default AdminDataTable;
