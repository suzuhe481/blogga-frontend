import LogoContainer from "./LogoContainer/LogoContainer";

const Navbar = () => {
  // null = before fetching user
  // false = user not logged in
  const [user, setUser] = useState<Iuser | false | null>(null);

  // Retrieves and sets user data for navbar.
  useEffect(() => {
    navbarDataUtil().then((result) => {
      if (result.error === true) {
        setUser(false);
        return;
      }

      const user: Iuser = {
        first_name: result.first_name,
        last_name: result.last_name,
        verified: result.verified,
      };

      setUser(user);
    });
  }, []);

  return (
    <div className="navbar-container flex flex-col justify-center items-center m-2 mb-0 desktop:mx-48">
      <div className="navbar flex flex-row justify-between items-center h-12 desktop:h-20 w-full mx-2">
        <LogoContainer />
        {user ? (
          <ProfileContainer user={user} />
        ) : user === false ? (
          <MenuPublic />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
