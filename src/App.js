import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LETTERS } from './mockData';
import NetworkGraph from './NetworkGraph';
import Timeline from './Timeline';
import * as d3 from 'd3';

// Container that takes up the full height of the viewport, with no padding or margin, and places its children in a column
const FullHeightSeemlessColumnContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 0 !important;
  margin: 0 !important;
  height: 100vh;
  width: 100vh;
  max-height: 100vh !important;
  max-width: 100vw !important;
`;

// Generate data for the timeline, spanning from 1900 to 1930 with one datapoint for each quarter
const timelineData = [];
for (let year = 1900; year <= 1930; year++) {
  for (let month = 1; month <= 12; month++) {
    timelineData.push({
      date: new Date(`${year}-${month}-01`),
      a: Math.random() * 100,
      b: Math.random() * 100,
      c: Math.random() * 100,
    });
  }
}

const TIMELINE_HEIGHT = 200;

function App() {

  const [isLeftPanelOpen, setLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setRightPanelOpen] = useState(false);

  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedRelationship, setSelectedRelationship] = useState(null);

  const [data, setData] = useState(LETTERS);

  // The left panel should be open when there is a selected author
  useEffect(() => {
    if (selectedAuthor) {
      setLeftPanelOpen(true);
    } else {
      setLeftPanelOpen(false);
    }
  }, [selectedAuthor]);

  // The right panel should be open when there is a selected relationship
  useEffect(() => {
    if (selectedRelationship) {
      setRightPanelOpen(true);
    } else {
      setRightPanelOpen(false);
    }
  }, [selectedRelationship]);
  
  // Timeline selection
  const [timeSelection, setTimeSelection] = useState(d3.extent(timelineData, d => d.date));

  const LeftPanel = () => (
    <Offcanvas show={isLeftPanelOpen} onHide={() => setLeftPanelOpen(false)} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Left Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder
        </Offcanvas.Body>
      </Offcanvas>
  );

  const RightPanel = () => (
    <Offcanvas show={isRightPanelOpen} onHide={() => setRightPanelOpen(false)} placement="end" backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Right Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder
        </Offcanvas.Body>
      </Offcanvas>
  );

  const html = document.documentElement;

  // Get the width of the window and update it when the window is resized
  const [windowWidth, setWindowWidth] = useState(html.clientWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(html.clientWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  });

  // Get the height of the window and update it when the window is resized
  const [windowHeight, setWindowHeight] = useState(html.clientHeight);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(html.clientHeight);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  });

  return (
    <>
      <LeftPanel />
      <RightPanel />
      <FullHeightSeemlessColumnContainer>
        <Timeline
          data={timelineData}
          width={windowWidth}
          height={TIMELINE_HEIGHT}
          selection={timeSelection}
          setSelection={setTimeSelection}
        />
        <NetworkGraph
          data={data}
          selectedAuthorState={{ selectedAuthor, setSelectedAuthor }}
          selectedRelationshipState={{ selectedRelationship, setSelectedRelationship }}
          width={windowWidth}
          height={windowHeight - TIMELINE_HEIGHT}
        />
      </FullHeightSeemlessColumnContainer>
    </>
    
  );
}

export default App;
