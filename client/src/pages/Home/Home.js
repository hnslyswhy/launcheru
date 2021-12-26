import React, { useState } from "react";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import astronaut from "../../assets/images/astronaut.jpeg";
import "./Home.scss";

const Home = () => {
  const [isStarted, setIsStarted] = useState(false);
  const handleClick = () => {
    setIsStarted(!isStarted);
  };
  return (
    <main className="home ">
      {!isStarted && (
        <div className="home__container">
          <h1 className="home__title">Project Count Down</h1>
          <img className="home__image" src={astronaut} alt="astronaut" />
          <button className="home__start" onClick={handleClick}>
            Start
          </button>
        </div>
      )}
      {isStarted && <ProjectForm />}
    </main>
  );
};

export default Home;
