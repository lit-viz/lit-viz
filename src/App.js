import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
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

const TimelinePlaceholder = styled.div`
  height: 200px; // Fixed height for the timeline
  background-color: #969696;
  
  // for the placeholder text:
  text-align: center;
  line-height: 200px;
`;

const NetworkGraphPlaceholder = styled.div`
  flex-grow: 1; // Take up remaining space left over from timeline
  background-color: #d4d4d4;

  // for the placeholder text:
  text-align: center;
  // vertically align the placeholder text
  display: flex;
  justify-content: center;
  align-items: center;
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

function App() {

  const [isLeftPanelOpen, setLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setRightPanelOpen] = useState(false);

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

  const TimeSelection = () => (
    <div>
      <p>Selected time range:</p>
      <p>{timeSelection[0].toDateString()} to {timeSelection[1].toDateString()}</p>
    </div>
  );

  return (
    <>
      <LeftPanel />
      <RightPanel />
      <FullHeightSeemlessColumnContainer>
        <Timeline
          data={timelineData}
          width={windowWidth}
          height={200}
          selection={timeSelection}
          setSelection={setTimeSelection}
        />
        <TimeSelection />
        <NetworkGraphPlaceholder>
          Network Graph
        </NetworkGraphPlaceholder>
      </FullHeightSeemlessColumnContainer>
    </>
    
  );
}

export default App;
