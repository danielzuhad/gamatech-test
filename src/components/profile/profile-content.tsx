import { getServerSession } from "next-auth";
import { TypographyP } from "../ui/typhography-p";

const ProfileContent = async () => {
  const session = await getServerSession();

  return (
    <div className="flex h-full w-full flex-col items-center">
      <TypographyP className="text-xl">Name : {session?.user.name}</TypographyP>
    </div>
  );
};

export default ProfileContent;
