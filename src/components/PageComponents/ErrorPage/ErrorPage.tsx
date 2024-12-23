import { useLayoutEffect } from "react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import ErrorMessage from "./ErrorMessage";

const ErrorPage = () => {
  useLayoutEffect(() => {
    document.title = "Error | Blogga";
  }, []);

  return (
    <div className="overflow-hidden min-h-screen flex flex-col justify-between">
      <Navbar />
      <ErrorMessage />
      <Footer />
    </div>
  );
};

export default ErrorPage;
