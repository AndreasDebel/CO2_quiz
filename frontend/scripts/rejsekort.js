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
    { type: "LineString", coordinates: [[-80.1918, 25.7617], [10, 56]], fact: "Link from Miami to a point in the north." },
    { type: "LineString", coordinates: [[2.1686, 41.3874], [10, 56]], fact: "Link from Barcelona to a point in the north." },
    { type: "LineString", coordinates: [[24.9384, 60.1699], [10, 56]], fact: "Link from Helsinki to a point in the north." }
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
        .attr("fill", "#b8b8b8")
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
        .style("stroke", "orange")
        .style("stroke-width", 3)
        .on("mouseover", function(event, d) {
            // Show the fact box and set its content
            d3.select("#factBox")
                .style("visibility", "visible")
                .html("<strong>Fact:</strong> " + d.fact);
        })
        .on("mouseout", function() {
            // Hide the fact box
            d3.select("#factBox")
                .style("visibility", "hidden");
        });

}).catch(function(error) {
    console.log(error);
});
