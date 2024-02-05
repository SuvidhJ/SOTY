import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import RiddleBox from "../components/RiddleBox";
import { riddleData } from "../data/riddleData";
const Riddles = () => {
  return (
    <div className="w-full h-fit flex justify-center items-center py-12">
      <div className="--riddle-container w-[80%] h-full flex flex-col justify-start items-center gap-12">
        <PrimaryButton>Riddles</PrimaryButton>
        {riddleData.map((question, i) => (
          <RiddleBox
            riddle={question.riddle}
            redirect={question.redirect}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Riddles;
