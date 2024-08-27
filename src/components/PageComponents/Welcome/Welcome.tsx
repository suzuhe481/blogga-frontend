import Navbar from "../../UI/Navbar/Navbar";
import LOGO_WHITE from "../../../assets/images/LOGO_WHITE.png";

import Header from "./Header";
import FeatureCards from "./FeatureCards";
import Footer from "./Footer";

const Welcome = () => {
  const FeaturesData = [
    "This app has cool features.",
    "Here's some more features this app has.",
    "Third thing",
    "Another thing",
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
