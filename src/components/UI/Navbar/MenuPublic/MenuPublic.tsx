const MenuPublic = () => {
  return (
    <div className="flex flex-row text-nowrap justify-center items-center gap-1 desktop:gap-6 h-fullk">
      <a
        href="/login"
        className="font-bold hover:text-sky-400 text-sm desktop:text-lg text-nowrap p-2 flex flex-row justify-center items-center"
      >
        Log in
      </a>
      <a
        href="/signup"
        className="text-sky-400 font-bold text-sm text-nowrap desktop:text-lg p-2 border-2 border-sky-400 rounded-md cursor-pointer
    
    hover:text-white 
    hover:bg-sky-400"
      >
        Create a FREE Account
      </a>
    </div>
  );
};

export default MenuPublic;
