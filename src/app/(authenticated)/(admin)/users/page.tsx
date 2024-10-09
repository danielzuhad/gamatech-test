import LayoutContainer from "@/components/layout/layout-container";
import { TypographyH2 } from "@/components/ui/typhography-h2";
import UsersTable from "@/components/users/users-table";

const Users = () => {
  return (
    <LayoutContainer>
      <div className="relative flex flex-col items-center">
        <TypographyH2 className="mb-5">Users</TypographyH2>
        <UsersTable />
      </div>
    </LayoutContainer>
  );
};

export default Users;
