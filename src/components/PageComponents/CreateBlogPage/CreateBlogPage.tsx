import { Editor } from "@tinymce/tinymce-react";

import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../Welcome/Footer";

const CreateBlogPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <div className="w-[95vw] desktop:w-1/2 my-4">
          <Editor
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            licenseKey="gpl"
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
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateBlogPage;
