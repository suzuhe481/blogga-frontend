type FeaturesDataTypes = {
  featuresData: string[];
};

const FeatureCards = ({ featuresData }: FeaturesDataTypes) => {
  const featureCards = featuresData.map((cardData, index) => {
    var classNameText = "";

    if (index % 2 === 0) {
      classNameText =
        "animate-float-left flex text-center justify-center items-center border-2 border-black size-48 mr-36 desktop:size-96 desktop:mr-[48rem]";
    } else {
      classNameText =
        "animate-float-right flex text-center justify-center items-center border-2 border-black size-48 ml-36 desktop:size-96 desktop:ml-[48rem]";
    }

    return (
      <div className="relative flex w-full h-full justify-center">
        <div className={classNameText}>{cardData}</div>
      </div>
    );
  });

  return (
    <div className="grid grid-flow-row my-12 mx-4 gap-y-6 font-FuzzyBubbles">
      {featureCards}
    </div>
  );
};

export default FeatureCards;
