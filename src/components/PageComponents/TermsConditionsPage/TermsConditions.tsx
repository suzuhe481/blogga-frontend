import { useState, useEffect } from "react";

import Markdown from "react-markdown";

const TermsConditions = () => {
  const [termsConditionsMarkdown, setTermsConditionsMarkdown] = useState("");

  const TermsConditionsFilePath = "/markdown/TermsConditions.md";

  // Gets the Terms and Conditions markdown
  useEffect(() => {
    const fetchMarkdown = async () => {
      const result = await fetch(TermsConditionsFilePath);

      const markdown = await result.text();

      setTermsConditionsMarkdown(markdown);
    };

    fetchMarkdown();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-[90vw] desktop:w-[50vw]">
        <div className="markdown">
          <Markdown>{termsConditionsMarkdown}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
