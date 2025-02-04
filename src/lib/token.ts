import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "@/lib/constants";
export const hashToken = async (tokenData: any) => {
  const token = jwt.sign(tokenData, TOKEN_KEY, { expiresIn: "1d" });
  return token;
};

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodeToken: any = jwt.verify(token, TOKEN_KEY);
    return decodeToken.id;
  } catch (err) {
    console.log(err);
  }
};
