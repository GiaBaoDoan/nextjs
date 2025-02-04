import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Dùng biến toàn cục để tránh tạo nhiều instance của Prisma
const prisma = global.prisma ?? new PrismaClient();

// Nếu đang ở môi trường phát triển, lưu Prisma client vào `global` để tránh tạo nhiều kết nối
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export { prisma };
