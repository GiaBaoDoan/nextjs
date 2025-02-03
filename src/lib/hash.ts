const bcrypt = require("bcrypt");
const saltRounds = 10;

export const hashPassword = async (password: string) => {
  const newPassword = await bcrypt.hash(password, saltRounds);
  return newPassword;
};

export const comparePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const check = await bcrypt.compare(oldPassword, newPassword);
  return check;
};
