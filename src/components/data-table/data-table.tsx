"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { PaginationType } from "@/types/api-response";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pagination?: PaginationType;
  onPageChange?: (page: number) => void;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading,
  pagination,
  onPageChange,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="h-full w-full lg:px-10">
      <ScrollArea className="h-[60vh] w-full lg:h-[70vh]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* pagination */}
      {pagination && (
        <div className="mt-4 flex w-full items-center justify-end gap-2">
          <Button
            variant="outline"
            size={"sm"}
            disabled={pagination.page === 1}
            onClick={
              onPageChange ? () => onPageChange(pagination.page - 1) : undefined
            }
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size={"sm"}
            onClick={
              onPageChange ? () => onPageChange(pagination.page + 1) : undefined
            }
            disabled={data.length < pagination.limit}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
