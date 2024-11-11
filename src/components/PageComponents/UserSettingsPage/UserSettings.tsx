import { useState } from "react";

import AccountSettings from "./AccountSettings";
import PublicProfileSettings from "./PublicProfileSettings";

import { ring } from "ldrs";

const UserSettings = () => {
  ring.register();
  // Can be "profile" or "account"
  const [currentPage, setCurrentPage] = useState<string>("profile");

  // This is set to true whenever a load needs to be done.
  // Eg. When switching to Profile Settings, calling API.
  const [pageLoading, setPageLoading] = useState<boolean>(true);

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

  // Changes the page
  const changeSettingsPage = (newPage: string) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-4 mb-0 w-full max-w-[90vw] desktop:max-w-[636px]">
      {pageLoading ? PageLoadingAnimation : null}
      <div className="w-full flex flex-col justify-center items-center mb-8">
        <div className="w-full text-center font-bold font-FuzzyBubbles text-4xl mb-2">
          Settings
        </div>
        <div className="flex flex-row gap-4 mb-6">
          <button
            onClick={(e) => changeSettingsPage("profile")}
            className={`italic hover:bg-slate-400 py-2 px-4 rounded-md ${
              currentPage === "profile" ? "bg-slate-300" : null
            }`}
          >
            Profile Settings
          </button>
          <button
            onClick={(e) => changeSettingsPage("account")}
            className={`italic hover:bg-slate-400 py-2 px-4 rounded-md ${
              currentPage === "account" ? "bg-slate-300" : null
            }`}
          >
            Account Settings
          </button>
        </div>

        <div className="w-full">
          {currentPage === "profile" ? (
            <PublicProfileSettings
              currentPage={currentPage}
              setPageLoading={setPageLoading}
            />
          ) : currentPage === "account" ? (
            <AccountSettings setPageLoading={setPageLoading} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
