import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import github from "../../assets/icons/github.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import "./PageFooter.scss";

const PageFooter = () => {
  return (
    <footer className="footer">
      <p className="footer__item">Copyright 2021</p>
      <a className="footer__item" href="mailto:huanyuw01@gmail.com">
        Email Me
      </a>
      <div className="footer__item">
        <a
          href="https://github.com/hnslyswhy"
          target="_blank"
          rel="noreferrer"
          className="footer__link"
        >
          <img src={github} alt="github" className="footer__icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/huanyu-wang-015b91190/"
          target="_blank"
          rel="noreferrer"
          className="footer__link"
        >
          <img src={linkedin} alt="github" className="footer__icon" />
        </a>
      </div>
    </footer>
  );
};

export default PageFooter;
