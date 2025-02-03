import { NextRequest } from "next/server";

const jwt = require("jsonwebtoken");

export const hashToken = async (tokenData: any) => {
  const token = await jwt.sign(tokenData, "key-token", { expiresIn: "1d" });
  return token;
};

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodeToken = jwt.verify(token, "key-token");
    return decodeToken;
  } catch (err) {
    console.log(err);
  }
};
