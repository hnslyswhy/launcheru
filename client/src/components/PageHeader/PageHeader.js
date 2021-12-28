import React from "react";
import CopyToBoard from "../CopyToBoard/CopyToBoard";
import "./PageHeader.scss";

const PageHeader = (props) => {
  return (
    <section>
      <h1 className="project-name">{props.name}</h1>
      <CopyToBoard link={`http://localhost:3000/project/${props.id}`} />
    </section>
  );
};

export default PageHeader;
