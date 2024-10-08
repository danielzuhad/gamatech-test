import AuthForm from "@/components/auth/auth-form";
import { TypographyH2 } from "@/components/ui/typhography-h2";
import { TypographyP } from "@/components/ui/typhography-p";

const AuthPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <TypographyH2 className="text-center">
        Welcome to the Article App
      </TypographyH2>
      <TypographyP>You need to sign in first to access</TypographyP>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
