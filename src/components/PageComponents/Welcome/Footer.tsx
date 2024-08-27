import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center py-4 desktop:pt-20 bg-sky-400 font-FuzzyBubbles">
      <a className="border-2 border-sky-200 rounded-full px-2 py-1 text-lg desktop:text-4xl desktop:4xl desktop:px-4 desktop:py-2 hover:bg-sky-600 text-white">
        <button>Join Today!</button>
      </a>
      <img
        src={LOGO_WHITE}
        className="h-20 desktop:h-24 object-contain aspect-auto"
      />
    </div>
  );
};

export default Footer;
