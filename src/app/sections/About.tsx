import React from "react";
import GlowBox from "../components/GlowBox";
const About = () => {
  return (
    <div className="w-[90%] md:w-[80%] mx-auto h-fit md:h-screen flex justify-center items-center">
      <GlowBox>
        <div className="--content">
          <div className="--heading-main text-white text-[1.9rem] md:text-6xl font-bold text-center text-nowrap">
            About The Event
          </div>
          <div className="--description mt-6 md:mt-12 text-sm md:text-base md:leading-relaxed tracking-wide text-justify">
            Embark on an exhilarating scavenger hunt filled with thrilling tasks
            and challenges! A handpicked list of objectives and riddles will
            propel your team into a race against time. Dive into side games to
            unlock exclusive powers that might tip the scales in your favor.
            Only the fastest, smartest, and most strategic team will emerge as
            the ultimate Scavenger of the Year!
            <br />
            <br />
            This event - being one of the flagship events of Mozilla Firefox
            Club, VIT Vellore, has been one of the most successful events
            organized during Riviera 2023.
            <br />
            <br />
            <b>Warning:</b> Engaging in unethical practices will result in
            decrement of points and time penalty will be awarded.
          </div>
        </div>
      </GlowBox>
    </div>
  );
};

export default About;
