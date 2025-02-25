import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Stack from 'react-bootstrap/Stack';

const X_AXIS_GROUP = 'x-axis';
const Y_AXIS_GROUP = 'y-axis';
const BRUSH_GROUP = 'brush';

function calculateNumTicks(data) {
  let max = 0;
  data.forEach(d => {
    const sum = Object.keys(d).reduce((acc, key) => {
      return key !== 'date' ? acc + d[key] : acc;
    }, 0);
    max = Math.max(max, sum);
  });
  return max;
}

const Timeline = ({ data, width: outerWidth, height: outerHeight, default_selection, selection, setSelection }) => {
  const svgRef = useRef(null);

  const getNonDateMax = (data) => {
    let max = 0;
    data.forEach(d => {
      // Sum all non-date values
      const sum = Object.keys(d).reduce((acc, key) => {
        return key !== 'date' ? acc + d[key] : acc;
      }, 0);
      max = Math.max(max, sum);
    });
    return max;
  }

  const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 25,
  }

  let tooltip = useRef(null);

  // Run once
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Create the axes
    svg.append("g").attr("class", X_AXIS_GROUP);
    svg.append("g").attr("class", Y_AXIS_GROUP);

    // Create brush
    svg.append("g").attr("class", BRUSH_GROUP);

    // Create tooltip
    tooltip.current = d3.select("body").append("div")
    .attr("class", "timeline-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "lightgray")
    .style("border", "1px solid #ccc")
    .style("padding", "5px")
    .style("border-radius", "4px")
    .style("box-shadow", "0 0 10px rgba(0,0,0,0.1)");
  });

  // On update
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const height = outerHeight - MARGINS.top - MARGINS.bottom;
    const width = outerWidth - MARGINS.left - MARGINS.right;

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([MARGINS.left, width-MARGINS.right]);

    const yScale = d3.scaleLinear()
      .domain([0, getNonDateMax(data)])
      .range([height-MARGINS.bottom, MARGINS.top]);

    // Stack the data
    const stack = d3.stack().keys(Object.keys(data[0]).filter(key => key !== 'date'));
    const series = stack(data);

    // Define the color scale
    const color = d3.scaleOrdinal()
      .domain(series.map(d => d.key))
      .range(d3.schemeTableau10);

    // Define the area
    const area = d3.area()
        .x(d => xScale(d.data.date))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]));

    // Draw the layers
    const layers = svg.selectAll("path.layer").data(series, d => d.key);
    layers.enter().append("path")
      .attr("class", "layer")
      .merge(layers) // Merge the entered elements with the existing ones
      .attr("fill", d => color(d.key))
      .attr("d", area)
      .on("mouseover", (event, d) => {
        tooltip.current.style("visibility", "visible")
          .text(d.key);
      })
      .on("mousemove", (event) => {
        tooltip.current.style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.current.style("visibility", "hidden");
      });
    
    // Remove any paths that no longer exist in the data
    layers.exit().remove();

    // Create the axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale)
      .ticks(calculateNumTicks(data))
      .tickFormat(d3.format("d")); // Format ticks as whole numbers

    // Draw the axes
    svg.select(`.${X_AXIS_GROUP}`)
      .attr("transform", `translate(0, ${height-MARGINS.bottom})`)
      .call(xAxis);
    svg.select(`.${Y_AXIS_GROUP}`)
      .attr("transform", `translate(${MARGINS.left}, 0)`)
      .call(yAxis);

    // Brush event handler function
    function brushed(event) {
      const newSelection = event.selection;
      // Handle the brush event here
      // For example, you could update another chart based on the selection
      // or filter data displayed on the current chart
      if (newSelection) {
        const [x0, x1] = newSelection.map(xScale.invert);
        setSelection([x0, x1]);
      } else {
        setSelection(default_selection);
      }
    }

    // Define the brush
    const brush = d3.brushX()
      .extent([[0, 0], [width, height]]) // Set the extent of the brush
      .on("brush end", brushed); // Define brush event handlers

    // Update the brush
    svg.select(`.${BRUSH_GROUP}`)
      .call(brush);

  }, [MARGINS.bottom, MARGINS.left, MARGINS.right, MARGINS.top, data, outerHeight, outerWidth, selection, setSelection]);

  return (
    <svg
      ref={svgRef}
      width={outerWidth}
      height={outerHeight}
      transform={`translate(${MARGINS.left}, ${MARGINS.top})`}
    />);
};

export default Timeline;