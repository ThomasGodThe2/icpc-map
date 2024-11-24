"use client";

import React, { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import "./MindmapPage.css";

export default function MindmapPage() {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [mindmapData, setMindmapData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const treeContainer = useRef(null);
  const cardRef = useRef(null);

  // Fetch mindmap data
  useEffect(() => {
    async function fetchMindmapData() {
      try {
        const res = await fetch("/api/mindmap");
        const data = await res.json();
        setMindmapData(data);
      } catch (error) {
        console.error("Failed to fetch mindmap data:", error);
      }
    }

    fetchMindmapData();
  }, []);

  // Set translate position for tree centering
  useEffect(() => {
    if (treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 4,
      });
    }
  }, []);

  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData);
  };

  const containerStyles = {
    width: "100%",
    height: "100vh",
    position: "relative",
  };

  if (!mindmapData) {
    return <p>Loading mindmap...</p>;
  }

  return (
    <div style={containerStyles}>
      {/* Tree container */}
      <div
        ref={treeContainer}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <h1 style={{ textAlign: "center", color: "#333" }}>ICPC Mindmap</h1>
        <Tree
          data={mindmapData}
          orientation="vertical"
          pathFunc="diagonal"
          translate={translate}
          zoomable
          pan
          collapsible
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          onNodeClick={(nodeDatum) => handleNodeClick(nodeDatum)}
        />
      </div>

      {/* Card for selected node */}
      {selectedNode && (
        <div
          ref={cardRef}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            backgroundColor: "white",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 3,
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedNode(null)}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            &times;
          </button>

          <h3 style={{ margin: 0, color: "#333" }}>{selectedNode?.data.name}</h3>
          <p style={{ marginTop: "5px", color: "#666" }}>
            {selectedNode?.data.description || "No description available."}
          </p>
        </div>
      )}
    </div>
  );
}