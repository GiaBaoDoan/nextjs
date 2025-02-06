// app/api/users/route.ts

import { hash } from "@/lib/hash";
import { sendEmail } from "@/lib/mailer";
import prisma from "@/lib/prisma";
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

    const hashedPassword = await hash(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // send link to email and verify
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: newUser.id,
    });

    return NextResponse.json(
      {
        message: "Đăng ký thành công",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
