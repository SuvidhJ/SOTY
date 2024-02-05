"use client";
import React, { useState } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Riddles from "../sections/Riddles";
import FAQs from "../sections/FAQs";
import Leaderboard from "../sections/Leaderboard";
interface Props {
  menu: string;
}
const Landing = ({ menu }: Props) => {
  return (
    <>
      <Hero />
      {menu === "home" && (
        <>
          <About />
          <Riddles />
        </>
      )}
      {menu === "faq" && <FAQs />}
      {menu === "leaderboard" && <Leaderboard />}
    </>
  );
};

export default Landing;
