import { useLayoutEffect } from "react";

import Navbar from "../../UI/Navbar/Navbar";

import Header from "./Header";
import FeatureCards from "./FeatureCards";
import Footer from "../../UI/Footer/Footer";

const Welcome = () => {
  useLayoutEffect(() => {
    document.title = "Home | Blogga";
  }, []);

  return (
    <div className="overflow-hidden min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-between min-h-screen gap-4">
        <Header />
        <FeatureCards />
        <Footer />
      </div>
    </div>
  );
};

export default Welcome;
