"use client";

import { handleApiError } from "@/lib/utils";
import AuthServices from "@/services/auth";
import { UserResType } from "@/types/user";
import { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState<UserResType>();

  const getProfile = async () => {
    try {
      const res = await AuthServices.me();
      setProfile(res.payload.data);
    } catch (err) {
      handleApiError(err);
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
