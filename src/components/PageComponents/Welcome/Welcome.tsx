import Navbar from "../../UI/Navbar/Navbar";
import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

import FeatureCards from "./FeatureCards";
import Footer from "./Footer";

const Welcome = () => {
  const FeaturesData = [
    "A new blogging website!",
    "Share your stories, ideas, articles, and more!",
    "Rich text editor to emphasize your words, your way.",
    "Stay tuned. Blogga is coming soon!",
  ];

  return (
    <div className="overflow-hidden">
      <Navbar />

      <div className="flex flex-col shadow-xl justify-center gap-2 items-center h-48 bg-sky-400 text-2xl desktop:text-5xl text-white font-FuzzyBubbles font-bold desktop:h-96 desktop:gap-0">
        Welcome to
        <img
          src={LOGO_WHITE}
          className="h-20 object-contain aspect-auto desktop:h-60"
        />
        <a className="border-2 border-sky-200 rounded-full px-2 py-1 text-lg desktop:text-4xl desktop:4xl desktop:px-4 desktop:py-2 hover:bg-sky-600 text-white">
          <button>Browse</button>
        </a>
      </div>

      <FeatureCards featuresData={FeaturesData} />
      <Footer />
    </div>
  );
};

export default Welcome;
