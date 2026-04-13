import React, { useState } from 'react';
// import './App.css';

const RoadMap = () => {
  const [activeNode, setActiveNode] = useState(null);

  const handleNodeClick = (id) => {
    setActiveNode(id);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Milestone 1 */}
        <div
          className={`timeline-node ${activeNode === 'M1' ? 'bg-purple-700 text-white' : 'bg-white text-black'}`}
          onClick={() => handleNodeClick('M1')}
        >
          <span className="font-bold">M1</span>
          <p className="text-xs">Intro to Programming & JavaScript</p>
        </div>
        <div className="timeline-line"></div>

        {/* Milestone 2 */}
        <div
          className={`timeline-node ${activeNode === 'M2' ? 'bg-purple-700 text-white' : 'bg-white text-black'}`}
          onClick={() => handleNodeClick('M2')}
        >
          <span className="font-bold">M2</span>
          <p className="text-xs">Setting up your environment (VS Code, Git)</p>
        </div>
        <div className="timeline-line"></div>

        {/* Milestone 3 */}
        <div
          className={`timeline-node ${activeNode === 'M3' ? 'bg-purple-700 text-white' : 'bg-white text-black'}`}
          onClick={() => handleNodeClick('M3')}
        >
          <span className="font-bold">M3</span>
          <p className="text-xs">JavaScript syntax basics (variables, data types)</p>
        </div>
        <div className="timeline-line"></div>

        {/* Milestone 4 */}
        <div
          className={`timeline-node ${activeNode === 'M4' ? 'bg-purple-700 text-white' : 'bg-white text-black'}`}
          onClick={() => handleNodeClick('M4')}
        >
          <span className="font-bold">M4</span>
          <p className="text-xs">Intro project: Display a greeting message</p>
        </div>
        <div className="timeline-line"></div>

        {/* Milestone 5 */}
        <div
          className={`timeline-node ${activeNode === 'M5' ? 'bg-purple-700 text-white' : 'bg-white text-black'}`}
          onClick={() => handleNodeClick('M5')}
        >
          <span className="font-bold">M5</span>
          <p className="text-xs">Intro project: Display a greeting message</p>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;








