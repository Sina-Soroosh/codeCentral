import bcrypt from "bcryptjs";

const hashPassword = (password: string): string => {
  const hashed: string = bcrypt.hashSync(password, 10);

  return hashed;
};

export { hashPassword };
