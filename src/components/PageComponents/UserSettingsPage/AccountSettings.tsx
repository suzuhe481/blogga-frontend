import { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamation,
  faCheck,
  faX,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

import ExpandingHeightContainer from "../../UI/ExpandingHeightContainer/ExpandingHeightContainer";
import Modal from "../../UI/Modal/Modal";
import NotificationModal from "../../UI/NotificationModal/NotificationModal";

import { isValidEmail, isPasswordsEqual } from "../../../helpers/formUtil";
import { isEmailAvailable } from "../../../helpers/registerUtil";
import {
  updateEmailUtil,
  updatePasswordUtil,
  deleteUserProfileUtil,
} from "../../../helpers/userSettingsUtil";

export interface IProps {
  setPageLoading: any;
}

const AccountSettings = ({ setPageLoading }: IProps) => {
  // Change Email form
  // Stores input states
  const [email, setEmail] = useState<string>("");
  const [emailPassword, setEmailPassword] = useState<string>("");

  // Change Email form
  // Determines email validity.
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [emailAvailable, setEmailAvailable] = useState<
    boolean | null | undefined
  >(undefined);

  // States to manage when certain option forms are open.
  const [emailFormOpen, setEmailFormOpen] = useState<boolean>(false);
  const [passwordFormOpen, setPasswordFormOpen] = useState<boolean>(false);

  // Change Password form
  // Stores input states
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Change Password form
  // Determines password validity
  const [newPasswordValid, setNewPasswordValid] = useState<boolean | null>(
    null
  );
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | undefined>(
    true
  );

  // States to handle open modals.
  const [changeEmailModalOpen, setChangeEmailModalOpen] =
    useState<boolean>(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] =
    useState<boolean>(false);
  const [deleteProfileModalOpen, setDeleteProfileModalOpen] =
    useState<boolean>(false);
  const [settingsSavedModalOpen, setSettingsSavedModalOpen] =
    useState<boolean>(false);

  // States to store errors for each form.
  const [emailFormErrors, setEmailFormErrors] = useState<Array<string>>([]);
  const [passwordFormErrors, setPasswordFormErrors] = useState<Array<string>>(
    []
  );

  // Text for Change Email modal.
  const ChangeEmailTitle = "Change Email";
  const ChangeEmailDescription = "Do you want to change your email?";

  // Text for Change Password modal.
  const ChangePasswordTitle = "Change Password";
  const ChangePasswordDescription = "Do you want to change your password?";

  // Text for the Delete Profile modal.
  const DeleteProfileTitle = "Delete Profile";
  const DeleteProfileDescription =
    "Are you sure you want to delete your profile? This will also delete all of your blogs.";

  // Icons used in email input
  const FontAwesomeCheck = (
    <FontAwesomeIcon
      icon={faCheck}
      className="flex text-green-500 justify-center items-center border-2 p-1 rounded-full w-4 h-4 border-green-500"
    />
  );
  const FontAwesomeX = (
    <FontAwesomeIcon
      icon={faX}
      className="flex text-red-500 justify-center items-center border-2 p-1 rounded-full w-4 h-4 border-red-500"
    />
  );

  // Email input
  // Loading animation circle that goes inside inputs when checking server response.
  const EmailInputLoadingCircle = (
    <div className="absolute flex justify-center items-center right-2 top-1/2 transform -translate-y-1/2">
      {emailAvailable === null ? (
        <l-tailspin
          size="25"
          stroke="5"
          speed="0.8"
          color="rgb(59, 189, 248)"
        />
      ) : emailAvailable === undefined ? null : emailAvailable &&
        isEmailValid ? (
        FontAwesomeCheck
      ) : (
        FontAwesomeX
      )}
    </div>
  );

  // Change Email form
  // Updates email state
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    setEmail(value);
  };

  // Change Email form
  // Updates emailPassword state
  const handleChangeEmailPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target as HTMLInputElement;

    setEmailPassword(value);
  };

  // Change Password form
  // Updates the oldPassword state
  const handleChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    setOldPassword(value);
  };

  // Change Password form
  // Updates the newPassword state
  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    setNewPassword(value);
  };

  // Change Password form
  // Updates the confirmPassword state.
  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target as HTMLInputElement;

    setConfirmPassword(value);
  };

  // Handles toggling opening and closing forms.
  const toggleOpenEmail = () => {
    setEmailFormOpen((prev) => !prev);
  };
  const toggleOpenPassword = () => {
    setPasswordFormOpen((prev) => !prev);
  };

  // Closes the change email modal
  const changeEmailCancelHandler = () => {
    setChangeEmailModalOpen(false);
  };

  // Opens the change email modal if form is valid.
  const changeEmailSubmitHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const newErrors = [];
    if (!emailAvailable) {
      newErrors.push("Email is not available");
    }
    if (!isEmailValid) {
      newErrors.push("Email is not valid");
    }

    if (newErrors.length > 0) {
      setEmailFormErrors(newErrors);
      return;
    }

    setChangeEmailModalOpen(true);
  };

  // Closes the change password modal
  const changePasswordCancelHandler = () => {
    setChangePasswordModalOpen(false);
  };

  // Opens the change password modal if form is valid
  const changePasswordSubmitHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const newErrors = [];
    if (!newPasswordValid) {
      newErrors.push("Password is not in a valid format.");
    }

    if (newErrors.length > 0) {
      setPasswordFormErrors(newErrors);
      return;
    }

    if (!passwordsMatch) {
      return;
    }

    setChangePasswordModalOpen(true);
  };

  // Closes the delete profile confirmation modal.
  const deleteProfileCancelHandler = () => {
    setDeleteProfileModalOpen(false);
  };

  // Opens the delete profile confirmation modal.
  const deleteProfileSubmitHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setDeleteProfileModalOpen(true);
  };

  // Calls the API to change email.
  // Closes confirmation modal.
  // Display loading animation until api call is done.
  const changeEmailConfirmHandler = async () => {
    setChangeEmailModalOpen(false);

    setPageLoading(true);

    // API call to change email
    const result = await updateEmailUtil({ email, emailPassword });

    setPageLoading(false);

    // Could not change email.
    if (result.error) {
      const newErrors = [];
      newErrors.push(result.message);

      setEmailFormErrors(newErrors);
      return;
    }

    // Clears form and errors
    setEmail("");
    setEmailPassword("");
    setEmailFormErrors([]);

    // Open Notification Modal
    setSettingsSavedModalOpen(true);
  };

  // Calls the API to change password
  // Closes confirmation modal.
  // Display loading animation until api call is done.
  const changePasswordConfirmHandler = async () => {
    setChangePasswordModalOpen(false);

    setPageLoading(true);

    // API call to change password
    const result = await updatePasswordUtil({ oldPassword, newPassword });

    setPageLoading(false);

    // Could not change password
    if (result.error) {
      const newErrors = [];
      newErrors.push(result.message);
      setPasswordFormErrors(newErrors);

      return;
    }

    // Clears form and errors
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordFormErrors([]);

    // Open Notification Modal
    setSettingsSavedModalOpen(true);
  };

  // Calls API to delete user's profile.
  // Closes confirmation modal.
  // Display loading animation until api call is done.
  const deleteProfileConfirmHandler = async () => {
    setDeleteProfileModalOpen(false);
    setPageLoading(true);

    // API call to delete profile
    const result = await deleteUserProfileUtil();

    await setDeleteProfileModalOpen(false);

    setPageLoading(false);

    // Redirect to home page after profile deletion.
    window.location.href = "/";
  };

  // Handles checking if typed email is valid.
  useEffect(() => {
    // Ignores first page load.
    if (email.length === 0) {
      setEmailAvailable(undefined);
      return;
    }

    // Displays loading spinner.
    setEmailAvailable(null);

    const timeoutID = setTimeout(async () => {
      const result = await isEmailAvailable(email);
      if (result.emailAvailable) {
        setEmailAvailable(true);
      } else {
        setEmailAvailable(false);
      }
    }, 500);

    return () => clearTimeout(timeoutID);
  }, [email]);

  // Handles setting errors for email input.
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      // Hides "Email is not in a valid format" error when email field is empty.
      if (email.length === 0) {
        setIsEmailValid(true);
        return;
      }

      if (isValidEmail(email)) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false);
      }
    }, 500);

    return () => clearTimeout(timeoutID);
  }, [email]);

  // Handles setting errors for password input.
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      // Ignores first page load
      if (newPassword.length === 0 && newPasswordValid === null) {
        return;
      }

      if (newPassword.length >= 8) {
        setNewPasswordValid(true);
      } else {
        setNewPasswordValid(false);
      }
    }, 500);

    return () => clearTimeout(timeoutID);
  }, [newPassword]);

  // Handles setting errors for confirm password input.
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      // Hides "Passwords do not match" error when both password fields are empty.
      if (newPassword.length === 0 && confirmPassword.length === 0) {
        setPasswordsMatch(undefined);
        return;
      }

      // Ignore first page load
      if (newPassword.length === 0 || confirmPassword.length === 0) {
        return;
      }

      if (isPasswordsEqual(newPassword, confirmPassword)) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    }, 500);

    return () => clearTimeout(timeoutID);
  }, [newPassword, confirmPassword]);

  return (
    <div className="w-full">
      {changeEmailModalOpen ? (
        <Modal
          title={ChangeEmailTitle}
          description={ChangeEmailDescription}
          confirmAction={changeEmailConfirmHandler}
          cancelAction={changeEmailCancelHandler}
        />
      ) : null}
      {changePasswordModalOpen ? (
        <Modal
          title={ChangePasswordTitle}
          description={ChangePasswordDescription}
          confirmAction={changePasswordConfirmHandler}
          cancelAction={changePasswordCancelHandler}
        />
      ) : null}
      {deleteProfileModalOpen ? (
        <Modal
          title={DeleteProfileTitle}
          description={DeleteProfileDescription}
          confirmAction={deleteProfileConfirmHandler}
          cancelAction={deleteProfileCancelHandler}
        />
      ) : null}
      {settingsSavedModalOpen ? (
        <NotificationModal
          title="Settings Saved!"
          description="Your settings have been successfully saved!"
          cancelAction={() => setSettingsSavedModalOpen(false)}
        />
      ) : null}
      <div className="w-full text-4xl desktop:text-xl">
        <h1 className="font-bold text-4xl desktop:text-3xl border-b-2 border-black mb-2">
          Account Settings
        </h1>
        <div className="flex flex-col w-full mb-6 text-2xl p-2 border-2 border-slate-400 shadow-md rounded-md">
          <div
            onClick={toggleOpenEmail}
            className="flex flex-row justify-between cursor-pointer"
          >
            <p className="font-bold text-3xl">Change Email</p>
            <div className="flex justify-center items-center transition-all">
              <FontAwesomeIcon
                icon={faCaretUp}
                className="transition-all"
                rotation={emailFormOpen ? undefined : 180}
              />
            </div>
          </div>
          <ExpandingHeightContainer isOpen={emailFormOpen}>
            <form>
              <div className="flex flex-col w-full mb-6">
                <label htmlFor="email" className="mb-1">
                  New Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="email"
                    required
                    value={email}
                    onChange={handleChangeEmail}
                    className="rounded-md border-2 border-slate-400 py-3 px-4 w-full focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
                  />
                  {EmailInputLoadingCircle}
                </div>
                <div
                  className={`flex flex-col my-1 text-red-500 ${
                    isEmailValid ? "hidden" : ""
                  }`}
                >
                  <div className="flex flex-row items-center gap-2 font-bold">
                    <FontAwesomeIcon
                      icon={faExclamation}
                      className="border-2  p-1 rounded-full w-4 h-4 border-red-500"
                    />
                    <div>Email is not in a valid format.</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full mb-6">
                <label htmlFor="email" className="mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="email_password"
                    required
                    value={emailPassword}
                    onChange={handleChangeEmailPassword}
                    className="rounded-md border-2 border-slate-400 py-3 px-4 w-full focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full mb-6">
                <button
                  onClick={changeEmailSubmitHandler}
                  className="rounded-md bg-sky-400 hover:bg-sky-600 text-white font-bold py-3 px-4"
                >
                  Change Email
                </button>
              </div>
            </form>
            <div className="text-red-600 ml-3 font-bold mb-2">
              {emailFormErrors.map((error, index) => {
                return <li key={index}>{error}</li>;
              })}
            </div>
          </ExpandingHeightContainer>
        </div>

        <div className="flex flex-col w-full mb-6 text-2xl p-2 border-2 border-slate-400 shadow-md rounded-md">
          <div
            onClick={toggleOpenPassword}
            className="flex flex-row justify-between cursor-pointer"
          >
            <p className="font-bold text-3xl">Change Password</p>
            <div className="flex justify-center items-center transition-all">
              <FontAwesomeIcon
                icon={faCaretUp}
                className="transition-all"
                rotation={passwordFormOpen ? undefined : 180}
              />
            </div>
          </div>
          <ExpandingHeightContainer isOpen={passwordFormOpen}>
            <form>
              <div className="flex flex-col w-full mb-6">
                <label htmlFor="email" className="mb-1">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="old_password"
                    required
                    onChange={handleChangeOldPassword}
                    className="rounded-md border-2 border-slate-400 py-3 px-4 w-full focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full mb-6">
                <label htmlFor="password" className="mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleChangeNewPassword}
                  className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
                />

                <div className="flex flex-col text-slate-500">
                  <div>Your password must contain:</div>
                  <div
                    className={`flex flex-row items-center gap-2 font-bold ${
                      newPasswordValid === null
                        ? "text-slate-500"
                        : newPasswordValid
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faExclamation}
                      className={`border-2  p-1 rounded-full w-4 h-4 ${
                        newPasswordValid === null
                          ? "border-slate-500"
                          : newPasswordValid
                          ? "border-green-500"
                          : "border-red-500"
                      }`}
                    />
                    <div>8 characters</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full mb-6">
                <label htmlFor="confirm_password" className="mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  required
                  onChange={handleChangeConfirmPassword}
                  className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
                />

                <div
                  className={`flex flex-col my-1 text-red-500 ${
                    passwordsMatch || passwordsMatch === undefined
                      ? "hidden"
                      : ""
                  }`}
                >
                  <div className="flex flex-row items-center gap-2 font-bold">
                    <FontAwesomeIcon
                      icon={faExclamation}
                      className="border-2  p-1 rounded-full w-4 h-4 border-red-500"
                    />
                    <div>Passwords do not match.</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full mb-6">
                <button
                  onClick={changePasswordSubmitHandler}
                  className="rounded-md bg-sky-400 hover:bg-sky-600 text-white font-bold py-3 px-4"
                >
                  Change Password
                </button>
              </div>
            </form>
            <div className="text-red-600 ml-3 font-bold mb-2">
              {passwordFormErrors.map((error, index) => {
                return <li key={index}>{error}</li>;
              })}
            </div>
          </ExpandingHeightContainer>
        </div>
      </div>

      <form className="w-full text-4xl desktop:text-xl">
        <h1 className="font-bold text-3xl border-b-2 border-black">
          Delete Profile
        </h1>

        <div className="flex flex-col w-full mb-6 py-2">
          <button
            onClick={deleteProfileSubmitHandler}
            className="rounded-md bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-4"
          >
            Delete Your Profile?
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
