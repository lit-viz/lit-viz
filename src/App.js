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

// Handle on the left side of the screen that opens an offcanvas
const OffcanvasHandle = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(100%, -50%);
  background-color: #f8f9fa;
  padding: 0.5rem;
  border-radius: 0 0.25rem 0.25rem 0;
  border: 1px solid #ced4da;
  border-right: 0;
  cursor: pointer;
  z-index: 1051;
`;

function App() {

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder
        </Offcanvas.Body>
        <OffcanvasHandle onClick={handleShow}>
        &gt;
        </OffcanvasHandle>
      </Offcanvas>
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
