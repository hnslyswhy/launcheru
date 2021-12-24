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
    <main className="main">
      {!isStarted && (
        <div className="home__container">
          <h1 className="home__title">Project Count Down</h1>
          <img className="home__image" src={astronaut} alt="astronaut" />
          <h2 className="home__start" onClick={handleClick}>
            Start
          </h2>
        </div>
      )}
      <ProjectForm /> {/* fpr style purpose only */}
      {isStarted && <ProjectForm />}
    </main>
  );
};

export default Home;
