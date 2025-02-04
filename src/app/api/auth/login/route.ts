import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/hash";

import { hashToken } from "@/lib/token";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password, username } = await request.json();

    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Tên hoặc mật khẩu không đúng",
        },
        { status: 400 }
      );
    }

    const checkPassword = await comparePassword(password, user.password);

    if (!checkPassword) {
      return NextResponse.json(
        {
          message: "Tên hoặc mật khẩu không đúng",
        },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = await hashToken(tokenData);

    const response = NextResponse.json(
      {
        message: "Đăng nhập thành công",
      },
      {
        status: 200,
      }
    );
    response.cookies.set("token", token, { httpOnly: true, path: "/" });
    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Lỗi từ sever",
      },
      {
        status: 500,
      }
    );
  }
}
