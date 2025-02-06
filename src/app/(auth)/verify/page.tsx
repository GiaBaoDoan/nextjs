"use client";

import { Button } from "@/components/ui/button";
import AuthServices from "@/services/auth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verifyToken = async () => {
    setIsLoading(true);
    try {
      const res = await AuthServices.verify({ token });
      setMessage(res.payload.message);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);
  return (
    <div>
      <Button
        disabled={isLoading}
        onClick={() => (window.location.href = "/login")}
      >
        Về trang chủ
      </Button>
    </div>
  );
};

export default VerifyEmail;
