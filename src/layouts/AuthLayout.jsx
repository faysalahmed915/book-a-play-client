// src/layout/AuthLayout.jsx
import { Outlet } from "react-router";
import Logo from "../components/Shared/Logo/Logo";
import ThemeToggle from "../components/ui/Theme/ThemeToggle";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between bg-base-100 p-4 shadow-md max-w-7xl mx-auto">
        <Logo></Logo>
        <ThemeToggle></ThemeToggle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-base-200 max-w-7xl mx-auto">
        {/* Left Side: Branding / Animation */}
        <div className="hidden md:flex items-center justify-center bg-base-200 p-8">
          <div className="space-y-4 text-center max-w-md">
            <img src="/src/assets/authBanner-bookaplay-2.png" alt="BookaPlay" className="w-full mx-auto" />
            <h1 className="text-3xl font-bold">Welcome to BookaPlay</h1>
            <p className="text-sm text-white/80">
              Join a club, book your play, and manage everything from one place!
            </p>

            {/* Optional: Lottie animation */}
            {/* <Lottie animationData={animation} loop={true} /> */}
          </div>
        </div>

        {/* Right Side: Auth Content */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
