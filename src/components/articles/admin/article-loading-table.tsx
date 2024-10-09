import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const ArticleLoadingTable = () => {
  return (
    <Table>
      <TableBody>
        {[...Array(10)].map((_, i) => (
          <TableRow key={i}>
            <TableCell colSpan={3}>
              <Skeleton className="h-10 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ArticleLoadingTable;
