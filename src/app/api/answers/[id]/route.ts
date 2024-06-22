import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import { NextRequest } from "next/server";
import AnswerModel from "@/models/Answer";
import QuestionModel from "@/models/Question";
import { ObjectId, isValidObjectId } from "mongoose";

type Params = { params: { id: string } };

type Answer = { _id: ObjectId; question: ObjectId };

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

    if (!isValidObjectId(params.id)) {
      return Response.json(
        {
          message: "NotFound answer !!",
        },
        { status: 404 }
      );
    }

    const answer: null | Answer = await AnswerModel.findOne(
      {
        _id: params.id,
      },
      "_id question"
    );

    if (!answer) {
      return Response.json(
        {
          message: "NotFound answer !!",
        },
        { status: 404 }
      );
    }

    await QuestionModel.findByIdAndUpdate(answer.question, {
      $inc: {
        answersCount: -1,
      },
    });

    await AnswerModel.findByIdAndDelete(answer._id);

    return Response.json({ message: "Remove answer is successfully !!" });
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
