import React from "react";
import "./PageHeader.scss";

const PageHeader = (props) => {
  return (
    <section>
      <h1 className="project-name">{props.name}</h1>
    </section>
  );
};

export default PageHeader;
