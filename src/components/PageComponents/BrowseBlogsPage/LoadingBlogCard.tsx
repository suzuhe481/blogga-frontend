const LoadingBlogCard = () => {
  return (
    <div className="flex w-full p-4 animate-pulse">
      <div className="group flex flex-col w-full">
        <div className="flex justify-center bg-slate-300 0 w-[90vw] lg:w-[30rem] rounded-xl">
          <img className="h-32 object-contain aspect-auto my-4" />
        </div>
        <div className="mb-2 group-hover:underline font-bold bg-slate-300 my-1 w-full rounded-xl h-6"></div>
        <div className="flex flex-row gap-4 mb-2">
          <div className="bg-slate-300 rounded-xl h-6 w-1/4"></div>
          <div className="bg-slate-300 rounded-xl h-6 w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBlogCard;
