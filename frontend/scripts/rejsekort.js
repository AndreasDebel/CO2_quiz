// Select the SVG element and set dimensions
var uniqueSvg = d3.select("#uniqueSvg"),
    uniqueWidth = +uniqueSvg.attr("width"),
    uniqueHeight = +uniqueSvg.attr("height");

// Create the projection
var projection = d3.geoMercator()
    .scale(180)
    .translate([uniqueWidth / 2, uniqueHeight / 2 * 1.3]);

// Create data for the links
var link = [
    { type: "LineString", coordinates: [[-80.1918, 25.7617], [10, 56]], transportmiddel: "Fly", rejsested: "København til Miami", fact: "10 timer og 20 minutter.", co2: "1930 kg"},
    { type: "LineString", coordinates: [[2.1686, 41.3874], [10, 56]], transportmiddel: "Bil", rejsested: "København til Barcelona", fact: "23 timer og 23 minutter.", co2: "359 kg"},
    { type: "LineString", coordinates: [[24.9384, 60.1699], [10, 56]], transportmiddel: "Færge og Bil", rejsested: "København til Helsinki", fact: "18 timer og 7 minutter.", co2: "208 kg"}
];

// Create the path generator
var path = d3.geoPath()
    .projection(projection);

// Load and draw the world map
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data) {
    // Draw the map
    uniqueSvg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("fill", "white")
        .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#fff")
        .style("stroke-width", 0);

    // Add the paths
    uniqueSvg.selectAll("myPath")
        .data(link)
        .enter()
        .append("path")
        .attr("d", function(d) { return path(d); })
        .style("fill", "none")
        .style("stroke", "#2389e3e6")
        .style("stroke-width", 5)
        .on("mouseover", function(event, d) {
            // Show the fact box and set its content
            d3.select("#factBox")
                .style("visibility", "visible")
                .html("<div><strong>" + d.rejsested + "</strong><br><strong>Transportmiddel:</strong> " + d.transportmiddel + "<br><strong>Rejsetid:</strong> " + d.fact + "<br><strong>CO2-udledning:</strong> " + d.co2 + "</div>");
        })
        .on("mousemove", function(event) {
            var container = d3.select("#uniqueSvg").node().getBoundingClientRect();
            // Update the position of the fact box as the mouse moves
            d3.select("#factBox")
                .style("top", (event.clientY - container.top + -120) + "px")
                .style("left", (event.clientX - container.left + 80) + "px");
        })
        .on("mouseout", function() {
            // Hide the fact box
            d3.select("#factBox")
                .style("visibility", "hidden");
        });

}).catch(function(error) {
    console.log(error);
});
