// Add legend: circles
let valuesToShow = [10, 50, 100]
let xCircle = 230
let xLabel = 380
let yCircle = 330



// Specify the API endpoint for food
const apiUrlGPT = "http://localhost:4000/emission";

// Make a GET request using the Fetch API
fetch(apiUrlGPT)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  // opdater valuesToShow med emittors
  .then((foods) => {
    valuesToShow = [];
    valuesToShow = [(foods[11].gram_co2e_pr_unit*5*90), (foods[10].gram_co2e_pr_unit*1.5)]
    console.log(valuesToShow);

    createBubbleChart();
  })

  .catch((error) => {
    console.error("Error:", error);
  });

console.log(valuesToShow)


// Herunder bygges bubblechartet - det er wrapped i en funktion, så den kan kaldes indeni i det scope, hvor arrayen "valuesToShow" ændres 
function createBubbleChart() {

  // append the svg object to the body of the page
  let heightGPT = 460
  let widthGPT = 460
  let svgGPT = d3.select("#inner3")
    .append("svg")
      .attr("width", widthGPT)
      .attr("height", heightGPT)

  // The scale you use for bubble size
  let size = d3.scaleSqrt()
    .domain([1, 1000])  // What's in the data, let's say it is percentage
    .range([1, 180])  // Size in pixel



  svgGPT
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("circle")
      .attr("cx", xCircle)
      .attr("cy", function(d){ return yCircle - size(d) } )
      .attr("r", function(d){ return size(d) })
      .style("fill", "none")
      .attr("stroke", "black")

  // Add legend: segments
  svgGPT
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("line")
      .attr('x1', function(d){ return xCircle + size(d) } )
      .attr('x2', xLabel)
      .attr('y1', function(d){ return yCircle - size(d) } )
      .attr('y2', function(d){ return yCircle - size(d) } )
      .attr('stroke', 'black')
      .style('stroke-dasharray', ('2,2'))

  // Add legend: labels
  svgGPT
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("text")
      .attr('x', xLabel)
      .attr('y', function(d){ return yCircle - size(d) } )
      .text( function(d){ return d } )
      .style("font-size", 10)
      .attr('alignment-baseline', 'middle')

};