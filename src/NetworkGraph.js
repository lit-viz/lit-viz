import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { getAuthors, getNumLettersBetweenAuthors, getSentimentBetweenAuthors } from "./mockData";
import * as d3 from 'd3';
import { DataSet } from 'vis-data';

const AUTHOR_ICON = String.fromCharCode(9786);
const COLOR = {
  DEFAULT: "lightgray",
  HIGHLIGHTED: "lightgray",
  DIMMED: "ghostwhite"
}
const CURSOR = {
  DEFAULT: "default",
  POINTER: "pointer"
}

const NetworkGraph = ({
  data,
  selectedAuthorState: {
    selectedAuthor,
    setSelectedAuthor
  },
  selectedRelationshipState: {
      selectedRelationship,
      setSelectedRelationship
  },
  width,
  height
  }) => {

  // graph data to feed into the Graph component
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [nodesDataSet, setNodesDataSet] = useState(new DataSet());
  const [edgesDataSet, setEdgesDataSet] = useState(new DataSet());
  const [hoveredAuthor, setHoveredAuthor] = useState(null);
  const [hoveredRelationship, setHoveredRelationship] = useState(null);
  const [cursor, setCursor] = useState(CURSOR.DEFAULT);
  const [highlightedAuthors, setHighlightedAuthors] = useState(new Set());
  const [highlightedRelationships, setHighlightedRelationships] = useState(new Set());

  const options = {
    width: `${width}px`,
    height: `${height}px`,
    autoResize: true,
    layout: {
      hierarchical: {
        enabled: false, // Automatically organize the network into layers...
        direction: "LR", // ...from left to right (LR)
      }
    },
    interaction: {
      zoomView: false, // Disable zooming
      dragNodes: true, // Disable dragging nodes
      dragView: false, // Disable dragging the viewport
      hover: true, // Change appearance of nodes on hover
      selectConnectedEdges: false, // When a node is selected, do not select its connected edges
      multiselect: false, // Do not allow multiple nodes or edges to be selected
    },
    edges: {
      arrows: {
        to: false, // Make edges undirected
      },
      chosen: false, // Do not change appearance of nodes when selected because we are using custom selection logic
      font: {
        background: "white",
        size: 10
      }
    },
    nodes: {
      shape: "box",
      color: COLOR.DEFAULT,
      chosen: false // Do not change appearance of nodes when selected because we are using custom selection logic
    }
  };

  function isEdgeInSet(edge, edgeSet) {
    const [a_from, a_to] = edge;
    for (const [b_from, b_to] of edgeSet) {
      if ((a_from === b_from && a_to === b_to) || (a_from === b_to && a_to === b_from)) {
        return true;
      }
    }
    return false;
  }

  // Update the set of authors that should be highlighted when necessary.
  // An author should be highlighted if:
  // - They are selected
  // - They are connected to a selected relationship
  // - They are hovered on
  // - They are connected to a hovered relationship
  useEffect(() => {
    const newHighlightedAuthors = new Set();
    if (selectedAuthor) {
      newHighlightedAuthors.add(selectedAuthor);
    }
    if (selectedRelationship) {
      newHighlightedAuthors.add(selectedRelationship[0]);
      newHighlightedAuthors.add(selectedRelationship[1]);
    }
    if (hoveredAuthor) {
      newHighlightedAuthors.add(hoveredAuthor);
    }
    if (hoveredRelationship) {
      newHighlightedAuthors.add(hoveredRelationship[0]);
      newHighlightedAuthors.add(hoveredRelationship[1]);
    }
    setHighlightedAuthors(newHighlightedAuthors);
  }, [selectedAuthor, selectedRelationship, hoveredAuthor, hoveredRelationship]);

  // Update the set of relationships that should be highlighted when necessary.
  // A relationship should be highlighted if:
  // - It is selected
  // - It is hovered on
  // - One of its endpoints is selected
  // - One of its endpoints is hovered on
  useEffect(() => {
    const newHighlightedRelationships = new Set();
    if (selectedRelationship) {
      newHighlightedRelationships.add(selectedRelationship.sort());
    }
    if (hoveredRelationship) {
      newHighlightedRelationships.add(hoveredRelationship.sort());
    }
    if (selectedAuthor) {
      data.forEach((letter) => {
        if (letter.sender === selectedAuthor || letter.recipient === selectedAuthor) {
          newHighlightedRelationships.add([letter.sender, letter.recipient]);
        }
      });
    }
    if (hoveredAuthor) {
      data.forEach((letter) => {
        if (letter.sender === hoveredAuthor || letter.recipient === hoveredAuthor) {
          newHighlightedRelationships.add([letter.sender, letter.recipient]);
        }
      });
    }
    setHighlightedRelationships(newHighlightedRelationships);
  }, [data, selectedAuthor, selectedRelationship, hoveredAuthor, hoveredRelationship]);

  // When the data or selection changes, recompute the graph
  useEffect(() => {
    const authors = getAuthors(data);
    const authorIdMap = new Map(authors.map((author, index) => [author, index]));

    function authorColorProvider(author) {
      if (highlightedAuthors.size > 0) {
        return highlightedAuthors.has(author) ? COLOR.HIGHLIGHTED : COLOR.DIMMED;
      }
      return COLOR.DEFAULT;
    }

    const nodes = authors.map((author) => ({
      id: authorIdMap.get(author),
      author: author,
      label: `${AUTHOR_ICON} ${author}`,
      color: authorColorProvider(author),
    }));

    const numLettersBetweenAuthors = getNumLettersBetweenAuthors(data);

    // Scale edge thickness based on the number of letters between the authors
    const thicknessScale = d3.scaleLinear()
      .domain(d3.extent(Array.from(numLettersBetweenAuthors.values())))
      .range([2, 10]);

    const sentimentMap = getSentimentBetweenAuthors(data);

    // Scale edge color based on sentiment
    const colorScale = d3.scaleDiverging(
      [0, 0.5, 1], // domain
      d3.interpolateRdYlGn // color scheme
    );

    // Scale edge length based on sentiment
    const lengthScale = d3.scaleLinear()
      .domain(d3.extent(Array.from(sentimentMap.values())))
      .range([500, 150]);

    function edgeColorProvider(from, to, sentiment) {
      const calculatedColor = colorScale(sentiment);
      if (highlightedRelationships.size > 0) {
        if (isEdgeInSet([from, to], highlightedRelationships)) {
          return calculatedColor;
        } else {
          return COLOR.DIMMED;
        }
      }
      return calculatedColor;
    }

    function numLettersLabelProvider(n) {
      if (n === 1) {
        return "1 letter";
      }
      return `${n} letters`;
    }

    function edgeLabelProvider(from, to, n, sentiment) {
      const letters = numLettersLabelProvider(n);
      const label = `${letters}\n${sentiment.toFixed(2)}%`;
      if (highlightedRelationships.size > 0) {
        return isEdgeInSet([from, to], highlightedRelationships) ? label : "";
      }
    }

    const edges = [];
    numLettersBetweenAuthors.forEach((n, key) => {
      const [from, to] = key.split(",");
      const sentiment = sentimentMap.get(key);
      edges.push({
        from: authorIdMap.get(from),
        to: authorIdMap.get(to),
        label: edgeLabelProvider(from, to, n, sentiment),
        width: thicknessScale(n),
        color: edgeColorProvider(from, to, sentiment),
        length: lengthScale(sentiment),
      });
    });

    const graph = { nodes, edges };
    setGraph(graph);
    setNodesDataSet(new DataSet(nodes));
    setEdgesDataSet(new DataSet(edges));

  }, [data, highlightedAuthors, highlightedRelationships]);

  function onSelectionChange({ nodes, edges }) {
    if (nodes.length > 0) {
      // Resolve the author name from the node ID using the NodesDataSet
      const selectedNode = nodesDataSet.get(nodes[0]);
      setSelectedAuthor(selectedNode.author);
    } else {
      setSelectedAuthor(null);
    }
    if (edges.length > 0) {
      const selectedEdge = edgesDataSet.get(edges[0]);
      const from = nodesDataSet.get(selectedEdge.from).author;
      const to = nodesDataSet.get(selectedEdge.to).author;
      setSelectedRelationship([from, to]);
    } else {
      setSelectedRelationship(null);
    }
  }

  function onHoverNode({ node }) {
    if (node !== undefined) {
      const hoveredNode = nodesDataSet.get(node);
      setHoveredAuthor(hoveredNode.author);
      setCursor(CURSOR.POINTER);
    } else {
      setHoveredAuthor(null);
    }
  }

  function onHoverEdge({ edge }) {
    if (edge !== undefined) {
      const hoveredEdge = edgesDataSet.get(edge);
      const from = nodesDataSet.get(hoveredEdge.from).author;
      const to = nodesDataSet.get(hoveredEdge.to).author;
      setHoveredRelationship([from, to]);
      setCursor(CURSOR.POINTER);
    } else {
      setHoveredRelationship(null);
    }
  }

  function onLeaveNode() {
    setHoveredAuthor(null);
    setCursor(CURSOR.DEFAULT);
  }

  function onLeaveEdge() {
    setHoveredRelationship(null);
    setCursor(CURSOR.DEFAULT);
  }

  const events = {
    // When a node or edge is selected, update the selection state and rendering
    select: onSelectionChange,
    // Change the cursor when hovering over nodes and edges
    hoverNode: onHoverNode,
    hoverEdge: onHoverEdge,
    // Reset the cursor when leaving nodes and edges
    blurNode: onLeaveNode,
    blurEdge: onLeaveEdge
  };
  
  return (
    <div style={{ cursor: cursor, height: '100%', width: '100%' }}>
      <Graph
        graph={graph}
        options={options}
        events={events}
      />
    </div>
  );
};

export default NetworkGraph;