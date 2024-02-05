import React from "react";
import Image from "next/image";
const Hero = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Image
        src="/images/logo.png"
        alt="Scavenger Hunt"
        width={600}
        height={600}
        className="w-[40%]"
      />
      <Image
        src="/images/banner.png"
        alt="Scavenger Hunt"
        width={500}
        height={500}
        className="w-[25%] -mt-12"
      />
    </div>
  );
};

export default Hero;
