import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";
import tinymce, { Editor as TinyMCEEditor } from "tinymce";

import { bouncy } from "ldrs";
import { ring } from "ldrs";

import getDraftUtil from "../../../helpers/getDraftUtil";
import updateBlogUtil from "../../../helpers/updateBlogUtil";

interface IBlogEditForm {
  setFormSuccess: (value: boolean) => void;
  setBlogId: (id: string) => void;
}

const BlogEditForm = ({ setFormSuccess, setBlogId }: IBlogEditForm) => {
  bouncy.register();
  ring.register();

  const navigate = useNavigate();

  const { id = "" } = useParams() as { id: string }; // Fallback value of ""

  const [titleValue, setTitleValue] = useState("");
  const [blogValue, setBlogValue] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [draftSubmitted, setDraftSubmitted] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

  const [errors, setErrors] = useState<Array<string>>([]);

  const [isFormLoading, setIsFormLoading] = useState(true);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  // Changes titleValue state when title input gets changed.
  function handleTitleChange(e: {
    target: { value: React.SetStateAction<string> };
  }) {
    setTitleValue(e.target.value);
  }

  // Changes blogValue state when text editor gets a change.
  function handleEditorChange(content: React.SetStateAction<string>) {
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
  const WhiteAnimation = <l-bouncy size="30" speed="1.75" color="white" />;

  // Blue - When Login button is NOT hovered after form submit, animation is blue.
  const BlueAnimation = <l-bouncy size="30" speed="1.75" color="#00A9FF" />;

  // Loading animation for form.
  // Note: TinyMCE editor cannot be conditionally rendered or it won't initialize.
  // Hide the form with css and display loading animation.
  // Then display form when it initializes.
  const loadingAnimation = (
    <div className="flex justify-center items-center w-full">
      <l-ring
        size="40"
        stroke="5"
        bg-opacity="0"
        speed="2"
        color="rgb(59, 189, 248)"
      />
    </div>
  );

  // Runs when editor is initialized.
  const handleEditorInit = (_evt: any, editor: TinyMCEEditor) => {
    editorRef.current = editor;
    setIsFormLoading(false);
  };

  async function onSubmitHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (event.currentTarget.value === "draft") {
      setDraftSubmitted(true);
    } else {
      setFormSubmitted(true);
    }

    // Clears errors
    setErrors([]);

    // Create object to be sent to server
    const blogData = {
      title: titleValue,
      blog: blogValue,
      draft: event.currentTarget.value === "draft" ? true : false,
      shortId: id,
    };

    const result = await updateBlogUtil(blogData);

    setTimeout(() => {
      setFormSubmitted(false);
      setDraftSubmitted(false);

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
      setBlogId(result.blog.shortId);

      // Redirects user to home page.
      //   window.location.href = "/";
    }, 1000);
  }

  // Retrieves and sets blog data.
  useEffect(() => {
    getDraftUtil(id).then((result) => {
      if (result.error === true) {
        // setBlogError(true);
        // setBlogLoading(false);

        // redirect to 404 page
        navigate("whoops");
        return;
      }

      setTitleValue(result.blog.title);
      // Blog value needs to be decoded to be properly formatted before it can be set in the form.
      setBlogValue(decodeHtmlEntities(result.blog.blog));
    });
  }, [id, editorRef]);

  // Utility function to decode HTML entities
  const decodeHtmlEntities = (str: string) => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.body.textContent || doc.body.innerText;
  };

  return (
    <div className="w-[95vw] desktop:w-[75rem] m-4">
      {isFormLoading ? loadingAnimation : ""}
      <form
        className="flex flex-col gap-4"
        style={{ display: isFormLoading ? "none" : "flex" }}
      >
        <div className="flex flex-col">
          <label htmlFor="text">Title</label>
          <input
            type="text"
            name="title"
            required
            onChange={handleTitleChange}
            value={titleValue}
            className="rounded-md border-2 border-slate-400 py-3 px-4 focus:outline-none focus:border-[#75C1FF] focus:shadow-[0_0_0_2px_#B3E0FF]"
          />
        </div>

        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          onEditorChange={(newValue) => handleEditorChange(newValue)}
          onInit={handleEditorInit}
          value={blogValue}
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

        <div className="flex flex-col gap-2">
          <button
            onClick={onSubmitHandler}
            onMouseEnter={loginMouseEnterHandler}
            onMouseLeave={loginMouseLeaveHandler}
            className="p-2 border-2 border-sky-400 w-full bg-sky-400 text-white hover:bg-sky-600 rounded-lg font-bold"
          >
            {formSubmitted ? WhiteAnimation : "Blog it"}
          </button>
          <button
            onClick={onSubmitHandler}
            onMouseEnter={loginMouseEnterHandler}
            onMouseLeave={loginMouseLeaveHandler}
            value={"draft"}
            className="p-2 border-2 border-slate-400 w-full text-slate-600 hover:bg-slate-400 hover:text-white rounded-lg font-bold"
          >
            {draftSubmitted
              ? submitHovered
                ? WhiteAnimation
                : BlueAnimation
              : "Save as Draft"}
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
};
export default BlogEditForm;
