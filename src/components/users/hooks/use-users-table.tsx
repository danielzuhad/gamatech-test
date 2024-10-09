import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { UserType } from "@/components/articles/type";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { userSchema, UserSchemaType } from "@/schema/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const useUsersTable = () => {
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const { data: session } = useSession();

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await api.get("/api/users", {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });

      return response.data;
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({
      id,
      firstName,
    }: {
      id: number;
      firstName: string;
    }) => {
      await api.put(
        `/api/users/${id}`,
        {
          first_name: firstName,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        },
      );
    },

    onSuccess: () => {
      setEditingUserId(null);
      refetch();
      toast.dismiss();
      toast.success("User updated successfully");
    },

    onMutate: () => {
      toast.loading("Updating user...");
    },

    onError: () => {
      setEditingUserId(null);
      toast.dismiss();
      toast.error("Something went wrong");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
    },
    onSuccess: () => {
      refetch();
      toast.dismiss();
      toast.success("User deleted successfully");
    },

    onMutate: () => {
      toast.loading("Deleting user...");
    },

    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong");
    },
  });

  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "first_name",
      header: "First Name",
      cell: ({ row }) => {
        const user = row.original;

        const {
          register,
          handleSubmit,
          formState: { isDirty },
          watch,
          getFieldState,
        } = useForm<UserSchemaType>({
          resolver: zodResolver(userSchema),
          defaultValues: {
            first_name: user.first_name,
            id: user.id,
          },
        });

        const onSubmit = handleSubmit((data) => {
          console.log("data ==>", data);
          updateUserMutation.mutate({
            id: user.id,
            firstName: data.first_name,
          });
        });

        if (editingUserId === user.id) {
          return (
            <form onSubmit={onSubmit}>
              <Input
                {...register("first_name")}
                className={cn("w-full", isDirty && "bg-muted")}
              />
            </form>
          );
        } else {
          return (
            <div
              className="cursor-pointer"
              onClick={() => {
                setEditingUserId(user.id);
              }}
            >
              {user.first_name}
            </div>
          );
        }
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

        const isEditing = editingUserId === user.id;

        return (
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
            {isEditing ? (
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-max"
                  onClick={() => {
                    const form = document.querySelector("form");
                    if (form) {
                      form.dispatchEvent(
                        new Event("submit", {
                          cancelable: true,
                          bubbles: true,
                        }),
                      );
                    }
                  }}
                >
                  Save
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-max"
                  onClick={() => {
                    setEditingUserId(null);
                  }}
                >
                  Clear
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-max"
                onClick={() => setEditingUserId(user.id)}
              >
                Edit
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              className="w-full sm:w-max"
              onClick={() => deleteUserMutation.mutate(user.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return { users, isLoading, isError, columns };
};

export default useUsersTable;
