import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async (password: string) => {
  const newPassword = await bcrypt.hash(password, saltRounds);
  return newPassword;
};

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  const check = await bcrypt.compare(password, hashPassword);
  return check;
};
