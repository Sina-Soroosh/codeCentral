import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/User";
import { User } from "@/types/Users.types";
import { generateToken } from "@/utils/auth";
import { serialize } from "cookie";

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const refreshToken = await req.cookies.get("user-refresh-token");

    if (!refreshToken) {
      return Response.json(
        { message: "Unauthorize user !!" },
        {
          status: 401,
        }
      );
    }

    try {
      jwt.verify(
        refreshToken.value,
        process.env.REFRESH_TOKEN_PRIVATE_KEY as string
      );
    } catch (error) {
      return Response.json(
        { message: "Unauthorize user !!" },
        {
          status: 401,
        }
      );
    }

    const user: User | null = await UserModel.findOne(
      { refreshToken: refreshToken.value },
      "username"
    );

    if (!user) {
      return Response.json(
        { message: "Unauthorize user !!" },
        {
          status: 401,
        }
      );
    }

    const token: string = generateToken({ username: user.username });

    const cookieToken: string = await serialize("user-token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 600,
    });

    const headers: Headers = new Headers();

    headers.append("Set-Cookie", cookieToken);

    return Response.json({ message: "Refresh is successfully" }, { headers });
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      {
        status: 500,
      }
    );
  }
};
