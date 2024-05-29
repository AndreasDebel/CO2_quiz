// Add legend: circles
let valuesToShow = [10, 50, 100]
let yCircle = 410
function xCircle(i) {
    if(i == 0) {
    return "60%"
    } else if (i == 1) {
    return "40%"
    }
  };
function yLabel() {
  return yCircle + 100
  } 
function yLabel2(i) {
    if (i == 0) {
      return yCircle - 280
    } else if (i == 1) {
      return yCircle - 320
    }
  } 




// Specify the API endpoint for food
const apiUrlGPT = "https://co2-quiz-1.onrender.com/emission";

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
    valuesToShow = [(foods[11].gram_co2e_pr_unit*5*90/2), (foods[10].gram_co2e_pr_unit*1.5)]
    // console.log(valuesToShow);

    createBubbleChart();
  })

  .catch((error) => {
    console.error("Error:", error);
  });

// console.log(valuesToShow)


// Herunder bygges bubblechartet - det er wrapped i en funktion, så den kan kaldes indeni i det scope, hvor arrayen "valuesToShow" ændres 
function createBubbleChart() {

  // append the svg object to the body of the page
  let heightGPT = 600
  let widthGPT = 800
  let svgGPT = d3.select("#inner16")
    .append("svg")
      .attr("width", widthGPT)
      .attr("height", heightGPT)

  // The scale you use for bubble size
  let size = d3.scaleSqrt()
    .domain([1, 1000])  // What's in the data, let's say it is percentage
    .range([1, 180])  // Size in pixel


  // Define the pattern
  const patternStream = svgGPT.append("defs")
  .append("pattern")
    .attr("id", "StreamPattern")
    .attr("patternUnits", "objectBoundingBox")
    .attr("patternContentUnits", "userSpaceOnUse")
    .attr("width", 1)
    .attr("height", 1);

  // Add image to the pattern
  patternStream.append("image")
    .attr("href", "Images/netflixIco.png")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 280)
    .attr("height", 280);
  

  // Define the pattern
  const patternAI = svgGPT.append("defs")
  .append("pattern")
    .attr("id", "AIPattern")
    .attr("patternUnits", "objectBoundingBox")
    .attr("patternContentUnits", "userSpaceOnUse")
    .attr("width", 1)
    .attr("height", 1);

  // Add image to the pattern
  patternAI.append("image")
    .attr("href", "Images/chatgptIcon.png")
  
    .attr("width", 240)
    .attr("height", 240);

  
  // (function() {console.log("hej")})();

    
  svgGPT
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("circle")
      .attr("cx", function(d, i){return xCircle(i); })
      // .attr("cx", function (d, i) {if(i == 0){return 400}else {return (100)}})
      .attr("cy", function(d){ return yCircle - size(d) } )
      .attr("r", function(d){ return size(d) })
      .style("fill", function(d, i) {
        if(i == 0){ 
            return "url(#AIPattern)";
          } else if (i == 1) {
            return "url(#StreamPattern)";
          }
      })
      .attr("stroke", "white")
      .attr("id", function(d, i) { return "bubble" + (i+1);});

    svgGPT.selectAll("#bubble1")
        .raise();


  // Add legend: segments
  svgGPT
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("line")
      .attr('x1', function(d, i){ return xCircle(i) } )
      .attr('x2', function(d, i){ return xCircle(i) } )
      .attr('y1', function(d){ return yCircle } )
      .attr('y2', function(d){ return yLabel() - 20 } )
      .attr('stroke', 'white')
      .style('stroke-dasharray', ('2,2'))

  // Add legend: labels
  svgGPT
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("text")
      .attr('x', function(d, i){ return xCircle(i)   } )
      .attr('x', function(d, i) { 
        var xPercentage = parseFloat(xCircle(i)); // Convert percentage string to number
        var containerWidth = parseFloat(svgGPT.style("width")); // Get the width of the SVG container as a number
        // Calculate the x coordinate to center the text horizontally and subtract 4 pixels
        return (containerWidth * xPercentage / 100) - 50; })
      .attr('y', function(d){ return yLabel() } )
      .text( function(d){ return d + " g co2e" } )
      .style("font-size", 22)
      .style("font-family", "Fantasy") 
      .attr("fill", "white")
      .attr('alignment-baseline', 'middle');

    // Add headlines
      svgGPT
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("text")
        .attr('x', function(d, i){ return xCircle(i)   } )
        .attr('x', function(d, i) { 
          var xPercentage = parseFloat(xCircle(i)); // Convert percentage string to number
          var containerWidth = parseFloat(svgGPT.style("width")); // Get the width of the SVG container as a number
          // Calculate the x coordinate to center the text
          // return (containerWidth * xPercentage / 100) - 50; })
          return (containerWidth * xPercentage / 100) - 50; })
        .attr('y', function(d, i){ return yLabel2(i) } )
        .text(function(d, i){ if (i == 0) {return "Chat med AI"} else {return "Streaming"}})
        .style("font-size", 22)
        .style("font-family", "Fantasy") 
        .attr("fill", "white")
        .attr('alignment-baseline', 'middle');
    
};