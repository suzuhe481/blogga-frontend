import Navbar from "../../UI/Navbar/Navbar";
import UserSettings from "./UserSettings";
import Footer from "../../UI/Footer/Footer";

const UserSettingsPage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden justify-between">
      <Navbar />
      <UserSettings />
      <Footer />
    </div>
  );
};

export default UserSettingsPage;
