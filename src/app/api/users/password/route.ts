import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import UserModel from "@/models/User";
import { compereHashedPassword, hashPassword } from "@/utils/auth";
import patterns from "@/utils/patterns";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";

type Body = {
  password: string;
  newPassword: string;
};

type User = {
  _id: ObjectId;
  password: string;
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

    if (!patterns.password.test(body.newPassword)) {
      return Response.json(
        { message: "Params is invalid !!" },
        {
          status: 422,
        }
      );
    }

    const user: null | User = await UserModel.findById(
      applicant.user._id,
      "password"
    ).lean();

    if (!user) {
      throw new Error(":|");
    }

    const isValidPassword: boolean = compereHashedPassword(
      body.password,
      user.password
    );

    if (!isValidPassword) {
      return Response.json(
        { message: "Password is invalid !!" },
        { status: 403 }
      );
    }

    const hashedPassword = hashPassword(body.newPassword);

    await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    return Response.json(
      { message: "Change Password is successfully !!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
