import { ProfileForm } from "@/components/profile-form";

const Login = () => {
  return (
    <main>
      <div className="min-h-screen flex-col  flex justify-center items-center">
        <h1 className="text-2xl">Đăng nhập</h1>
        <ProfileForm />
      </div>
    </main>
  );
};

export default Login;
