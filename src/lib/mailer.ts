import nodemailer from "nodemailer";

import { hash } from "@/lib/hash";
import prisma from "@/lib/prisma";
import { BASE_URL } from "@/lib/constants";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create hashed token
    const hashedToken = await hash(userId);
    // update verifyToken and verifyTokenExpiry
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(Date.now() + 30 * 60 * 1000), // expiry 30 minutes
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.SMTP_SERVER_HOST,
      port: 587,
      secure: true,
      auth: {
        user: process.env.SMTP_SERVER_USERNAME,
        pass: process.env.SMTP_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: "giabaod345@gmail.com",
      to: email,
      subject: "verify email",
      html: `Copy this url ${BASE_URL}/verify?token=${hashedToken}`,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    console.log(err);
  }
};
