import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const hashToken = async (tokenData: any) => {
  try {
    const token = jwt.sign(tokenData, process.env.TOKEN_KEY, {
      expiresIn: "1d",
    });
    return token;
  } catch (err) {
    console.log(err);
  }
};

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodeToken: any = jwt.verify(token, process.env.TOKEN_KEY);
    return decodeToken.id;
  } catch (err) {
    console.log(err);
  }
};
