import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logout thanh cong",
      },
      {
        status: 200,
      }
    );

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Loi",
      },
      {
        status: 500,
      }
    );
  }
}
