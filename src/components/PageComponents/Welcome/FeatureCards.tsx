import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

import Card from "./Card";

const FeatureCards = () => {
  const FeaturesData: string[] = [
    "This is Blogga. A website where you can create blogs. Share your stories, ideas, articles, and more!",
    "Use a feature filled text editor to emphasize your words, your way.",
    "Making an account is completely FREE!",
  ];

  const featureCards = FeaturesData.map((cardData, index) => {
    return (
      <ScrollAnimation
        animateIn="fadeIn"
        animatePreScroll={true}
        animateOnce={true}
      >
        <Card cardData={cardData} key={index} index={index} />
      </ScrollAnimation>
    );
  });

  return (
    <div className="flex flex-col justify-center items-center w-screen my-8 font-semibold desktop:text-4xl">
      {featureCards}
    </div>
  );
};

export default FeatureCards;
