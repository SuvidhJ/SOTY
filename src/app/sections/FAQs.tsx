import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import { faqData } from "../data/faqData";
import FAQBox from "../components/FAQbox";
const FAQs = () => {
  return (
    <div className="w-full h-fit flex justify-center items-center py-12">
      <div className="--faq-container w-[80%] h-full flex flex-col justify-start items-center gap-12">
        <PrimaryButton>FAQs</PrimaryButton>
        {faqData.map((faq: any, i: number) => (
          <FAQBox question={faq.question} answer={faq.answer} key={i} />
        ))}
      </div>
    </div>
  );
};

export default FAQs;
