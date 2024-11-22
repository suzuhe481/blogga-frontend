import { useLayoutEffect } from "react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import SendVerify from "./SendVerify";

const SendVerifyPage = () => {
  useLayoutEffect(() => {
    document.title = "Send Verify | Blogga";
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden justify-between">
      <Navbar />
      <SendVerify />
      <Footer />
    </div>
  );
};

export default SendVerifyPage;
