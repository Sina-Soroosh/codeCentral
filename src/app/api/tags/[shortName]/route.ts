import { connectToDB } from "@/configs/db";
import TagModel from "@/models/Tag";
import getUser from "@/helpers/getUserServer";
import { NextRequest } from "next/server";
import { ObjectId } from "mongoose";

type Params = { params: { shortName: string } };

type Body = {
  title: string;
  shortName: string;
};

type Tag = {
  _id: ObjectId;
  title: string;
  shortName: string;
};

export const PUT = async (
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

    const body: Body = await req.json();

    if (!body.title || body.title.length < 3) {
      return Response.json(
        { message: "Params is not valid !" },
        { status: 422 }
      );
    }

    if (!body.shortName || body.shortName.length < 3) {
      return Response.json(
        { message: "Params is not valid !" },
        { status: 422 }
      );
    }

    const tag: null | Tag = await TagModel.findOne({
      shortName: params.shortName,
    });

    if (!tag) {
      return Response.json(
        {
          message: "NotFound tag !!",
        },
        { status: 404 }
      );
    }

    const isExist: null | Object = await TagModel.findOne({
      shortName: body.shortName,
      $nor: [{ _id: tag._id }],
    });

    if (isExist) {
      return Response.json(
        {
          message: "There is already a tag with this short name !!",
        },
        { status: 409 }
      );
    }

    await TagModel.findByIdAndUpdate(tag._id, {
      title: body.title,
      shortName: body.shortName,
    });

    return Response.json(
      { message: "Update Tag is successfully !!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
