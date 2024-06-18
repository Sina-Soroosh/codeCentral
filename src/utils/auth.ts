import bcrypt from "bcryptjs";

const hashPassword = (password: string): string => {
  const hashed: string = bcrypt.hashSync(password, 10);

  return hashed;
};

const compereHashedPassword = (password: string, hashed: string): boolean => {
  const isValid: boolean = bcrypt.compareSync(password, hashed);

  return isValid;
};

export { hashPassword, compereHashedPassword };
