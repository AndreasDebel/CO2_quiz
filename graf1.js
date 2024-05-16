// Fake data
var data = [
  {
    year: 2000,
    popularity: 50
  },
  {
    year: 2001,
    popularity: 150
  },
  {
    year: 2002,
    popularity: 200
  },
  {
    year: 2003,
    popularity: 130
  },
  {
    year: 2004,
    popularity: 240
  },
  {
    year: 2005,
    popularity: 380
  },
  {
    year: 2006,
    popularity: 420
  }
];

// Create SVG and padding for the chart
const svg = d3
  .select("#graf")
  .append("svg")
  .attr("height", 400)
  .attr("width", 800);
const margin = { top: 0, bottom: 20, left: 30, right: 20 };
const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;
const grp = chart
  .append("g")
  .attr("transform", `translate(-${margin.left},-${margin.top})`);

// Add empty scales group for the scales to be attached to on update 
chart.append("g").attr("class", "x-axis");
chart.append("g").attr("class", "y-axis");

// Add empty path
const path = grp
  .append("path")
  .attr("transform", `translate(${margin.left},0)`)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 1.5);

  const path2 = grp
  .append("path")
  .attr("transform", `translate(${margin.right},0)`)
  .attr("fill", "none")
  .attr("stroke", "red")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 1.5);

function updateScales(data) {
  // Create scales
  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, dataPoint => dataPoint.popularity)]);
  const xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain(d3.extent(data, dataPoint => dataPoint.year));
  return { yScale, xScale };
}

function createLine(xScale, yScale) {
  return d3
  .line()
  .x(dataPoint => xScale(dataPoint.year))
  .y(dataPoint => yScale(dataPoint.popularity));
}

function updateAxes(chart, xScale, yScale) {
  chart
    .select(".x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(data.length));
  chart
    .select(".y-axis")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisLeft(yScale));
}

function updatePath(data, line) {
  const updatedPath = d3
    .select("path")
    .interrupt()
    .datum(data)
    .attr("d", line);

    

  const pathLength = updatedPath.node().getTotalLength();
  // D3 provides lots of transition options, have a play around here:
  // https://github.com/d3/d3-transition
  const transitionPath = d3
    .transition()
    .ease(d3.easeSin)
    .duration(7000);
  updatedPath
    .attr("stroke-dashoffset", pathLength)
    .attr("stroke-dasharray", pathLength)
    .transition(transitionPath)
    .attr("stroke-dashoffset", 0);
}

function updatePath2(data, line) {
  const updatedPath = d3
    .select("path")
    .interrupt()
    .datum(data)
    .attr("d", line);

    

  const pathLength = updatedPath.node().getTotalLength();
  // D3 provides lots of transition options, have a play around here:
  // https://github.com/d3/d3-transition
  const transitionPath = d3
    .transition()
    .ease(d3.easeSin)
    .duration(7000);
  updatedPath
    .attr("stroke-dashoffset", pathLength)
    .attr("stroke-dasharray", pathLength)
    .transition(transitionPath)
    .attr("stroke-dashoffset", 0);
}

function initChart() {
  const { yScale, xScale } = updateScales(data);
  updateAxes(chart, xScale, yScale);
}

function updateChart() {
  const { yScale, xScale } = updateScales(data);
  const line = createLine(xScale, yScale);
  updatePath(data, line);
  updatePath2(data, line);
}

// Initial setup: render the axes
initChart();

// Update chart when button is clicked
d3.select("#knap2").on("click", () => {
  updateChart();
});
