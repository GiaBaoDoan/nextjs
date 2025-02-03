import { getDataFromToken } from "@/lib/token";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const data = await getDataFromToken(request);

    const me = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
      omit: {
        password: true,
      },
    });
    return NextResponse.json(
      { message: "Lấy dữ liệu thành công", data: me },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
