import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";
import BlogCreateSuccess from "./BlogCreateSuccess";

import submitBlogUtil from "../../../helpers/submitBlogUtil";

import { bouncy } from "ldrs";

const CreateBlogPage = () => {
  bouncy.register();

  const editorRef = useRef(null);

  const [titleValue, setTitleValue] = useState("");
  const [blogValue, setBlogValue] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

  const [formSuccess, setFormSuccess] = useState(false);
  const [blogId, setBlogId] = useState("");

  const [errors, setErrors] = useState<Array<string>>([]);

  // Changes titleValue state when title input gets changed.
  function handleTitleChange(e) {
    setTitleValue(e.target.value);
  }

  // Changes blogValue state when text editor gets a change.
  function handleEditorChange(content) {
    setBlogValue(content);
  }

  // Sets state when mouse enters login button
  function loginMouseEnterHandler() {
    setSubmitHovered(true);
  }

  // Sets state when mouse leaves login button
  function loginMouseLeaveHandler() {
    setSubmitHovered(false);
  }

  // White - When Login button is hovered after form submit, animation is white.
  const HoveredAnimation = <l-bouncy size="30" speed="1.75" color="white" />;

  // Blue - When Login button is NOT hovered after form submit, animation is blue.
  const UnHoveredAnimation = (
    <l-bouncy size="30" speed="1.75" color="#00A9FF" />
  );

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormSubmitted(true);

    // Clears errors
    setErrors([]);

    // Create object to be sent to server
    const blogData = {
      title: titleValue,
      blog: blogValue,
    };

    const result = await submitBlogUtil(blogData); // Call login to server.

    setTimeout(() => {
      setFormSubmitted(false);

      if (result.error) {
        var errorsArray = result.msg; // Contains an array of objects from server
        // console.log(errorsArray);

        // Stores each error message into an array
        var errorsArrayMessages = errorsArray.map(
          (errorObj: { msg: string }) => {
            return errorObj.msg;
          }
        );

        // Set errors
        // setErrors((prev) => {
        //   return [...prev, errorsArray.msg];
        // });
        setErrors(errorsArrayMessages);

        return;
      }

      setFormSuccess(true);
      setBlogId(result.post.shortId);

      // Redirects user to home page.
      //   window.location.href = "/";
    }, 1000);
  }

  const FormSection = (
    <div className="w-[95vw] desktop:w-[75rem] m-4">
      <form className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="text">Title</label>
          <input
            type="text"
            name="title"
            required
            onChange={handleTitleChange}
            className="shadow-black shadow-sm border-transparent border-2 p-1 focus:border-blue-400 outline-none rounded-lg"
          />
        </div>

        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          onEditorChange={(newValue) => handleEditorChange(newValue)}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: true,
            resize: true,
            elementpath: false,
            promotion: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | preview | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        <div>
          <button
            onClick={onSubmitHandler}
            onMouseEnter={loginMouseEnterHandler}
            onMouseLeave={loginMouseLeaveHandler}
            className="p-2 border-2 border-sky-400 w-full text-sky-400 hover:bg-sky-400 hover:text-white rounded-lg"
          >
            {formSubmitted
              ? submitHovered
                ? HoveredAnimation
                : UnHoveredAnimation
              : "Blog it!"}
          </button>
        </div>
      </form>
      <div className="text-red-600 ml-3 font-bold">
        {errors.map((errorMsg, index) => {
          return <li key={index}>{errorMsg}</li>;
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center w-full h-full">
        {formSuccess ? <BlogCreateSuccess blogId={blogId} /> : FormSection}
      </div>
      <Footer />
    </div>
  );
};

export default CreateBlogPage;
