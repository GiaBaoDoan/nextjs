"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthServices from "@/services/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/utils";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export type LoginTypeForm = z.infer<typeof formSchema>;

export function LoginForm() {
  const form = useForm<LoginTypeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (values: LoginTypeForm) => {
    try {
      const res = await AuthServices.login(values);
      toast({
        description: `✅ ${res.payload.message}`,
      });
      router.push("/profile");
    } catch (err) {
      handleApiError(err);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-[300px]"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Đăng nhập
        </Button>
      </form>
      <div className="mt-4 text-sm">
        Chưa có tài khoản ?{" "}
        <Link className="underline" href="/signup">
          Đăng ký
        </Link>
      </div>
    </Form>
  );
}
