import LogoContainer from "./LogoContainer/LogoContainer";

const Navbar = () => {
  return (
    <div className="navbar-container flex flex-col justify-center items-center m-2 mb-0 desktop:mx-48">
      <div className="navbar flex flex-row justify-between items-center h-12 desktop:h-20 w-full mx-2">
        <LogoContainer />
      </div>
    </div>
  );
};

export default Navbar;
