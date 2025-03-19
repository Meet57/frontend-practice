import { useState } from "react";
import "./App.css"
import { GridBoxGenerator } from "./projects/GridBoxGenerator/GridBoxGenerator";
import { SlidingComponent } from "./projects/SlidingComponent/SlidingComponent";
import { StarRating } from "./projects/StarRating/StarRating";
import { TicTacToe } from "./projects/TicTacToe/TicTacToe";
import { MouseFollower } from "./projects/MouseFollower/MouseFollower";
import { StopWatch } from "./projects/StopWatch/StopWatch";
import { InfiniteScroll } from "./projects/InfiniteScroll/InfiniteScroll";
import { InfiniteScrollNews } from "./projects/InfiniteScrollNews/InfiniteScrollNews";
import { Accordion } from "./projects/Accordion/Accordion";

function App() {
  const [activeProject, setActiveProject] = useState(1);

  const projects = [
    { name: "Grid Box Generator", component: <GridBoxGenerator /> },
    { name: "Sliding Component", component: <SlidingComponent /> },
    { name: "Star Rating", component: <StarRating /> },
    { name: "Tic Tac Toe", component: <TicTacToe /> },
    { name: "Mouse Follower", component: <MouseFollower /> },
    { name: "StopWatch", component: <StopWatch /> },
    { name: "Infinite Scroll", component: <InfiniteScroll /> },
    { name: "Infinite Scroll News", component: <InfiniteScrollNews /> },
    { name: "Accordion", component: <Accordion /> },
  ];

  return (
    <div className="App">
      <div className="tabs">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => setActiveProject(index)}
            className={`tab ${activeProject === index ? "active" : ""}`}
          >
            {project.name}
          </button>
        ))}
      </div>

      <div className="content">
        {activeProject !== null && (
          <div className="project-container">
            <h2>{projects[activeProject].name}</h2>
            {projects[activeProject].component}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
