"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AuthServices from "@/services/auth";

const Logout = () => {
  const { toast } = useToast();
  const logout = async () => {
    try {
      const res = await AuthServices.logout();
      toast({
        description: res.message,
      });
    } catch (err: any) {
      toast({
        description: err.message,
      });
    }
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default Logout;
