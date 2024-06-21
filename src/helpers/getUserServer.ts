"use server";

import { connectToDB } from "@/configs/db";
import { User } from "@/types/Users.types";
import UserModel from "@/models/User";
import { generateToken, verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Auth } from "@/types/Auth.types";

const getMe = async (): Promise<false | User> => {
  try {
    await connectToDB();
    const token = await cookies().get("user-token");

    if (!token) {
      return false;
    }

    const verifiedToken = verifyToken(token.value);

    if (!verifiedToken.isSuccessfully) {
      return false;
    }

    let user: User | null;

    if ((verifiedToken.payload as { username: string }).username) {
      user = await UserModel.findOne(
        {
          username: (verifiedToken.payload as { username: string }).username,
        },
        "username email role"
      ).lean();

      if (!user) {
        return false;
      }
    } else {
      return false;
    }

    return user;
  } catch (error) {
    return false;
  }
};

const refreshMe = async (): Promise<false | (User & { token: string })> => {
  try {
    await connectToDB();
    const refreshToken = await cookies().get("user-refresh-token");

    if (!refreshToken) {
      return false;
    }

    try {
      jwt.verify(
        refreshToken.value,
        process.env.REFRESH_TOKEN_PRIVATE_KEY as string
      );
    } catch (error) {
      return false;
    }

    const user: User | null = await UserModel.findOne(
      { refreshToken: refreshToken.value },
      "username email role"
    ).lean();

    if (!user) {
      return false;
    }

    const token: string = generateToken({ username: user.username });

    return { ...user, token };
  } catch (error) {
    return false;
  }
};

const getUser = async (): Promise<Auth> => {
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
      token: refreshUser.token,
    };
  }

  return { isLogin: false };
};

export default getUser;
