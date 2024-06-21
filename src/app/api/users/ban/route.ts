import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import BanModel from "@/models/Ban";
import UserModel from "@/models/User";
import { User } from "@/types/Users.types";
import patterns from "@/utils/patterns";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";

type Body = {
  email: string;
};

type BanUser = {
  _id: ObjectId;
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

    await BanModel.create({ email: body.email });

    await UserModel.deleteOne({ _id: user._id });

    return Response.json(
      { message: "Ban user is successfully !!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest): Promise<Response> => {
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

    const banUser: null | BanUser = await BanModel.findOne({
      email: body.email,
    }).lean();

    if (!banUser) {
      return Response.json(
        { message: "Notfound ban !!" },
        {
          status: 404,
        }
      );
    }

    await BanModel.deleteOne({ _id: banUser._id });

    return Response.json({ message: "remove ban is successfully !!" });
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
