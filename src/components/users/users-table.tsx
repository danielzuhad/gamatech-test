"use client";

import DataTable from "../data-table/data-table";
import useUsersTable from "./hooks/use-users-table";

const UsersTable = () => {
  const { users, isLoading, columns } = useUsersTable();

  return <DataTable data={users} columns={columns} isLoading={isLoading} />;
};

export default UsersTable;
