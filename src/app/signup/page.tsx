import { SignupForm } from "@/components/singup-form";

const Signup = () => {
  return (
    <main>
      <div className="min-h-screen flex-col  flex justify-center items-center">
        <h1 className="text-2xl">Đăng ký</h1>
        <SignupForm />
      </div>
    </main>
  );
};

export default Signup;
