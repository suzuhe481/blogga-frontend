interface IblogId {
  blogId: string;
}

const BlogEditSuccess = ({ blogId }: IblogId) => {
  const newBlogLink = `/blog/${blogId}`;

  return (
    <div className="flex flex-col justify-center items-center gap-4 animate-fadeInSlide w-full font-FuzzyBubbles">
      <h1 className="text-4xl">Congratulations!</h1>
      <div className="text-2xl text-center">
        <div>Your blog was successfully created!</div>
        <div>
          <a href={newBlogLink} className="hover:text-sky-400">
            Click here to view your blog.
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogEditSuccess;
