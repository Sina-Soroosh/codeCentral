import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import AnswerModel from "@/models/Answer";
import QuestionModel from "@/models/Question";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";

type Body = {
  question: string;
  body: string;
};

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    await connectToDB();

    const applicant = await getUser();

    if (!applicant.isLogin) {
      return Response.json(
        { message: "You do not access to this data !!" },
        {
          status: 403,
        }
      );
    }

    const body: Body = await req.json();

    if (!body.body || body.body.length < 20) {
      return Response.json(
        { message: "Params is not valid !" },
        { status: 422 }
      );
    }

    const question: null | { _id: ObjectId } = await QuestionModel.findOne(
      { shortName: body.question },
      "_id"
    );

    if (!question) {
      return Response.json(
        { message: "Notfound question !!" },
        { status: 404 }
      );
    }

    await AnswerModel.create({
      body: body.body,
      user: applicant.user._id,
      question: question._id,
    });

    await QuestionModel.findByIdAndUpdate(question._id, {
      $inc: {
        answersCount: 1,
      },
    });

    return Response.json(
      { message: "Submit Answer is successfully !!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
