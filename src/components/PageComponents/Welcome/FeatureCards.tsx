import Card from "./Card";

type FeaturesDataTypes = {
  featuresData: string[];
};

const FeatureCards = ({ featuresData }: FeaturesDataTypes) => {
  const featureCards = featuresData.map((cardData, index) => {
    return <Card cardData={cardData} key={index} index={index} />;
  });

  return (
    <div className="grid grid-flow-row my-12 gap-y-6 font-FuzzyBubbles font-bold text-xl desktop:text-4xl">
      {featureCards}
    </div>
  );
};

export default FeatureCards;
