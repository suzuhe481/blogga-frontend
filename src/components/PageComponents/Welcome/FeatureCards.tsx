type FeaturesDataTypes = {
  featuresData: string[];
};

const FeatureCards = ({ featuresData }: FeaturesDataTypes) => {
  const featureCards = featuresData.map((cardData, index) => {
    var containerClassNameText = "";
    var classNameText = "";

    if (index % 2 === 0) {
      classNameText =
        "animate-float-left flex text-center justify-center items-center border-2 border-black size-48 ml-8 desktop:size-96 desktop:ml-48";

      containerClassNameText = "relative flex h-full w-screen justify-start";
    } else {
      classNameText =
        "animate-float-right flex text-center justify-center items-center border-2 border-black size-48 mr-8 desktop:size-96 desktop:mr-48";

      containerClassNameText = "relative flex h-full w-screen justify-end";
    }

    return (
      <div key={index} className={containerClassNameText}>
        <div className={classNameText}>{cardData}</div>
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
