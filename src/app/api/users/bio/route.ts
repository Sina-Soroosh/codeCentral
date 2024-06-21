import { connectToDB } from "@/configs/db";
import UserModel from "@/models/User";
import getUser from "@/helpers/getUserServer";
import { NextRequest } from "next/server";

type Body = {
  bio: string;
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

    if (!body.bio || body.bio.length === 0 || body.bio.length > 210) {
      return Response.json(
        { message: "Params is invalid !!" },
        {
          status: 422,
        }
      );
    }

    await UserModel.findByIdAndUpdate(applicant.user._id, { bio: body.bio });

    return Response.json(
      { message: "Change Bio is successfully !!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
