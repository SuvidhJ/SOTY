"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import SecondaryButton from "@/app/components/SecondaryButton";
import axiosInstance from "@/axios";
import { toast } from "react-toastify";

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}



const Login = ({ setIsLoggedIn }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForceLogin, setShowForceLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleLogin = useCallback(async () => {
    if (isLoading) return;

    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const formData = { username, password };

    try {
      const response = await axiosInstance.post<LoginResponse>("auth/login", formData);

      if (response.data.refreshToken) {
        toast.success("Login Successful", { autoClose: 3000, theme: "dark" });

        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        setIsLoggedIn(true);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.message === "User already loggedIn other device.") {
        toast.error("Already logged in on another device!", { autoClose: 3000, theme: "dark" });
        setShowForceLogin(true);
      } else {
        toast.error(error.response?.data?.message || "Invalid Username or Password", { autoClose: 3000, theme: "dark" });
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, username, password, setIsLoggedIn]);

  const handleForceLogout = useCallback(async () => {
    try {
      await axiosInstance.post("auth/logout", { username });
      toast.success("Previous session logged out!", { autoClose: 3000, theme: "dark" });
      setShowForceLogin(false);
      await handleLogin();
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout previous session", { autoClose: 3000, theme: "dark" });
    }
  }, [username, handleLogin]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <Image src="/images/logo.png" alt="Scavenger Hunt" width={600} height={600} />
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <SecondaryButton onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Proceed"}
        </SecondaryButton>
      </div>
    </div>
  );
};

export default Login;
