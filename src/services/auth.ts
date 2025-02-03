import { FormType } from "@/components/singup-form";
import { apiRequest } from "@/services/api";
import { UserResType } from "@/types/user";

const AuthServices = {
  singup: async (values: FormType) =>
    apiRequest<UserResType>("POST", "auth/signup", values),
  login: async (values: any) =>
    apiRequest<UserResType>("POST", "auth/login", values),
  logout: async () => apiRequest("GET", "auth/logout"),
  me: async () => apiRequest<UserResType>("GET", "auth/me"),
};

export default AuthServices;
