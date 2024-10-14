import { useEffect, useState } from "react";

import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";
import Footer from "../Welcome/Footer";

const LoginPage = () => {
  const [onLogin, setOnLogin] = useState<boolean>(true);

  const [signinFormData, setSigninFormData] = useState({
    email: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    username: "",
  });

  const handleChangeSigninForm = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setSigninFormData({
      ...signinFormData,
      [name]: value,
    });
  };

  const handleChangeRegisterForm = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen">
      {/* <SignInForm /> */}
      {/* <RegisterForm /> */}
      <Footer />
    </div>
  );
};

export default LoginPage;
