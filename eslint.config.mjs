import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Cho phép dùng `any`
      "@typescript-eslint/no-unused-vars": "off", // Bỏ lỗi biến không sử dụng
      "@typescript-eslint/explicit-module-boundary-types": "off", // Không bắt buộc kiểu trả về
      "@typescript-eslint/strict-boolean-expressions": "off", // Không ép kiểu boolean chặt chẽ
      "no-var": "off" // Tắt rule `no-var`
    },
  },
];

export default eslintConfig;
