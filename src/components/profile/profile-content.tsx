import { getServerSession } from "next-auth";
import { TypographyP } from "../ui/typhography-p";
import { authOptions } from "@/lib/auth-options";

const ProfileContent = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <TypographyP className="text-xl">Name : {session?.user.name}</TypographyP>
      <TypographyP className="text-xl">Role : {session?.user.role}</TypographyP>
    </div>
  );
};

export default ProfileContent;
