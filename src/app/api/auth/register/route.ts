import { connectToDB } from "@/configs/db";
import BanModel from "@/models/Ban";
import UserModel from "@/models/User";
import {
  generateRefreshToken,
  generateToken,
  hashPassword,
} from "@/utils/auth";
import check from "@/validators/User";
import { serialize } from "cookie";

type Parameters = {
  username: string;
  password: string;
  email: string;
};

export const POST = async (req: Request): Promise<Response> => {
  try {
    await connectToDB();

    const body: Parameters = await req.json();
    const users: Object[] = await UserModel.find({});
    const newUser: Parameters & { role: "ADMIN" | "USER" } = {
      ...body,
      role: "USER",
    };

    if (users.length === 0) {
      newUser.role = "ADMIN";
    } else {
      const isExist = await UserModel.findOne({
        $or: [{ email: newUser.email }, { username: newUser.username }],
      });

      if (isExist) {
        return Response.json(
          {
            message: "There is already a user with this username or email !!",
          },
          { status: 409 }
        );
      }
    }

    const isValidParams: boolean = check(newUser);

    if (!isValidParams) {
      return Response.json(
        { message: "Params is not valid !" },
        { status: 422 }
      );
    }

    const isBan = await BanModel.findOne({ email: newUser.email });

    if (isBan) {
      return Response.json(
        { message: "This email has been blocked. !!" },
        {
          status: 403,
        }
      );
    }

    const token: string = generateToken({ username: newUser.username });
    const refreshToken: string = generateRefreshToken({
      username: newUser.username,
    });

    const hashedPassword: string = hashPassword(newUser.password);

    newUser.password = hashedPassword;

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

    await UserModel.create({ ...newUser, refreshToken });

    return Response.json(
      { message: "Register is successfully" },
      {
        status: 201,
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
