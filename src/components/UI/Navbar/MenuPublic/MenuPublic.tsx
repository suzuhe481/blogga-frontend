const MenuPublic = () => {
  return (
    <div className="flex flex-row text-nowrap justify-center items-center gap-6 h-fullk">
      <a
        href="/login"
        className="font-bold hover:text-sky-400 p-2 flex flex-row justify-center items-center"
      >
        Log in
      </a>
      <a
        href="/signup"
        className="text-sky-400 font-bold text-lg p-3 border-2 border-sky-400 rounded-md cursor-pointer
    
    hover:text-white 
    hover:bg-sky-400"
      >
        Create a FREE Account
      </a>
    </div>
  );
};

export default MenuPublic;
