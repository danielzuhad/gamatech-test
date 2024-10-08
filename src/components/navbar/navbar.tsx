"use client";

import { useSession } from "next-auth/react";
import NavMenu from "./nav-menu";

const Navbar = () => {
  const { status } = useSession();

  console.log(status);

  if (status === "authenticated") {
    return (
      <div className="bottom-2 left-0 w-full px-2 max-lg:absolute">
        <div className="rounded-sm border px-1">
          <NavMenu />
        </div>
      </div>
    );
  }
};

export default Navbar;
