import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import checkUserVerificationUtil from "../../../helpers/checkUserVerificationUtil";
import sendVerificationEmailUtil from "../../../helpers/sendVerificationEmailUtil";

const SendVerify = () => {
  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);
  const [userVerified, setUserVerified] = useState<boolean | null>(null);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  // Function to sent verification email.
  const sendEmailHandler = async () => {
    setEmailSent(false);

    const result = await sendVerificationEmailUtil();

    if (result.error) {
      setEmailError(true);
    }

    if (result.success) {
      setEmailSent(true);
      setEmailError(false);
    }
  };

  const SendVerificationEmailButton = (
    <button
      onClick={sendEmailHandler}
      className="flex flex-col justify-center items-center gap-2 mb-8 bg-sky-100 hover:bg-sky-300 w-[90vw] desktop:w-[50] p-4 rounded-md border-[#75C1FF] shadow-[0_0_0_2px_#B3E0FF]"
    >
      <h1 className="text-4xl font-bold">
        Click here to send an email for account verification.
      </h1>
      <div className="text-2xl">
        Reminder: You can't make blog posts until you're verified.
      </div>
    </button>
  );

  const EmailSentMessage = (
    <div className="animate-fadeInSlideUp flex flex-col justify-center items-center mb-8 desktop:w-[50vw] w-[90vw] bg-sky-100 p-4 rounded-md border-[#75C1FF] shadow-[0_0_0_2px_#B3E0FF]">
      <h1 className="text-4xl font-bold text-center">
        Verification email has been sent.
      </h1>
    </div>
  );

  const EmailErrorMessage = (
    <div className="animate-fadeInSlideUp flex flex-col justify-center items-center mb-8 desktop:w-[50vw] w-[90vw] bg-red-100 p-4 rounded-md border-[#75C1FF] shadow-[0_0_0_2px_#B3E0FF]">
      <h1 className="text-4xl font-bold">
        There was a problem sending the email. Please try again, or try at a
        later time.
      </h1>
    </div>
  );

  const AlreadyVerifiedMessage = (
    <div className="animate-fadeInSlideUp flex flex-col justify-center items-center mb-8 desktop:w-[50vw] w-[90vw] bg-sky-100 p-4 rounded-md border-[#75C1FF] shadow-[0_0_0_2px_#B3E0FF]">
      <h1 className="text-4xl font-bold">
        Thank you. Your account is already verified.
      </h1>
    </div>
  );

  // Gets the user's logged in and verified status.
  useEffect(() => {
    const getUserStatus = async () => {
      const result = await checkUserVerificationUtil();

      // Redirect to home is user is logged in
      if (result.userLoggedIn) {
        setUserLoggedIn(result.userLoggedIn);
      }

      if (result.userVerified) {
        setUserVerified(result.userVerified);
      }

      // Redirect to error page if user is not logged in.
      if (!result.userLoggedIn) {
        navigate("/whoops");
      }
    };

    getUserStatus();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center my-2">
      {userVerified ? AlreadyVerifiedMessage : SendVerificationEmailButton}
      {emailSent ? EmailSentMessage : null}
      {emailError ? EmailErrorMessage : null}
    </div>
  );
};

export default SendVerify;
