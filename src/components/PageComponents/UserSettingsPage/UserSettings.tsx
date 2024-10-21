import { useState, useEffect, useRef } from "react";

import Modal from "../../UI/Modal/Modal";

import "ldrs/ring";

import {
  getUserSettingsUtil,
  updateUserSettingsUtil,
  deleteUserProfileUtil,
} from "../../../helpers/userSettingsUtil";

export interface ISettings {
  display_real_name: string;
}

const UserSettings = () => {
  const [userID, setuserID] = useState<string>("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [settings, setSettings] = useState<ISettings>({
    display_real_name: "",
  });
  const [apiCalling, setApiCalling] = useState<boolean>(false);

  // States for controlling modals
  const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
  const [deleteProfileModalOpen, setDeleteProfileModalOpen] =
    useState<boolean>(false);

  const formRef = useRef(null);

  // Text for the Save Settings modal.
  const SaveSettingsTitle = "Save Settings";
  const SaveSettingsDescription =
    "Do you want to save your current profile settings?";

  // Text for the Delete Profile modal.
  const DeleteProfileTitle = "Delete Profile";
  const DeleteProfileDescription =
    "Are you sure you want to delete your profile? This will also delete all of your blogs.";

  // Stores form's changes to settings in settings state.
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setSettings({
      ...settings,
      [name]: value,
    });
  };

  // Page Loading Animation Element.
  const PageLoadingAnimation = (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full overflow-hidden">
      <l-ring
        size="100"
        stroke="15"
        bg-opacity="0.2"
        speed="2"
        color="rgb(59, 189, 248)"
      />
    </div>
  );

  // Calls API to set changes to user's settings.
  // Closes confirmation modal.
  // Display loading animation until api call is done.
  const settingsConfirmHandler = async () => {
    if (settings === null) {
      return;
    }

    setSettingsModalOpen(false);
    setApiCalling(true);

    const result = await updateUserSettingsUtil(settings);

    if (result.error) {
      return;
    }

    setApiCalling(false);
  };

  // Closes confirmation modal.
  const settingsCancelHandler = () => {
    setSettingsModalOpen(false);
  };

  // Opens the confirmation modal.
  const settingsSubmitHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setSettingsModalOpen(true);
  };

  // Calls API to delete user's profile.
  // Closes confirmation modal.
  // Display loading animation until api call is done.
  const deleteProfileConfirmHandler = async () => {
    setDeleteProfileModalOpen(false);
    setApiCalling(true);

    // API call to delete profile
    const result = await deleteUserProfileUtil(userID);

    await setDeleteProfileModalOpen(false);

    if (result.error) {
      return;
    }

    // Redirect to home page after profile deletion.
    window.location.href = "/";
  };

  // Closes confirmation modal.
  const deleteProfileCancelHandler = () => {
    setDeleteProfileModalOpen(false);
  };

  // Opens the confirmation modal.
  const deleteProfileSubmitHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setDeleteProfileModalOpen(true);
  };

  // On initial page load.
  // Gets user's current settings to prefill form.
  useEffect(() => {
    // Simulates a 1 second load time
    setTimeout(() => {
      getUserSettingsUtil().then((result) => {
        if (result.error === true) {
          return;
        }

        setuserID(result.id);
        setSettings({
          display_real_name: result.settings.display_real_name
            ? "real_name"
            : "username",
        });

        setInitialLoading(false);
      });
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-4 mb-0 w-[90vw] desktop:w-[30rem]">
      {settingsModalOpen ? (
        <Modal
          title={SaveSettingsTitle}
          description={SaveSettingsDescription}
          confirmAction={settingsConfirmHandler}
          cancelAction={settingsCancelHandler}
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
      {apiCalling ? PageLoadingAnimation : null}
      <div className="w-full flex flex-col justify-center items-center mb-8">
        <div className="w-full text-center font-bold font-FuzzyBubbles text-4xl mb-6">
          Settings
        </div>
        {initialLoading ? (
          PageLoadingAnimation
        ) : (
          <div className="w-full">
            <form ref={formRef} className="w-full text-4xl desktop:text-xl">
              <h1 className="font-bold text-4xl desktop:text-3xl border-b-2 border-black">
                Profile Settings
              </h1>
              <div className="flex flex-col w-full mb-6 text-2xl">
                <p className="font-bold text-3xl">Display Name</p>
                <div className="flex flex-row gap-2">
                  <input
                    type="radio"
                    id="real_name"
                    name="display_real_name"
                    value="real_name"
                    defaultChecked={settings.display_real_name === "real_name"}
                    onChange={handleSettingsChange}
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
                    defaultChecked={settings.display_real_name === "username"}
                    onChange={handleSettingsChange}
                  />
                  <label htmlFor="username" className="mb-1">
                    Username
                  </label>
                </div>
              </div>
              <div className="flex flex-col w-full mb-6">
                <button
                  onClick={settingsSubmitHandler}
                  className="rounded-md bg-sky-400 hover:bg-sky-600 text-white font-bold py-3 px-4"
                >
                  Save Settings
                </button>
              </div>
            </form>

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
        )}
      </div>
    </div>
  );
};

export default UserSettings;
