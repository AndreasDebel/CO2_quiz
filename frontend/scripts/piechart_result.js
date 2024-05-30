// set the dimensions and margins of the graph
const widthPie = 500,
    heightPie = 500,
    marginPie = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radiusPie = Math.min(widthPie, heightPie) / 2 - marginPie;

// append the svg object to the div called 'my_dataviz'
const svgPie = d3.select("#piechart")
  .append("svg")
    .attr("width", widthPie)
    .attr("height", heightPie)
  .append("g")
    .attr("transform", `translate(${widthPie/2}, ${heightPie/2})`);

// create 2 data_set
let piedata1 = {a: 9, b: 20, c:30, d:8, e:12}
let piedata2 = {}
let piedata3 = {}

// set the color scale
const color = d3.scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f", "g", "h"])
  .range(d3.schemeDark2);

// Create a tooltip
const tooltipPie = d3.select("#tooltipPie");

// A function that create / update the plot for a given variable:
function update(data) {

  // Compute the position of each group on the pie:
  const pie = d3.pie()
    .value(function(d) {return d[1]; })
    .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  const data_ready = pie(Object.entries(data))


  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radiusPie);

  // map to data
  const u = svgPie.selectAll("path")
    .data(data_ready)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  u
    .join('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radiusPie)
    )
    .attr('fill', function(d){ return(color(d.data[0])) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)
    .on("mouseover", function(event, d) {
        tooltipPie.transition()
               .duration(200)
               .style("opacity", .9);
        tooltipPie.html(`${d.data[1]/1000} kg CO2`)
               .style("left", (event.pageX + 5) + "px")
               .style("top", (event.pageY - 28) + "px");
      })
    .on("mouseout", function(d) {
    tooltipPie.transition()
            .duration(500)
            .style("opacity", 0);
    })
    .transition()
    .duration(1000)
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radiusPie)
    );

    // Remove existing labels
  svgPie.selectAll("text").remove();

  // Add labels
  svgPie.selectAll("text")
    .data(data_ready)
    .enter()
    .append("text")
    .text(function(d) {switch (d.data[0]) {
        case 'a': return "Morgenmad";
        break;
        case 'b': return "Bad";
        break;
        case 'c': return "Transport";
        break;
        case 'd': return "Frokost";
        break;
        case 'e': return "Ferie";
        break;
        case 'f': return "Hobby";
        break;
        case 'g': return "Aftensmad";
        break;
        case 'h': return "Aftenhygge";
        break;
    } ; })
    .attr("transform", function(d) {
        const pos = arc.centroid(d);
        const offset = 10; // Adjust the offset for the labels
        const angle = (d.startAngle + d.endAngle) / 2;
        const x = (radiusPie + offset) * Math.cos(angle - Math.PI / 2);
        const y = (radiusPie + offset) * Math.sin(angle - Math.PI / 2);
        return `translate(${x}, ${y})`;
      })
      .style("text-anchor", function(d) {
        const angle = (d.startAngle + d.endAngle) / 2;
        return (angle > Math.PI) ? "end" : "start";
      })
      .style("fill", "white")
      .style("font-size", "12px");

}

// Initialize the plot with the first dataset
update(piedata2)
