import { saltRounds } from "@/lib/constants";
import bcrypt from "bcrypt";

export const hash = async (TypeString: string) => {
  const hashString = await bcrypt.hash(TypeString, saltRounds);
  return hashString;
};

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  const check = await bcrypt.compare(password, hashPassword);
  return check;
};
