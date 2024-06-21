import { connectToDB } from "@/configs/db";
import BanModel from "@/models/Ban";
import getUser from "@/helpers/getUserServer";
import UserModel from "@/models/User";
import { NextRequest } from "next/server";
import check from "@/validators/User";
import { hashPassword } from "@/utils/auth";

type Body = {
  username: string;
  password: string;
  email: string;
  role: "ADMIN" | "USER";
};

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    await connectToDB();

    const applicant = await getUser();

    if (!applicant.isLogin || !applicant.isAdmin) {
      return Response.json(
        { message: "You do not access to this data !!" },
        {
          status: 403,
        }
      );
    }

    const newUser: Body = await req.json();

    const isValidParams: boolean = check(newUser);

    if (!isValidParams) {
      return Response.json(
        { message: "Params is not valid !" },
        { status: 422 }
      );
    }

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

    const isBan = await BanModel.findOne({ email: newUser.email });

    if (isBan) {
      return Response.json(
        { message: "This email has been blocked. !!" },
        {
          status: 403,
        }
      );
    }

    const hashedPassword: string = hashPassword(newUser.password);

    newUser.password = hashedPassword;

    await UserModel.create(newUser);

    return Response.json(
      { message: "Create user is successfully !!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
