import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import UserModel from "@/models/User";
import { User } from "@/types/Users.types";
import patterns from "@/utils/patterns";
import { NextRequest } from "next/server";

type Body = {
  email: string;
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

    const body: Body = await req.json();

    if (!patterns.email.test(body.email)) {
      return Response.json(
        { message: "Params is invalid !!" },
        {
          status: 403,
        }
      );
    }

    const user: null | User = await UserModel.findOne({
      email: body.email,
      $nor: [{ _id: applicant.user._id }],
    }).lean();

    if (!user) {
      return Response.json(
        { message: "Notfound user !!" },
        {
          status: 404,
        }
      );
    }

    await UserModel.findByIdAndUpdate(user._id, {
      role: user.role === "ADMIN" ? "USER" : "ADMIN",
    });

    return Response.json(
      { message: "Change role user is successfully !!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
