"use client";
import React, { useState } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Riddles from "../sections/Riddles";
import FAQs from "../sections/FAQs";
import Leaderboard from "../sections/Leaderboard";
import Submission from "../sections/Submission";
interface Props {
  selectedMenu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}
export default function Landing({ selectedMenu = "home", setMenu }: Props) {
  const [points, setPoints] = useState(0);
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState("");
  return (
    <>
      <Hero />

      {selectedMenu === "home" && (
        <>
          <About />
          <Riddles
            setQuestion={setQuestion}
            setPoints={setPoints}
            setMenu={setMenu}
            setDifficulty={setDifficulty}
          />
        </>
      )}
      {selectedMenu === "faq" && <FAQs />}
      {selectedMenu === "leaderboard" && <Leaderboard />}
      {selectedMenu === "submission" && (
        <Submission
          question={question}
          points={points}
          difficultyLevel={difficulty}
          setMenu={setMenu}
        />
      )}
    </>
  );
}
