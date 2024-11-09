import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";
import verifyLinkUtil from "../../../helpers/verifyLinkUtil";

const Verify = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [verifiedError, setVerifiedError] = useState<boolean>(false);

  const { token } = useParams();

  const VerifiedSuccessMessage = (
    <div className="animate-fadeInSlideUp flex flex-col justify-center items-center mb-8 desktop:w-[50vw] w-[90vw] bg-sky-100 p-4 rounded-md border-[#75C1FF] shadow-[0_0_0_2px_#B3E0FF]">
      <h1 className="text-4xl font-bold">Your account is now verified.</h1>
    </div>
  );

  const VerifiedErrorMessage = (
    <div className="animate-fadeInSlideUp flex flex-col justify-center items-center text-center gap-2 mb-8 desktop:w-[50vw] w-[90vw] bg-red-100 p-4 rounded-md border-[#75C1FF] shadow-[0_0_0_2px_#B3E0FF]">
      <h1 className="text-4xl font-bold">
        Verification link has expired or is invalid.
      </h1>
      <a href="/verify" className="text-2xl font-bold">
        Click here to resend it.
      </a>
    </div>
  );

  // API call to validate verification link and verify user.
  useEffect(() => {
    verifyLinkUtil(token).then((result) => {
      if (result.error) {
        setIsVerified(false);
        setVerifiedError(true);
      } else {
        setIsVerified(true);
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden justify-between">
      <Navbar />
      <div className="flex flex-col justify-center items-center my-2">
        {isVerified ? VerifiedSuccessMessage : null}
        {verifiedError ? VerifiedErrorMessage : null}
      </div>
      <Footer />
    </div>
  );
};

export default Verify;
