const BlogCreateSuccess = (blogId: string) => {
  console.log(blogId);
  return (
    <div>
      <h1>Congratulations!</h1>
      <div>Your blog was successfully created!</div>
      <div>View your blog here.</div>
    </div>
  );
};

export default BlogCreateSuccess;
