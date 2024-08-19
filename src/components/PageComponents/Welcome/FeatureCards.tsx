type FeaturesDataTypes = {
  featuresData: string[];
};

const FeatureCards = ({ featuresData }: FeaturesDataTypes) => {
  const featureCards = featuresData.map((cardData, index) => {
    var containerClasses = "";
    var cardClasses = "";

    if (index % 2 === 0) {
      cardClasses =
        "animate-float-left flex text-center justify-center items-center border-2 border-black size-48 ml-8 desktop:size-96 desktop:ml-48 shadow-sky-400 shadow-md";

      containerClasses = "relative flex h-full w-screen justify-start";
    } else {
      cardClasses =
        "animate-float-right flex text-center justify-center items-center border-2 border-black size-48 mr-8 desktop:size-96 desktop:mr-48 shadow-sky-400 shadow-md";

      containerClasses = "relative flex h-full w-screen justify-end";
    }

    return (
      <div key={index} className={containerClasses}>
        <div className={cardClasses}>{cardData}</div>
      </div>
    );
  });

  return (
    <div className="grid grid-flow-row my-12 gap-y-6 w-screen font-FuzzyBubbles">
      {featureCards}
    </div>
  );
};

export default FeatureCards;
