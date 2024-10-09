import { TypographyH2 } from "../../ui/typhography-h2";
import AdminArticleTable from "./admin-article-table";

const AdminContent = () => {
  return (
    <div className="relative flex flex-col items-center">
      <TypographyH2 className="mb-5">Articles (Admin)</TypographyH2>
      <AdminArticleTable />
    </div>
  );
};

export default AdminContent;
