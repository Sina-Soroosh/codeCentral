import { User } from "@/types/Users.types";

type IsLogin = {
  isLogin: true;
  isAdmin: boolean;
  user: User;
  token?: string;
};

type IsUnauthorize = {
  isLogin: false;
};

type GetUserReturn = IsLogin | IsUnauthorize;

const getMe = async (): Promise<false | User> => {
  const res = await fetch("/api/auth/me");

  if (res.status !== 200) {
    return false;
  }

  const user: User = await res.json();

  return user;
};

const refreshMe = async (): Promise<false | User> => {
  const res = await fetch("/api/auth/refresh", { method: "POST" });

  if (res.status !== 200) {
    return false;
  }

  return await getMe();
};

const getUser = async (): Promise<GetUserReturn> => {
  const user = await getMe();

  if (user !== false) {
    return { isLogin: true, isAdmin: user.role === "ADMIN", user };
  }

  const refreshUser = await refreshMe();

  if (refreshUser !== false) {
    return {
      isLogin: true,
      isAdmin: refreshUser.role === "ADMIN",
      user: refreshUser,
    };
  }

  return { isLogin: false };
};

export default getUser;
