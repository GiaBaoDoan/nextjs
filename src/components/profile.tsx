"use client";

import { useToast } from "@/hooks/use-toast";
import AuthServices from "@/services/auth";
import { UserResType } from "@/types/user";
import { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState<UserResType>();

  const { toast } = useToast();
  const getProfile = async () => {
    try {
      const res = await AuthServices.me();
      setProfile(res.data);
    } catch (err) {
      toast({
        description: err.message,
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <p>name : {profile?.username}</p>
      <p>email : {profile?.email}</p>
      <p>Verify email : {profile?.isVerfied ? "rồi" : "chưa"}</p>
      <p>Admin : {profile?.isVerfied ? "rồi" : "chưa"}</p>
    </div>
  );
};

export default Profile;
