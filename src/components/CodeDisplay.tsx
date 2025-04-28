import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeDisplay = ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={materialDark}
      showLineNumbers={true}
      wrapLines={true}
      customStyle={{
        fontSize: "12px",
      }}
      startingLineNumber={1}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeDisplay;
