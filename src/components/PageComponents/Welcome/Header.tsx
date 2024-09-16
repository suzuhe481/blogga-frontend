import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

const Header = () => {
  return (
    <div className="flex flex-col shadow-xl justify-center gap-2 items-center h-48 bg-sky-400 text-2xl desktop:text-5xl text-white font-FuzzyBubbles font-bold desktop:h-96 desktop:gap-0">
      <img
        src={LOGO_WHITE}
        className="h-20 object-contain aspect-auto desktop:h-60"
      />
    </div>
  );
};

export default Header;
