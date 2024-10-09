import { TypographyH2 } from "@/components/ui/typhography-h2";
import { TypographyP } from "@/components/ui/typhography-p";

const AccessDeniedPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <TypographyH2>Access Denied </TypographyH2>

      <TypographyP>
        You don&apos;t have permission to access this page.
      </TypographyP>
    </div>
  );
};

export default AccessDeniedPage;
