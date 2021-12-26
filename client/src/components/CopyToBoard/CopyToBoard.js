import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import "./CopyToBoard.scss";

function CopyToBoard(props) {
  const [isCopied, setIsCopied] = useState(false);
  const handleToggleCopyLink = () => {
    setIsCopied(!isCopied);
  };

  return (
    <div className="copy">
      {!isCopied && (
        <CopyToClipboard text={props.link} onCopy={handleToggleCopyLink}>
          <p className="copy__instruction">Click to copy your project link</p>
        </CopyToClipboard>
      )}
      {isCopied && (
        <p className="copy__succeed" onClick={handleToggleCopyLink}>
          Copied
        </p>
      )}
    </div>
  );
}

export default CopyToBoard;
