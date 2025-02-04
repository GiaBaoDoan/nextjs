import { getDataFromToken } from "@/lib/token";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const data = await getDataFromToken(request);

    const me = await prisma.user.findUnique({
      where: {
        id: data,
      },
      omit: {
        password: true,
      },
    });
    return NextResponse.json(
      { message: "Lấy dữ liệu thành công", data: me },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "loi" }, { status: 500 });
  }
}
