import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { roadmaps } from "../data/RoadmapData";

const RoadmapViewer = ({ onTopicSelect }) => {
  const [selectedRole, setSelectedRole] = useState("backend");
  const [selectedNode, setSelectedNode] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const roles = [
    { id: "backend", label: "Backend Engineer" },
    { id: "frontend", label: "Frontend Engineer" },
    { id: "data-engineer", label: "Data Engineer" },
    { id: "devops", label: "DevOps Engineer" },
  ];

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const handleNodeClick = (nodeId) => {
    if (selectedNode?.id === nodeId) return;

    const node = roadmaps[selectedRole].nodes.find((n) => n.id === nodeId);
    setSelectedNode(node);

    if (onTopicSelect && node) {
      onTopicSelect({
        role: selectedRole,
        topic: node.title,
        description: node.description,
        details: `Tell me about ${node.title} for ${
          roles.find((r) => r.id === selectedRole).label
        }. What should I learn and what resources do you recommend?`,
      });
    }
  };

  const renderMainNodes = () => {
    if (!roadmaps[selectedRole]) return null;

    const mainNodes = roadmaps[selectedRole].nodes.filter(
      (node) => node.type === "main"
    );

    return (
      <div className="flex flex-col space-y-4">
        {mainNodes.map((node) => (
          <div key={node.id} className="border border-gray-200 rounded-lg shadow-sm">
            <div
              className={`p-3 flex justify-between items-center cursor-pointer ${
                selectedNode?.id === node.id ? "bg-blue-50" : "bg-white"
              }`}
              onClick={() => handleNodeClick(node.id)}
            >
              <div>
                <div className="font-medium text-blue-700">{node.title}</div>
                <div className="text-sm text-gray-600">{node.description}</div>
              </div>
              {node.children && node.children.length > 0 && (
                <button
                  className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNode(node.id);
                  }}
                >
                  {expandedNodes[node.id] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              )}
            </div>

            {expandedNodes[node.id] && node.children && (
              <div className="bg-gray-50 border-t border-gray-100 px-3 py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {node.children.map((childId) => {
                    const childNode = roadmaps[selectedRole].nodes.find(
                      (n) => n.id === childId
                    );
                    return (
                      <div
                        key={childId}
                        className={`p-2 rounded cursor-pointer ${
                          selectedNode?.id === childId
                            ? "bg-blue-100"
                            : "bg-white hover:bg-gray-100"
                        }`}
                        onClick={() => handleNodeClick(childId)}
                      >
                        <div className="text-sm font-medium text-blue-800">
                          {childNode.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {childNode.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3 text-white flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">Interactive Career Roadmaps</h3>
          <p className="text-xs text-blue-200">Choose a path and explore what to learn</p>
        </div>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Navigate to the previous page
          className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
        >
          Back
        </button>
      </div>

      {/* Role selector tabs */}
      <div className="flex overflow-x-auto border-b sticky top-0 bg-white">
        {roles.map((role) => (
          <button
            key={role.id}
            className={`px-4 py-3 whitespace-nowrap ${
              selectedRole === role.id
                ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => {
              setSelectedRole(role.id);
              setSelectedNode(null);
            }}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            {roadmaps[selectedRole]?.title}
          </h1>
          <p className="text-gray-600">{roadmaps[selectedRole]?.description}</p>
        </div>

        {renderMainNodes()}
      </div>
    </div>
  );
};

export default RoadmapViewer;