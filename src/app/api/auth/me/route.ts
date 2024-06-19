import { connectToDB } from "@/configs/db";
import UserModel from "@/models/User";
import { User } from "@/types/Users.types";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest): Promise<Response> => {
  try {
    await connectToDB();

    const token = await req.cookies.get("user-token");

    if (!token) {
      return Response.json(
        { message: "Unauthorize user !!" },
        {
          status: 401,
        }
      );
    }

    const verifiedToken = verifyToken(token.value);

    if (!verifiedToken.isSuccessfully) {
      return Response.json(
        { message: "Unauthorize user !!" },
        {
          status: 401,
        }
      );
    }

    let user: User | null;

    if ((verifiedToken.payload as { username: string }).username) {
      user = await UserModel.findOne(
        {
          username: (verifiedToken.payload as { username: string }).username,
        },
        "username email role"
      );

      if (!user) {
        return Response.json(
          { message: "Unauthorize user !!" },
          {
            status: 401,
          }
        );
      }
    } else {
      return Response.json(
        { message: "Unauthorize user !!" },
        {
          status: 401,
        }
      );
    }

    return Response.json(user);
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
