import React from "react";
import SecondaryButton from "./SecondaryButton";
import GlowBox from "./GlowBox";
interface Props {
  question: string;
  answer: string;
}
const FAQBox = ({ question, answer }: Props) => {
  return (
    <div className="w-full">
      <GlowBox>
        <div className="--content flex flex-col justify-center items-start">
          <div className="--faq-question text-lg md:text-2xl font-bold">
            Q. {question}
          </div>
          <div className="--faq-answer text-sm md:text-base mt-12 md:leading-relaxed tracking-wide ">
            Ans. {answer}
          </div>
        </div>
      </GlowBox>
    </div>
  );
};

export default FAQBox;
