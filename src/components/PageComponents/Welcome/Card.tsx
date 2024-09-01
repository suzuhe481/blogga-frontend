type CardTypes = {
  cardData: string;
  index: number;
};

const Card = ({ cardData, index }: CardTypes) => {
  var containerClasses = "relative flex h-full justify-center ";
  var cardClasses =
    "flex text-center hover:[animation-play-state:paused] m-2 justify-center items-center border-2 border-black size-48 shadow-sky-400 shadow-md desktop:size-96 ";

  if (index % 2 === 0) {
    cardClasses += "animate-float-left ";
  } else {
    cardClasses += "animate-float-right ";
  }

  return (
    <div key={index} className={containerClasses}>
      <div className={cardClasses}>{cardData}</div>
    </div>
  );
};
export default Card;
