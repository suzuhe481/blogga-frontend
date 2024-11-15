import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

const Footer = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-4 desktop:pt-10 bg-sky-400 font-FuzzyBubbles">
      <div>
        <img
          src={LOGO_WHITE}
          className="h-20 desktop:h-24 object-contain aspect-auto"
        />
      </div>
      <div className="flex flex-row my-2 gap-8 desktop:text-xl">
        <a href="/terms-and-conditions">Terms and Conditions</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </div>
    </div>
  );
};

export default Footer;
