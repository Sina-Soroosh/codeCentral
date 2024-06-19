import { connectToDB } from "@/configs/db";
import UserModel from "@/models/User";
import { User } from "@/types/Users.types";
import {
  compereHashedPassword,
  generateRefreshToken,
  generateToken,
} from "@/utils/auth";
import { serialize } from "cookie";

type Parameters = {
  identifier: string;
  password: string;
};

export const POST = async (req: Request): Promise<Response> => {
  try {
    await connectToDB();

    const body: Parameters = await req.json();

    const user: (User & { password: string }) | null = await UserModel.findOne({
      $or: [{ email: body.identifier }, { username: body.identifier }],
    });

    if (!user) {
      return Response.json({ message: "Notfound user !!" }, { status: 404 });
    }

    const isValidPassword: boolean = compereHashedPassword(
      body.password,
      user.password
    );

    if (!isValidPassword) {
      return Response.json({ message: "Notfound user !!" }, { status: 404 });
    }

    const token: string = generateToken({ username: user.username });
    const refreshToken: string = generateRefreshToken({
      username: user.username,
    });

    const cookieToken: string = await serialize("user-token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 600,
    });

    const cookieRefreshToken: string = await serialize(
      "user-refresh-token",
      refreshToken,
      {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      }
    );

    const headers: Headers = new Headers();

    headers.append("Set-Cookie", cookieToken);
    headers.append("Set-Cookie", cookieRefreshToken);

    await UserModel.findByIdAndUpdate(user._id, { refreshToken });

    return Response.json(
      { message: "Login is successfully" },
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
