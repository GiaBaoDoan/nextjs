"use client";

import AuthServices from "@/services/auth";
import { handleApiError } from "@/lib/utils";
import { UserResType } from "@/types/user";
import { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState<UserResType>();

  const getProfile = async () => {
    try {
      const res = await AuthServices.me();
      setProfile(res.payload.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <p>Username : {profile?.username}</p>
      <p>Email : {profile?.email}</p>
      <p>Verify email : {profile?.isVerfied ? "rồi" : "chưa"}</p>
      <p>Admin : {profile?.isAdmin ? "Admin" : "User"}</p>
    </div>
  );
};

export default Profile;
