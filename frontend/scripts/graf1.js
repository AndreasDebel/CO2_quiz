// Fake data for two lines
var data2 = [
  { tid: 0, CO2e: 0 },
  { tid: 5, CO2e: 241 },
  { tid: 10, CO2e: 482 },
  { tid: 15, CO2e: 723 },
  { tid: 20, CO2e: 964 },
  { tid: 25, CO2e: 1205 },
  { tid: 30, CO2e: 1446 }
];
var data1 = [
  { tid: 0, CO2e: 0 },
  { tid: 5, CO2e: 10 },
  { tid: 10, CO2e: 20 },
  { tid: 15, CO2e: 30 },
  { tid: 20, CO2e: 40 },
  { tid: 25, CO2e: 50 },
  { tid: 30, CO2e: 60 }
];

// Create SVG and padding for the chart
const svg = d3.select("#graf")
  .append("svg")
  .attr("height", 400)
  .attr("width", 800);

const margin = { top: 0, bottom: 20, left: 40, right: 20 };
const chart = svg.append("g")
  .attr("transform", `translate(${margin.left},0)`);

const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;
const grp = chart.append("g")
  .attr("transform", `translate(-${margin.left},-${margin.top})`);

// Add empty scales group for the scales to be attached to on update 
chart.append("g").attr("class", "x-axis");
chart.append("g").attr("class", "y-axis");

// Add empty paths for two lines
const path1 = grp
   .append("path")
  .attr("transform", `translate(${margin.left},0)`)
  .attr("fill", "none")
  .attr("stroke", "DodgerBlue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 5);

const path2 = grp
   .append("path")
  .attr("transform", `translate(${margin.left},0)`)
  .attr("fill", "none")
  .attr("stroke", "red")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 5);

function updateScales(data1, data2) {
  const yMax = Math.max(d3.max(data1, d => d.CO2e), d3.max(data2, d => d.CO2e));
  const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, yMax]);

  const xScale = d3.scaleLinear()
      .range([0, width])
      .domain(d3.extent(data1, d => d.tid));

  return { yScale, xScale };
}

function createLine(xScale, yScale) {
  return d3.line()
      .x(d => xScale(d.tid))
      .y(d => yScale(d.CO2e));
}

function updateAxes(chart, xScale, yScale) {
  chart.select(".x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(8));

  chart.select(".y-axis")
      .attr("transform", `translate(0, 0)`)
      .call(d3.axisLeft(yScale).ticks(10));
}

function updatePath(path, data, line) {
  const updatedPath = path
      .interrupt()
      .datum(data)
      .attr("d", line);

  const pathLength = updatedPath.node().getTotalLength();
  const transitionPath = d3.transition()
      .ease(d3.easeSin)
      .duration(7000);

  updatedPath
      .attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      .transition(transitionPath)
      .attr("stroke-dashoffset", 0);
}

function addCircles(grp, data, xScale, yScale, color) {
  const circles = grp.selectAll(`circle.${color}`)
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.tid))
      .attr("cy", d => yScale(d.CO2e))
      .attr("r", 0)  // Start with radius 0 for the transition
      .attr("fill", color)
      .attr("class", color)
      .attr("transform", `translate(${margin.left},0)`)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .attr("r", 13);
        tooltip
          .transition()
          .style("opacity", 1);
        tooltip
          .html(`${d.tid} Minutter<br>CO2e: ${d.CO2e}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .transition()
          .attr("r", 10);
        tooltip
          .transition()
          .style("opacity", 0);
      });

  circles.transition()
      .ease(d3.easeSin)
      .duration(7000)
      .attr("r", 10);

  return circles;
}

function initChart() {
  const { yScale, xScale } = updateScales(data1, data2);
  updateAxes(chart, xScale, yScale);
}

function updateChart() {
  const { yScale, xScale } = updateScales(data1, data2);
  const line = createLine(xScale, yScale);
  updatePath(path1, data1, line);
  updatePath(path2, data2, line);

  // Remove existing circles
  grp.selectAll("circle.DodgerBlue").remove();
  grp.selectAll("circle.red").remove();

  // Add new circles
  addCircles(grp, data1, xScale, yScale, "DodgerBlue");
  addCircles(grp, data2, xScale, yScale, "red");
}

// Initial setup: render the axes
initChart();

// Add tooltip div
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("text-align", "center")
  .style("width", "80px")
  .style("height", "28px")
  .style("padding", "2px")
  .style("font", "12px sans-serif")
  .style("background", "lightsteelblue")
  .style("border", "0px")
  .style("border-radius", "8px")
  .style("pointer-events", "none")
  .style("opacity", 0)
  .style("color", "black"); // Add this line for black text


// Update chart when button is clicked
d3.select("#updateChartBtn").on("click", () => {
  updateChart();
});