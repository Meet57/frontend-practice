import { useState } from "react";
import "./App.css";
import { GridBoxGenerator } from "./projects/GridBoxGenerator/GridBoxGenerator";
import { SlidingComponent } from "./projects/SlidingComponent/SlidingComponent";
import { StarRating } from "./projects/StarRating/StarRating";
import { TicTacToe } from "./projects/TicTacToe/TicTacToe";
import { MouseFollower } from "./projects/MouseFollower/MouseFollower";
import { StopWatch } from "./projects/StopWatch/StopWatch";
import { InfiniteScroll } from "./projects/InfiniteScroll/InfiniteScroll";
import { InfiniteScrollNews } from "./projects/InfiniteScrollNews/InfiniteScrollNews";
import { Accordion } from "./projects/Accordion/Accordion";
import PostList from "./projects/PostList/PostList";

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
    { name: "Posts", component: <PostList /> },
  ];

  return (
    <div className="App h-screen flex flex-col">
      {/* Tabs Section with horizontal scrolling */}
      <div className="tabs border-b border-gray-300 overflow-x-auto whitespace-nowrap flex h-10">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => setActiveProject(index)}
            className={`py-2 px-4 mx-2 text-sm flex-shrink-0 ${activeProject === index ? "bg-blue-600 text-white" : "bg-gray-200"
              } hover:bg-gray-300`}
          >
            {project.name}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="content flex-1 overflow-auto">
        {activeProject !== null && (
          <div className="project-container w-full p-6">
            {projects[activeProject].component}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
