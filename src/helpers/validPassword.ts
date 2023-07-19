import bcrypt from "bcrypt";

export const isValidPassword = async (
  password: string,
  newPassword: string
) => {
  const isValid = await bcrypt.compare(password, newPassword);
  return isValid;
};
