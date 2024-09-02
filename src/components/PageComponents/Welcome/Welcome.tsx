import Navbar from "../../UI/Navbar/Navbar";
import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

import Header from "./Header";
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
    <div>
      <Navbar />
      <Header />
      <FeatureCards featuresData={FeaturesData} />
      <Footer />
    </div>
  );
};

export default Welcome;
