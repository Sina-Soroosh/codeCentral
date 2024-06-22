import { connectToDB } from "@/configs/db";
import getUser from "@/helpers/getUserServer";
import TagModel from "@/models/Tag";
import { NextRequest } from "next/server";

type Body = {
  title: string;
  shortName: string;
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

    const isExist: null | Object = await TagModel.findOne({
      shortName: body.shortName,
    });

    if (isExist) {
      return Response.json(
        {
          message: "There is already a tag with this short name !!",
        },
        { status: 409 }
      );
    }

    await TagModel.create(body);

    return Response.json(
      { message: "Create Tag is successfully !!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      { status: 500 }
    );
  }
};
