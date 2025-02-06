import { LoginTypeForm } from "@/components/login-form";
import { SignUpFormType } from "@/components/singup-form";
import { apiRequest } from "@/services/api";
import { UserResType } from "@/types/user";

const AuthServices = {
  singup: async (body: SignUpFormType) =>
    apiRequest<UserResType>("POST", "auth/signup", body),
  login: async (body: LoginTypeForm) =>
    apiRequest<UserResType>("POST", "auth/login", body),
  logout: async () => apiRequest("GET", "auth/logout"),
  me: async () => apiRequest<UserResType>("GET", "auth/me"),
  verify: async (body: { token: string }) =>
    apiRequest("POST", "auth/verify", body),
};

export default AuthServices;
