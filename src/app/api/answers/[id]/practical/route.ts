import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import { NextRequest } from "next/server";
import AnswerModel from "@/models/Answer";
import { ObjectId, isValidObjectId } from "mongoose";

type Params = { params: { id: string } };

type Answer = {
  _id: ObjectId;
  question: { _id: ObjectId; user: ObjectId };
  user: ObjectId;
};

export const POST = async (
  req: NextRequest,
  { params }: Params
): Promise<Response> => {
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
      "_id question user"
    )
      .populate([{ path: "question", select: "_id user title" }])
      .lean();

    if (!answer) {
      return Response.json(
        {
          message: "NotFound answer !!",
        },
        { status: 404 }
      );
    }

    if (answer.question.user.toString() !== applicant.user._id.toString()) {
      return Response.json(
        { message: "You do not access to this data !!" },
        {
          status: 403,
        }
      );
    }

    await AnswerModel.updateMany(
      {
        question: answer.question._id,
        $nor: [{ _id: answer._id }],
      },
      {
        isPractical: false,
      }
    );

    await AnswerModel.findByIdAndUpdate(answer._id, { isPractical: true });

    return Response.json({
      message: "set answer as practical answer is successfully !!",
    });
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
