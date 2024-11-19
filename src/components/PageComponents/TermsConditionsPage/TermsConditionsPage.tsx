import { useLayoutEffect } from "react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import TermsConditions from "./TermsConditions";

const TermsConditionsPage = () => {
  useLayoutEffect(() => {
    document.title = "Terms and Conditions | Blogga";
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <TermsConditions />
      <Footer />
    </div>
  );
};

export default TermsConditionsPage;
