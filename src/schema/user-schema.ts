import { z } from "zod";

export const userSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .refine((val) => isNaN(Number(val)), "First name cannot be a number"),
  id: z.number().min(1, "ID is required"),
});

export type UserSchemaType = z.infer<typeof userSchema>;
