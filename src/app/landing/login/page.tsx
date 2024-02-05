import React, { useState } from "react";
import Image from "next/image";
import SecondaryButton from "@/app/components/SecondaryButton";
interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login = ({ setIsLoggedIn }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <div className="--login-wrapper w-full h-screen flex items-center">
      <div className="w-full h-[80%] mt-20 bg-black flex flex-col gap-10 justify-center items-center">
        <Image
          src="/images/logo.png"
          alt="Scavenger Hunt"
          width={600}
          height={600}
          className="w-[30%]"
        />
        <div className="--login-container w-[80%] h-fit rounded-3xl relative overflow-hidden px-12 py-12">
          <div className="--inner-shadow border-[12px] border-white w-full h-full  blur-lg absolute top-0 left-0"></div>
          <div className="--content flex h-full flex-col gap-4 justify-center items-center relative z-[10]">
            <div className="--heading text-5xl font-semibold uppercase">
              enter your details
            </div>
            <div className="--sub-heading text-[#FF7B7B] text-2xl  font-medium">
              ( Contact MFC team for this )
            </div>
            <input
              type="text"
              name="username"
              id=""
              placeholder="Username"
              className="bg-[#FFE6D6] border-2 border-[#9E00FF] w-[40%] py-4 px-4 rounded-full text-2xl text-center font-semibold text-black outline-none focus:border-4"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              className="bg-[#FFE6D6] border-2 border-[#9E00FF] w-[40%] py-4 px-4 rounded-full text-2xl text-center font-semibold text-black outline-none focus:border-4"
              onChange={(e) => setPassword(e.target.value)}
            />
            <SecondaryButton onClickHandler={handleLogin}>
              Proceed
            </SecondaryButton>
          </div>
        </div>
        <div className="text-[#aaaaaa]">
          Note:- Only one Login allowed at same time.
        </div>
      </div>
    </div>
  );
};

export default Login;
