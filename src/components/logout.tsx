"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleApiError } from "@/lib/utils";
import AuthServices from "@/services/auth";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { toast } = useToast();
  const router = useRouter();
  const logout = async () => {
    try {
      const res = await AuthServices.logout();
      toast({
        description: `✅ ${res.payload.message}`,
      });

      router.push("/login");
    } catch (err) {
      handleApiError(err);
    }
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default Logout;
