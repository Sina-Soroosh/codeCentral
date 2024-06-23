import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import QuestionModel from "@/models/Question";
import TagModel from "@/models/Tag";
import check from "@/validators/Question";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";

type Body = {
  title: string;
  body: string;
  tags: string[];
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

    const isValidParams = await check(body);

    if (!isValidParams) {
      return Response.json(
        { message: "Params is not valid !" },
        { status: 422 }
      );
    }

    const uniqueTags: string[] = Array.from(new Set([...body.tags]).values());
    const filterTags: { shortName: string }[] = uniqueTags.map((tag) => ({
      shortName: tag,
    }));

    const mainTags: { _id: ObjectId }[] = await TagModel.find(
      { $or: filterTags },
      "_id"
    ).lean();

    if (filterTags.length !== mainTags.length) {
      return Response.json(
        { message: "Params is not valid !" },
        { status: 422 }
      );
    }

    const tags: ObjectId[] = mainTags.map((tag) => tag._id);
    const now = new Date().getTime();
    const shortName = now.toString();

    await QuestionModel.create({
      title: body.title,
      body: body.body,
      user: applicant.user._id,
      shortName,
      tags,
    });

    return Response.json(
      { message: "Create Question is successfully !!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
