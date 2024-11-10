"use client";

import React, { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import './MindmapPage.css';
import {UserProvider} from "@auth0/nextjs-auth0/client";

export default function MindmapPage() {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false); // State to track if rendering on the client
  const treeContainer = useRef(null);

  useEffect(() => {
    setIsClient(true); // Only render the component on the client
    if (treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 4,
      });
    }
  }, []);

  // Define the mindmap structure
  const mindmapData = {
    name: 'ICPC Mindmap',
    children: [
      {
        name: 'Dynamic Programming',
        children: [{ name: 'Knapsack Problem' }, { name: 'LIS' }],
      },
      {
        name: 'Graph Theory',
        children: [{ name: 'DFS' }, { name: 'BFS' }, { name: 'Dijkstra' }],
      },
      {
        name: 'Data Structures',
        children: [{ name: 'Stacks' }, { name: 'Queues' }, { name: 'Trees' }],
      },
    ],
  };

  const containerStyles = {
    width: '100%',
    height: '100vh',
  };

  if (!isClient) {
    return null; // Skip rendering on the server
  }

  return (
    <UserProvider>
      <div ref={treeContainer} style={containerStyles}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>ICPC Mindmap</h1>
      <Tree
        data={mindmapData}
        orientation="vertical"
        pathFunc="diagonal"
        translate={translate}
        zoomable
        pan
        collapsible={true}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
      />
    </div>
    </UserProvider>
    
  );
}