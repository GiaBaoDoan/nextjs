import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: `Xác thực không hợp lệ hoặc đã hết hạn` },
        { status: 403 }
      );
    }

    if (user.verifyTokenExpiry < new Date()) {
      return NextResponse.json(
        { message: `Xác thực không hợp lệ hoặc đã hết hạn` },
        { status: 403 }
      );
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verifyToken: "",
        verifyTokenExpiry: new Date(0),
        isVerfied: true,
      },
    });
    return NextResponse.json(
      { message: `Đã xác thực thành công` },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
