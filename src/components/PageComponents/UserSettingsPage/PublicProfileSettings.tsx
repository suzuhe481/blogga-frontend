import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCheck, faX } from "@fortawesome/free-solid-svg-icons";

import Modal from "../../UI/Modal/Modal";
import NotificationModal from "../../UI/NotificationModal/NotificationModal";
import ExpandingHeightContainer from "../../UI/ExpandingHeightContainer/ExpandingHeightContainer";

import {
  getUserSettingsUtil,
  updateUserSettingsUtil,
} from "../../../helpers/userSettingsUtil";

import { isUsernameAvailable } from "../../../helpers/registerUtil";

export interface IPreferences {
  display_real_name: string;
}

export interface ISettings {
  first_name: string;
  last_name: string;
  username: string;
}

export interface IProps {
  currentPage: any;
  setPageLoading: any;
}

const PublicProfileSettings = ({ currentPage, setPageLoading }: IProps) => {
  // Stores user preferences to prefill forms.
  const [preferencesData, setPreferencesData] = useState<IPreferences>({
    display_real_name: "",
  });

  // Stores user settings to prefill forms.
  const [settingsData, setSettingsData] = useState<ISettings>({
    first_name: "",
    last_name: "",
    username: "",
  });

  // Controls when a username is available.
  const [usernameAvailable, setUsernameAvailable] = useState<
    boolean | null | undefined
  >(undefined);

  // States for controlling open forms.
  const [displayNameFormOpen, setDisplayNameFormOpen] =
    useState<boolean>(false);
  const [realNameFormOpen, setRealNameFormOpen] = useState<boolean>(false);
  const [usernameFormOpen, setUsernameFormOpen] = useState<boolean>(false);

  // States for controlling modals
  const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
  const [settingsSavedModalOpen, setSettingsSavedModalOpen] =
    useState<boolean>(false);

  // Controls if a setting was changed.
  const [settingsChanged, setSettingsChanged] = useState<boolean>(false);

  // Stores errors from submitting the form.
  const [formErrors, setFormErrors] = useState<Array<string>>([]);

  // Stores the user's original username.
  const [originalUsername, setOriginalUsername] = useState<string>("");

  // Icons used in username input
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

  // Username input
  // Loading animation circle that goes inside inputs when checking server response.
  const UsernameInputLoadingCircle = (
    <div className="absolute flex justify-center items-center right-2 top-1/2 transform -translate-y-1/2">
      {usernameAvailable === null ? (
        <l-tailspin
          size="25"
          stroke="5"
          speed="0.8"
          color="rgb(59, 189, 248)"
        />
      ) : usernameAvailable === undefined ? null : usernameAvailable ? (
        FontAwesomeCheck
      ) : (
        FontAwesomeX
      )}
    </div>
  );

  // Handles toggling opening/closing forms.
  const toggleOpenDisplayName = () => {
    setDisplayNameFormOpen((prev) => !prev);
  };
  const toggleOpenRealName = () => {
    setRealNameFormOpen((prev) => !prev);
  };
  const toggleOpenUsername = () => {
    setUsernameFormOpen((prev) => !prev);
  };

  // Stores form's changes to settings in settings state.
  const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setPreferencesData({
      ...preferencesData,
      [name]: value,
    });
  };

  // Handles form changes for first name, last name, and username.
  const handleSettingsDataCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setSettingsData({
      ...settingsData,
      [name]: value,
    });
  };

  // Text for the Save Settings modal.
  const SaveSettingsTitle = "Save Settings";
  const SaveSettingsDescription =
    "Do you want to save your current profile settings?";

  // Opens the confirmation modal.
  const settingsSubmitHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const newErrors = [];
    if (!usernameAvailable && settingsData.username !== originalUsername) {
      newErrors.push("Username is not available.");
      setFormErrors(newErrors);
      return;
    }

    setSettingsModalOpen(true);
  };

  // Calls API to set changes to user's settings.
  // Closes confirmation modal.
  // Display loading animation until api call is done.
  const settingsConfirmHandler = async () => {
    // Clear form errors
    setFormErrors([]);

    if (preferencesData === null) {
      return;
    }

    setSettingsModalOpen(false);

    // If any inputs are empty (first, last, username), display errors
    const newErrors = [];
    if (settingsData.first_name === "") {
      newErrors.push("First name must be filled.");
    }
    if (settingsData.last_name === "") {
      newErrors.push("Last name must be filled.");
    }

    if (settingsData.username === "") {
      newErrors.push("Username must be filled.");
    }
    // Prevents form submission when errors are present.
    if (newErrors.length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setPageLoading(true);

    const result = await updateUserSettingsUtil(preferencesData, settingsData);

    if (result.error) {
      return;
    }

    setPageLoading(false);
    setSettingsSavedModalOpen(true);
  };

  // Closes confirmation modal.
  const settingsCancelHandler = () => {
    setSettingsModalOpen(false);
  };

  const formChangeHandler = () => {
    setSettingsChanged(true);
  };

  // On settings page switch.
  // Gets user's current settings to prefill form.
  useEffect(() => {
    if (currentPage !== "profile") {
      return;
    }

    setPageLoading(true);

    // Simulates a 1 second load time
    setTimeout(() => {
      getUserSettingsUtil().then((result) => {
        if (result.error === true) {
          return;
        }

        // Stores the original username.
        setOriginalUsername(result.username);

        // If no preferences exists, set default settings.
        if (result.preferences === null) {
          setPreferencesData({
            display_real_name: "username",
          });
        } else {
          // Sets the user's preferences
          setPreferencesData({
            display_real_name: result.preferences.display_real_name
              ? "real_name"
              : "username",
          });
        }

        // Sets the user's name settings
        setSettingsData({
          first_name: result.first_name,
          last_name: result.last_name,
          username: result.username,
        });

        setPageLoading(false);
      });
    }, 150);
  }, [currentPage]);

  // Handles checking if typed username is available.
  useEffect(() => {
    // Ignores first page load.
    if (
      !settingsData.username ||
      settingsData.username.length === 0 ||
      settingsData.username === originalUsername
    ) {
      setUsernameAvailable(undefined);
      return;
    }

    // Displays loading spinner.
    setUsernameAvailable(null);

    const timeoutID = setTimeout(async () => {
      const result = await isUsernameAvailable(settingsData.username);

      if (result.usernameAvailable) {
        setUsernameAvailable(true);
      } else {
        setUsernameAvailable(false);
      }
    }, 500);

    return () => clearTimeout(timeoutID);
  }, [settingsData.username]);

  return (
    <div className="w-full">
      {settingsModalOpen ? (
        <Modal
          title={SaveSettingsTitle}
          description={SaveSettingsDescription}
          confirmAction={settingsConfirmHandler}
          cancelAction={settingsCancelHandler}
        />
      ) : null}
      {settingsSavedModalOpen ? (
        <NotificationModal
          title="Settings Saved!"
          description="Your settings have been successfully saved!"
          cancelAction={() => setSettingsSavedModalOpen(false)}
        />
      ) : null}
      <h1 className="font-bold text-4xl desktop:text-3xl border-b-2 border-black mb-2">
        Profile Settings
      </h1>
      <div className="flex flex-col w-full mb-6 text-2xl p-2 border-2 border-slate-400 shadow-md rounded-md">
        <div
          onClick={toggleOpenDisplayName}
          className="flex flex-row justify-between cursor-pointer"
        >
          <p className="font-bold text-3xl">Display Name</p>
          <div className="flex justify-center items-center transition-all">
            <FontAwesomeIcon
              icon={faCaretUp}
              className="transition-all"
              rotation={displayNameFormOpen ? undefined : 180}
            />
          </div>
        </div>
        <ExpandingHeightContainer isOpen={displayNameFormOpen}>
          <form
            onChange={formChangeHandler}
            className="w-full text-4xl desktop:text-xl"
          >
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                id="real_name"
                name="display_real_name"
                value="real_name"
                checked={preferencesData.display_real_name === "real_name"}
                onChange={handlePreferencesChange}
              />
              <label htmlFor="real_name" className="mb-1">
                Real Name
              </label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                id="username"
                name="display_real_name"
                value="username"
                checked={preferencesData.display_real_name === "username"}
                onChange={handlePreferencesChange}
              />
              <label htmlFor="username" className="mb-1">
                Username
              </label>
            </div>
          </form>
        </ExpandingHeightContainer>
      </div>

      <div className="flex flex-col w-full mb-6 text-2xl p-2 border-2 border-slate-400 shadow-md rounded-md">
        <div
          onClick={toggleOpenRealName}
          className="flex flex-row justify-between cursor-pointer"
        >
          <p className="font-bold text-3xl">Real Name</p>
          <div className="flex justify-center items-center transition-all">
            <FontAwesomeIcon
              icon={faCaretUp}
              className="transition-all"
              rotation={realNameFormOpen ? undefined : 180}
            />
          </div>
        </div>
        <ExpandingHeightContainer isOpen={realNameFormOpen}>
          <form
            onChange={formChangeHandler}
            className="w-full text-4xl desktop:text-xl"
          >
            <div className="flex flex-col w-full mb-6">
              <label htmlFor="first_name" className="mb-1">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                required
                value={settingsData.first_name}
                onChange={handleSettingsDataCHange}
                className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
              />
            </div>

            <div className="flex flex-col w-full mb-6">
              <label htmlFor="last_name" className="mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                required
                value={settingsData.last_name}
                onChange={handleSettingsDataCHange}
                className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
              />
            </div>
          </form>
        </ExpandingHeightContainer>
      </div>

      <div className="flex flex-col w-full mb-6 text-2xl p-2 border-2 border-slate-400 shadow-md rounded-md">
        <div
          onClick={toggleOpenUsername}
          className="flex flex-row justify-between cursor-pointer"
        >
          <p className="font-bold text-3xl">Username (Display Name)</p>
          <div className="flex justify-center items-center transition-all">
            <FontAwesomeIcon
              icon={faCaretUp}
              className="transition-all"
              rotation={usernameFormOpen ? undefined : 180}
            />
          </div>
        </div>
        <ExpandingHeightContainer isOpen={usernameFormOpen}>
          <form
            onChange={formChangeHandler}
            className="w-full text-4xl desktop:text-xl"
          >
            <div className="flex flex-col w-full mb-6">
              <label htmlFor="username" className="mb-1">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  required
                  value={settingsData.username}
                  onChange={handleSettingsDataCHange}
                  className="rounded-md border-2 border-slate-400 py-3 px-4 w-full focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
                />
                {UsernameInputLoadingCircle}
              </div>
            </div>
          </form>
        </ExpandingHeightContainer>
      </div>

      <div className="text-red-600 ml-3 font-bold mb-2">
        {formErrors.map((error, index) => {
          return <li key={index}>{error}</li>;
        })}
      </div>

      <div className="flex flex-col w-full mb-6">
        <button
          onClick={settingsSubmitHandler}
          disabled={settingsChanged ? false : true}
          className={`rounded-md bg-sky-400 hover:bg-sky-600 text-white font-bold py-3 px-4 ${
            !settingsChanged ? "cursor-not-allowed opacity-50" : null
          }`}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default PublicProfileSettings;
