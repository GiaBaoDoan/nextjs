// app/api/users/route.ts

import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        {
          message: "Dữ liệu không hợp lệ",
        },
        {
          status: 400,
        }
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          message: "Email này đã được sử dụng",
        },
        {
          status: 400,
        }
      );
    }

    const newPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: newPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Đăng ký thành công",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
