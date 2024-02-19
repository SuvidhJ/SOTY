import React, { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import RiddleBox from "../components/RiddleBox";
import axios from "axios";
import Cookies from "js-cookie";
interface RiddleData {
  user_id: string;
  question: string;
  difficulty: string;
  answer: string;
  points: string;
  difficultyLevel: string;
  answered: string;
}
interface Props {
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  setMenu?: React.Dispatch<React.SetStateAction<string>>;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
}
const Riddles = ({ setQuestion, setPoints, setMenu, setDifficulty }: Props) => {
  const [riddleData, setRiddleData] = useState<RiddleData[]>([]);
  useEffect(() => {
    (async () => {
      const token = Cookies.get("jwtToken");
      const id = localStorage.getItem("teamId");
      try {
        const response = await axios.get(
          `https://mfc-hunt-soty-be.vercel.app/questions/all/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRiddleData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="w-full h-fit flex justify-center items-center py-12">
      <div className="--riddle-container w-[90%] md:w-[80%] h-full flex flex-col justify-start items-center gap-8 md:gap-12">
        <PrimaryButton>Riddles</PrimaryButton>
        {riddleData.map((riddle: any, i: number) => (
          <RiddleBox
            riddle={riddle.question}
            // redirect={riddle.redirect}
            difficulty={riddle.difficultyLevel}
            points={riddle.points}
            riddleId={riddle._id}
            key={i}
            setQuestion={setQuestion}
            setPoints={setPoints}
            setMenu={setMenu}
            setDifficulty={setDifficulty}
          />
        ))}
      </div>
    </div>
  );
};

export default Riddles;
