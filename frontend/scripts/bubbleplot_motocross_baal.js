// Add legend: circles
let valuesToShow = [10, 50, 100]
let yCircle = 410
function xCircle(i) {
    if(i == 0) {
    return "58%"
    } else if (i == 1) {
    return "42%"
    }
  };
function yLabel() {
  return yCircle + 100
  } 
function yLabel2(i) {
    if (i == 0) {
      return yCircle - 280
    } else if (i == 1) {
      return yCircle - 280
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
    // Der bruges ca. 11.5 l benzin til én motocross-træning / 1000 for at få det i kg
    // Der går ca. 20 kg brænde til et bål og 5 spejdere deles om bålet / 1000 for at få det i kg
    valuesToShow = [(foods[9].gram_co2e_pr_unit*11.5/1000), (foods[8].gram_co2e_pr_unit*20/5/1000)]

    createBubbleChart();
  })

  .catch((error) => {
    console.error("Error:", error);
  });

// Herunder bygges bubblechartet - det er wrapped i en funktion, så den kan kaldes indeni i det scope, hvor arrayen "valuesToShow" ændres 
function createBubbleChart() {

  // append the svg object to the body of the page
  let heightGPT = 600
  let widthGPT = 800
  let svgGPT = d3.select("#inner12")
    .append("svg")
      .attr("width", widthGPT)
      .attr("height", heightGPT)

  // The scale you use for bubble size
  let size = d3.scaleSqrt()
    .domain([1, 50])  // What's in the data, let's say it is percentage
    .range([1, 180])  // Size in pixel


  // Define the pattern
  const patternStream = svgGPT.append("defs")
  .append("pattern")
    .attr("id", "MotoPattern")
    .attr("patternUnits", "objectBoundingBox")
    .attr("patternContentUnits", "userSpaceOnUse")
    .attr("width", 1)
    .attr("height", 1);

  // Add image to the pattern
  patternStream.append("image")
    .attr("href", "Images/Bonfire.png")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 95)
    .attr("height", 95);
  

  // Define the pattern
  const patternAI = svgGPT.append("defs")
  .append("pattern")
    .attr("id", "WoodPattern")
    .attr("patternUnits", "objectBoundingBox")
    .attr("patternContentUnits", "userSpaceOnUse")
    .attr("width", 1)
    .attr("height", 1);

  // Add image to the pattern
  patternAI.append("image")
    .attr("href", "Images/Motorcross.png")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 250)
    .attr("height", 250);

  
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
            return "url(#WoodPattern)";
          } else if (i == 1) {
            return "url(#MotoPattern)";
          }
      })
      .attr("stroke", "white")
      .attr("id", function(d, i) { return "bubble" + (i+1);});

    svgGPT.selectAll("#bubble2")
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
      .text( function(d){ return d + " kg co2e" } )
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
        .text(function(d, i){ if (i == 0) {return "Motocross"} else {return "Lejrbål"}})
        .style("font-size", 22)
        .style("font-family", "Fantasy") 
        .attr("fill", "white")
        .attr('alignment-baseline', 'middle');
    
};