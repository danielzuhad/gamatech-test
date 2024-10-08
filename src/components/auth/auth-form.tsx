"use client";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import useAuth from "./hooks/use-auth";

const AuthForm = () => {
  const { authForm, handleSubmitForm } = useAuth();

  return (
    <Form {...authForm}>
      <form
        className="mt-10 w-full sm:w-[400px]"
        onSubmit={authForm.handleSubmit(handleSubmitForm)}
      >
        <FormField
          control={authForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={authForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-6 w-full" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
