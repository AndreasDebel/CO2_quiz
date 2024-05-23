//Vælg SVG-elementet med den unikke id
var uniqueSvg = d3.select("#uniqueSvg"),
uniqueWidth = +uniqueSvg.attr("width"),
uniqueHeight = +uniqueSvg.attr("height");

// Kort og projektion
var projection = d3.geoMercator()
    .scale(180)
    .translate([uniqueWidth / 2, uniqueHeight / 2 * 1.3]);

// Opret data: koordinater for start og slut
var link = [
    { type: "LineString", coordinates: [[-80.1918, 25.7617], [10, 56]] },
    { type: "LineString", coordinates: [[2.1686, 41.3874], [10, 56]] },
    { type: "LineString", coordinates: [[24.9384, 60.1699], [10, 56]] }
];

// En sti generator
var path = d3.geoPath()
    .projection(projection);

// Hent verdensform
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data) {
    // Tegn kortet
    uniqueSvg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("fill", "#b8b8b8")
        .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#fff")
        .style("stroke-width", 0);

    // Tilføj stien
    uniqueSvg.selectAll("myPath")
        .data(link)
        .enter()
        .append("path")
        .attr("d", function(d) { return path(d); })
        .style("fill", "none")
        .style("stroke", "orange")
        .style("stroke-width", 3);

}).catch(function(error) {
    console.log(error);
});