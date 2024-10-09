"use client";

import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinkProps extends VariantProps<typeof buttonVariants> {
  name: string;
  href?: string;
  onClick?: () => void;
}

const NavLink = ({
  variant = "outline",
  href,
  name,
  onClick,
}: NavLinkProps) => {
  const pathName = usePathname();

  return (
    <Button
      asChild
      variant={pathName === href ? "secondary" : variant}
      className="flex-grow lg:flex-grow-0"
    >
      <Link href={href ? href : ""} onClick={onClick}>
        {name}
      </Link>
    </Button>
  );
};

export default NavLink;
