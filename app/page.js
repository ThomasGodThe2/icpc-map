"use client";

import React, { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import "./MindmapPage.css";

export default function MindmapPage() {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [mindmapData, setMindmapData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null); // For selected node info
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

  // Close the card if clicked outside
  useEffect(() => {
    function handleOutsideClick(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setSelectedNode(null); // Close the card
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData); // Set the selected node
  };

  const containerStyles = {
    width: "100%",
    height: "100vh",
  };

  // Prevent rendering on the server
  if (typeof window === "undefined") {
    return null;
  }

  if (!mindmapData) {
    return <p>Loading mindmap...</p>;
  }

  return (
    <div ref={treeContainer} style={containerStyles}>
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
        onNodeClick={(nodeDatum) => handleNodeClick(nodeDatum)} // Handle node clicks
      />

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
            zIndex: 1000,
          }}
        >
          <h3 style={{ margin: 0, color: "#333" }}>{selectedNode.name}</h3>
          <p style={{ marginTop: "5px", color: "#666" }}>
            {selectedNode.description || "No description available."}
          </p>
        </div>
      )}
    </div>
  );
}