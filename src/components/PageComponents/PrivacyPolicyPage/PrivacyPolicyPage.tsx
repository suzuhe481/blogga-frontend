import { useLayoutEffect } from "react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import PrivacyPolicy from "./PrivacyPolicy";

const PrivacyPolicyPage = () => {
  useLayoutEffect(() => {
    document.title = "Privacy Policy | Blogga";
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
