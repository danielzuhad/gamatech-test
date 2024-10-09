import { TypographyH2 } from "../../ui/typhography-h2";
import AdminDataTable from "./admin-data-table";

const AdminContent = () => {
  return (
    <div className="relative flex flex-col items-center">
      <TypographyH2 className="mb-5">AdminContent</TypographyH2>
      <AdminDataTable />
    </div>
  );
};

export default AdminContent;
