import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import QuestionModel from "@/models/Question";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";

type Params = { params: { shortName: string } };

type Question = {
  _id: ObjectId;
  shortName: string;
};

export const DELETE = async (
  req: NextRequest,
  { params }: Params
): Promise<Response> => {
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

    const question: null | Question = await QuestionModel.findOne(
      {
        shortName: params.shortName,
      },
      "shortName"
    );

    if (!question) {
      return Response.json(
        {
          message: "NotFound question !!",
        },
        { status: 404 }
      );
    }

    await QuestionModel.findByIdAndDelete(question._id);

    return Response.json({ message: "Remove Question is successfully !!" });
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
