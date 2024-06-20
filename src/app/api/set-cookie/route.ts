import { serialize } from "cookie";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const { token } = await req.json();

    if (!token) {
      return Response.json(
        { message: "Params not valid" },
        {
          status: 422,
        }
      );
    }

    const cookieToken: string = await serialize("user-token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 600,
    });

    const headers: Headers = new Headers();

    headers.append("Set-Cookie", cookieToken);

    return Response.json(
      { message: "set cookie is successfully" },
      { headers }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      {
        status: 500,
      }
    );
  }
};
