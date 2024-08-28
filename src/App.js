import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';

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

function App() {

  const [isLeftPanelOpen, setLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setRightPanelOpen] = useState(true);

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

  return (
    <>
      <LeftPanel />
      <RightPanel />
      <FullHeightSeemlessColumnContainer>
        <TimelinePlaceholder>
          Timeline
        </TimelinePlaceholder>
        <NetworkGraphPlaceholder>
          Network Graph
        </NetworkGraphPlaceholder>
      </FullHeightSeemlessColumnContainer>
    </>
    
  );
}

export default App;
