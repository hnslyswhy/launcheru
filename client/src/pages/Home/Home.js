import React, { useState } from "react";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import astronaut from "../../assets/images/astronaut.jpeg";

const Home = () => {
  const [isStarted, setIsStarted] = useState(false);
  const handleClick = () => {
    setIsStarted(!isStarted);
  };
  return (
    <main>
      {!isStarted && (
        <div>
          <img src={astronaut} alt="astronaut" />
          <h1 onClick={handleClick}>Start</h1>
        </div>
      )}
      <ProjectForm /> {/* fpr style purpose only */}
      {isStarted && <ProjectForm />}
    </main>
  );
};

export default Home;
