import React from "react";
import SecondaryButton from "./SecondaryButton";
interface Props {
  question: string;
  answer: string;
}
const FAQBox = ({ question, answer }: Props) => {
  return (
    <div className="w-full">
      <div className="--riddle-container w-full h-fit rounded-3xl relative overflow-hidden px-12 py-20">
        <div className="--inner-shadow border-[12px] border-white w-full h-full  blur-lg absolute top-0 left-0"></div>
        <div className="--content flex flex-col justify-center items-start">
          <div className="--faq-question text-2xl font-bold">Q. {question}</div>
          <div className="--faq-answer mt-12 leading-relaxed tracking-wide ">
            Ans. {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQBox;
