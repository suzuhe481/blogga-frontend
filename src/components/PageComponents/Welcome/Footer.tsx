import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

const Footer = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-4 desktop:pt-20 bg-sky-400 font-FuzzyBubbles">
      <img
        src={LOGO_WHITE}
        className="h-20 desktop:h-24 object-contain aspect-auto"
      />
    </div>
  );
};

export default Footer;
