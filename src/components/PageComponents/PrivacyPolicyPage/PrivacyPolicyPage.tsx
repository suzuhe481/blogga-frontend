import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";
import PrivacyPolicy from "./PrivacyPolicy";

const PrivacyPolicyPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
