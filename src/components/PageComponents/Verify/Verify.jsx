import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../UI/Navbar/Navbar";
import verifyLinkUtil from "../../../helpers/verifyLinkUtil";

const Verify = () => {
  const [isVerified, setIsVerified] = useState(null);
  const { token } = useParams();

  const verifyLoading = <p>Checking validation...</p>;

  const verifyInvalid = <p>Verification link has expired or is invalid</p>;

  const verifyValid = <p>You are now verified</p>;

  // API call to validate verification link and verify user.
  useEffect(() => {
    verifyLinkUtil(token).then((result) => {
      if (result.error) {
        setIsVerified(false);
      } else {
        setIsVerified(true);
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <p>Here is the verify page</p>
        {isVerified === null
          ? verifyLoading
          : isVerified === false
          ? verifyInvalid
          : verifyValid}
      </div>
      ;
    </>
  );
};

export default Verify;
