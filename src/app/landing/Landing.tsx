"use client";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Riddles from "../sections/Riddles";
import FAQs from "../sections/FAQs";
import Leaderboard from "../sections/Leaderboard";
export default function Landing({
  selectedMenu = "home",
}: {
  selectedMenu: string;
}) {
  return (
    <>
      <Hero />
      {selectedMenu === "home" && (
        <>
          <About />
          <Riddles />
        </>
      )}
      {selectedMenu === "faq" && <FAQs />}
      {selectedMenu === "leaderboard" && <Leaderboard />}
    </>
  );
}
