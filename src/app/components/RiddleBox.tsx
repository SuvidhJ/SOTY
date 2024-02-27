import React from "react";
import SecondaryButton from "./SecondaryButton";
import GlowBox from "./GlowBox";
import axios from "axios";
import Cookies from "js-cookie";
interface Props {
  riddle: string;
  redirect?: string;
  difficulty: string;
  points: number;
  riddleId: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;

  setMenu?: React.Dispatch<React.SetStateAction<string>>;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
}
const RiddleBox = ({
  riddle,
  redirect,
  points,
  difficulty,
  riddleId,
  setQuestion,
  setPoints,
  setMenu,
  setDifficulty,
}: Props) => {
  const submitRiddle = () => {
    setQuestion(riddle);
    setPoints(points);
    setDifficulty(difficulty);
    setMenu && setMenu("submission");
  };
  return (
    <div className="w-full">
      <GlowBox>
        <div className="--content flex flex-col gap-12 justify-center items-center">
          <div className="--riddle-description text-lg mt-12 leading-relaxed tracking-wide ">
            {riddle}
          </div>
          {/* <div className="w-full md:w-[60%] riddle-info flex flex-col md:flex-row justify-between text-center md:text-left">
            <p className="text-red-400 font-medium">
              Difficulty Level : {difficulty.toUpperCase()}
            </p>
            <p className="text-red-400 font-medium">Points : {points}</p>
          </div> */}
          <SecondaryButton onClickHandler={submitRiddle}>
            Proceed
          </SecondaryButton>
        </div>
      </GlowBox>
    </div>
  );
};

export default RiddleBox;
