import { Session } from "next-auth";
import NavLink from "./nav-link";
import { LINKS } from "./constants";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { TypographyH4 } from "../ui/typhography-h4";
import { useCallback, useMemo } from "react";

interface NavMenuProps {
  session: Session | null;
}

const NavMenu = ({ session }: NavMenuProps) => {
  const roleUser = useMemo(() => session?.user.role, [session?.user.role]);

  const filteredLinks = useMemo(
    () =>
      LINKS.filter((link) =>
        roleUser === "admin" ? link.name !== "Profile" : link.name !== "Users",
      ),
    [roleUser],
  );

  const handleLogout = useCallback(async () => {
    await toast.promise(signOut(), {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to log out",
    });
  }, [toast]);

  return (
    <div className="flex h-full gap-1 lg:flex-col lg:justify-between lg:pb-10">
      <div className="flex w-[66%] gap-1 lg:w-full lg:flex-col lg:gap-5">
        <TypographyH4 className="py-5 text-center max-lg:hidden">
          role : {roleUser}
        </TypographyH4>
        {filteredLinks.map((link, i) => (
          <NavLink key={i} href={link.href} name={link.name} />
        ))}
      </div>

      {/* Logout */}
      <NavLink onClick={handleLogout} variant={"destructive"} name="Logout" />
    </div>
  );
};

export default NavMenu;
