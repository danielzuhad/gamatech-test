"use client";

import { useSession } from "next-auth/react";
import NavMenu from "./nav-menu";

const Navbar = () => {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <div className="bottom-2 left-0 w-full px-2 max-lg:absolute lg:px-0">
        <div className="rounded-sm lg:h-full lg:border lg:p-2">
          <NavMenu session={session} />
        </div>
      </div>
    );
  }
};

export default Navbar;
