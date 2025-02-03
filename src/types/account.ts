import { UserResType } from "@/types/user";

export type Account = {
  id: string; // ObjectId dưới dạng string
  userId: string; // ID của user (liên kết với User model)
  type: string; // Loại tài khoản (ví dụ: 'oauth', 'email', v.v.)
  provider: string; // Nhà cung cấp (ví dụ: 'google', 'facebook', v.v.)
  providerAccountId: string; // ID tài khoản từ nhà cung cấp
  refresh_token?: string | null; // Refresh token (nếu có)
  access_token?: string | null; // Access token (nếu có)
  expires_at?: number | null; // Thời gian hết hạn của token (nếu có)
  token_type?: string | null; // Loại token (nếu có)
  scope?: string | null; // Quyền truy cập (nếu có)
  id_token?: string | null; // ID token (nếu có)
  session_state?: string | null; // Trạng thái phiên (nếu có)
  createdAt: Date; // Ngày tạo
  updatedAt: Date; // Ngày cập nhật
  user: UserResType; // Thông tin user liên kết với tài khoản này
};
