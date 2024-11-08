import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";
import TermsConditions from "./TermsConditions";

const TermsConditionsPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <TermsConditions />
      <Footer />
    </div>
  );
};

export default TermsConditionsPage;
