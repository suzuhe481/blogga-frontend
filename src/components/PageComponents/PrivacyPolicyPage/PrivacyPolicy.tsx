import { useState, useEffect } from "react";

import Markdown from "react-markdown";

const PrivacyPolicy = () => {
  const [privacyPolicyMarkdown, setPrivacyPolicyMarkdown] = useState("");

  const PrivacyPolicysFilePath = "src/assets/PrivacyPolicy.md";

  // Gets the Privacy Policy markdown
  useEffect(() => {
    const fetchMarkdown = async () => {
      const result = await fetch(PrivacyPolicysFilePath);

      const markdown = await result.text();

      setPrivacyPolicyMarkdown(markdown);
    };

    fetchMarkdown();
  });

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-[90vw] desktop:w-[50vw]">
        <div className="markdown">
          <Markdown>{privacyPolicyMarkdown}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
