import { authSchema, AuthSchemaType } from "@/schema/auth-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  const authForm = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const formSubmitMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: AuthSchemaType) => {
      const response = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (!response?.ok) {
        toast.dismiss();
        toast.error(response?.error || "Something went wrong.");
      }

      if (response?.ok) {
        toast.dismiss();
        toast.success("Login Successful");
        router.push("/");
      }
    },

    onMutate: () => {
      toast.loading("Logging in...");
    },
  });

  const handleSubmitForm = async (data: AuthSchemaType) => {
    await formSubmitMutation.mutateAsync(data);
  };

  return { authForm, handleSubmitForm };
};

export default useAuth;
