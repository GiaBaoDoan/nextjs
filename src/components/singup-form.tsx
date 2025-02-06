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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import UserServices from "@/services/auth";
import Link from "next/link";
import { handleApiError } from "@/lib/utils";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Tên không để trống.",
  }),
  password: z.string().min(5, {
    message: "Mật khẩu không để trống.",
  }),
  email: z.string().email({
    message: "Email không hợp lệ",
  }),
});

export type SignUpFormType = z.infer<typeof formSchema>;

export function SignupForm() {
  const { toast } = useToast();

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: SignUpFormType) => {
    try {
      const res = await UserServices.singup(values);
      toast({
        description: `✅ ${res.payload.message}`,
      });
      router.push("/login");
    } catch (err) {
      handleApiError(err);
    }
  };
  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-[300px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="Email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          Đăng ký
        </Button>
      </form>
      <div className="mt-4 text-sm">
        Đã có tài khoản ?{" "}
        <Link className="underline" href="/login">
          Đăng nhập
        </Link>
      </div>
    </Form>
  );
}
