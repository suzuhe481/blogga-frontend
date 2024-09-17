import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";

const CreateBlogPage = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <div className="w-[95vw] desktop:w-[75rem] my-4">
          <form>
            <div className="flex flex-col">
              <label htmlFor="text">Title</label>
              <input
                type="text"
                name="title"
                required
                onChange={handleTitleChange}
                className="shadow-black shadow-sm border-transparent border-4 p-1  outline-none rounded-lg"
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
          <div className="text-red-600 ml-3">
            {errors.map((error, index) => {
              return <li key={index}>{error}</li>;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateBlogPage;
