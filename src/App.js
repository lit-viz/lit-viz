import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LETTERS } from './mockData';
import NetworkGraph from './NetworkGraph';

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
        <TimelinePlaceholder>
          Timeline
        </TimelinePlaceholder>
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
