import { connectToDB } from "@/configs/db";
import UserModel from "@/models/User";
import BanModel from "@/models/Ban";
import getUser from "@/helpers/getUserServer";
import { NextRequest } from "next/server";
import patterns from "@/utils/patterns";
import { generateRefreshToken, generateToken } from "@/utils/auth";
import { serialize } from "cookie";

type Body = {
  username: string;
  email: string;
};

export const PUT = async (req: NextRequest): Promise<Response> => {
  try {
    await connectToDB();

    const applicant = await getUser();

    if (!applicant.isLogin) {
      return Response.json(
        { message: "Unauthorize !!" },
        {
          status: 401,
        }
      );
    }

    const body: Body = await req.json();

    if (!body.username || body.username.length < 3) {
      return Response.json(
        { message: "Params is invalid !!" },
        {
          status: 422,
        }
      );
    }

    if (!patterns.email.test(body.email)) {
      return Response.json(
        { message: "Params is invalid !!" },
        {
          status: 422,
        }
      );
    }

    const isExist = await UserModel.findOne({
      $or: [{ email: body.email }, { username: body.username }],
      $nor: [{ _id: applicant.user._id }],
    });

    if (isExist) {
      return Response.json(
        {
          message: "There is already a user with this username or email !!",
        },
        { status: 409 }
      );
    }

    const isBan = await BanModel.findOne({ email: body.email });

    if (isBan) {
      return Response.json(
        { message: "This email has been blocked. !!" },
        {
          status: 403,
        }
      );
    }

    const token: string = generateToken({ username: body.username });
    const refreshToken: string = generateRefreshToken({
      username: body.username,
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

    await UserModel.findByIdAndUpdate(applicant.user._id, {
      refreshToken,
      username: body.username,
      email: body.email,
    });

    return Response.json(
      { message: "Change Bio is successfully !!" },
      { status: 201, headers }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
