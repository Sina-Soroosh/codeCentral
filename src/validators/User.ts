import patterns from "@/utils/patterns";

type User = {
  username: string;
  password: string;
  email: string;
  role: "ADMIN" | "USER";
};

const check = (user: User): boolean => {
  if (!user.username || user.username.length < 3) return false;

  const isValidPassword: boolean = patterns.password.test(user.password);

  if (!isValidPassword) return false;

  const isValidEmail: boolean = patterns.email.test(user.email);

  if (!isValidEmail) return false;

  if (user.role !== "ADMIN" && user.role !== "USER") return false;

  return true;
};

export default check;
