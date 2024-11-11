type CardTypes = {
  cardData: string;
  index: number;
};

const Card = ({ cardData, index }: CardTypes) => {
  const bgColors = [
    "bg-sky-400",
    "bg-sky-500",
    "bg-sky-600",
    "bg-sky-700",
    "bg-sky-800",
    "bg-sky-900",
  ];

  // Base container classes
  var containerClasses =
    "flex flex-col justify-center items-center text-white w-screen p-2 py-8 text-3xl leading-8 desktop:text-[3rem] desktop:leading-[4rem] min-h-[20rem] desktop:min-h-[40rem] ";

  var cardClasses = "w-[90vw] desktop:w-[60vw] bg-sky";

  // Depending on index,
  // Adds item direction, clip path, and text align direction
  if (index % 2 === 0) {
    containerClasses +=
      "items-end clip-trapezoid-right desktop:clip-trapezoid-right-large text-right ";
  } else {
    containerClasses +=
      "items-start clip-trapezoid-left desktop:clip-trapezoid-left-large text-left ";
  }

  // Adds a darker background color as the index gets higher
  containerClasses += bgColors[index];

  return (
    <div className={containerClasses}>
      <div className={cardClasses}>{cardData}</div>
    </div>
  );
};
export default Card;
