import Logout from "@/components/logout";
import Profile from "@/components/profile";

const page = () => {
  return (
    <div className="flex flex-col space-y-5 justify-center items-center min-h-screen">
      <h1>Profile</h1>
      <Profile />
      <Logout />
    </div>
  );
};

export default page;
