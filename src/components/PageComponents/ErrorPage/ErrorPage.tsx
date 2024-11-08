import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";
import ErrorMessage from "./ErrorMessage";

const ErrorPage = () => {
  return (
    <div className="overflow-hidden min-h-screen flex flex-col justify-between">
      <Navbar />
      <ErrorMessage />
      <Footer />
    </div>
  );
};

export default ErrorPage;
