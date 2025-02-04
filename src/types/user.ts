export type UserResType = {
  id: string; // ObjectId dưới dạng string
  username: string;
  email: string;
  isVerfied: boolean;
  isAdmin: boolean;
  image?: string | null; // image có thể là string hoặc null nếu không có
  createdAt: Date; // DateTime trong Prisma
  updatedAt: Date; // DateTime trong Prisma
};
