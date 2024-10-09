"use client";

import { useSession } from "next-auth/react";
import AdminContent from "./admin/admin-content";
import OwnerContent from "./owner/owner-content";
import LoadingSection from "../loading/loading-section";

const RoleBasedContent = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <LoadingSection />;
  }

  if (data?.user?.role === "admin") {
    return <AdminContent />;
  } else {
    return <OwnerContent />;
  }
};

export default RoleBasedContent;
