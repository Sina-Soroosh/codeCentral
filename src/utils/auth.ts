import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = (password: string): string => {
  const hashed: string = bcrypt.hashSync(password, 10);

  return hashed;
};

const compereHashedPassword = (password: string, hashed: string): boolean => {
  const isValid: boolean = bcrypt.compareSync(password, hashed);

  return isValid;
};

const generateToken = (payload: { username: string }): string => {
  const token: string = jwt.sign(
    payload,
    process.env.TOKEN_PRIVATE_KEY as string,
    { expiresIn: "10m" }
  );

  return token;
};

export { hashPassword, compereHashedPassword, generateToken };
