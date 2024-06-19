import { serialize } from "cookie";

export const POST = async (): Promise<Response> => {
  try {
    const cookieToken: string = await serialize("user-token", "", {
      httpOnly: true,
      path: "/",
      maxAge: -1,
    });

    const cookieRefreshToken: string = await serialize(
      "user-refresh-token",
      "",
      {
        httpOnly: true,
        path: "/",
        maxAge: -1,
      }
    );

    const headers = new Headers();

    headers.append("Set-Cookie", cookieToken);
    headers.append("Set-Cookie", cookieRefreshToken);

    return Response.json({ message: "Logout is successfully" }, { headers });
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error !!", error },
      {
        status: 500,
      }
    );
  }
};
