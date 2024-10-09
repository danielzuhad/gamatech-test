import { Session } from "next-auth";
import NavLink from "./nav-link";
import { LINKS } from "./constants";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

interface NavMenuProps {
  session: Session | null;
}

const NavMenu = ({ session }: NavMenuProps) => {
  const roleUser = session?.user.role;

  const filteredLinks = LINKS.filter((link) =>
    roleUser === "admin" ? link.name !== "Profile" : link.name !== "Users",
  );

  const handleLogout = async () => {
    await toast.promise(signOut(), {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to log out",
    });
  };

  return (
    <div className="flex h-full gap-1 lg:flex-col lg:justify-between lg:py-10">
      {/* links */}
      <div className="flex w-[66%] gap-1 lg:w-full lg:flex-col lg:gap-5">
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
