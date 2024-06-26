function stackedBarChart() {
    const margin = { top: 80, right: 20, bottom: 50, left: 120 };
    const width = 450 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#inner2")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 450 350")
        .attr("preserveAspectRatio", "xMinYMin")
        .attr("id", "unique1SVG") // unique ID for the SVG
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // parse the Data
    d3.csv("klimadatabase1.csv").then(function (data) {
        // Ensure all columns are correctly read
        data.forEach(d => {
            d.Landbrug = +d.Landbrug;
            d.ILUC = +d.ILUC;
            d.Forarbejdning = +d.Forarbejdning;
            d.Emballage = +d.Emballage;
            d.Transport = +d.Transport;
            d.Detail = +d.Detail;
        });

        // list of value keys
        const typeKeys = ["Landbrug", "ILUC", "Forarbejdning", "Emballage", "Transport", "Detail"];

        // stack the data
        const stack = d3.stack()
            .keys(typeKeys)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);
        const stackedData = stack(data);

        // X scale and Axis
        const formater = d3.format(".1s");
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d3.sum(typeKeys, key => d[key]))])
            .range([0, width]);
        const xAxis = svg.append('g')
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).ticks(7).tickSize(0).tickPadding(6).tickFormat(formater));
        xAxis.select(".domain").remove();

        // Y scale and Axis
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.Produkt))
            .range([0, height])
            .padding(.2);
        svg.append('g')
            .call(d3.axisLeft(yScale).tickSize(0).tickPadding(8));

        // color palette
        const color = d3.scaleOrdinal()
            .domain(typeKeys)
            .range(['#87d7ff', '#52adf7', '#0072BC', '#3f5c9e', '#191c70', '#18375F', '#87d7ff']);

        // set horizontal grid line
        svg.append("g")
            .attr("class", "grid")
            .call(d3.axisLeft(yScale)
                .tickSize(-width)
                .tickFormat("")
                .tickValues(yScale.domain().filter((d, i) => !(i % 1)))); // Ensuring grid lines for each band

        // create a tooltip
        const tooltip = d3.select("body")
            .append("div")
            .attr("id", "uniqueTooltip") // unique ID for the tooltip
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("opacity", 0)
            .style("background-color", "white")
            .style("border", "solid 1px")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("pointer-events", "none")
            .style("color", "black"); // Ensuring the text color is visible

        // tooltip events
        const mouseover = function () {
            tooltip.style("opacity", .8);
            d3.select(this).style("opacity", .5);
        };
        const mousemove = function (event, d) {
            const formater = d3.format(",");
            tooltip
                .html(`${formater(d[1] - d[0])}`) // Adjusted to show the segment value
                .style("top", (event.pageY - 30) + "px")
                .style("left", (event.pageX + 10) + "px");
        };
        const mouseleave = function () {
            tooltip.style("opacity", 0);
            d3.select(this).style("opacity", 1);
        };

        // create bars
        svg.append("g")
            .selectAll("g")
            .data(stackedData)
            .join("g")
            .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", d => xScale(d[0]))
            .attr("y", d => yScale(d.data.Produkt))
            .attr("width", d => xScale(d[1]) - xScale(d[0]))
            .attr("height", yScale.bandwidth())
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

        // set title
        svg.append("text")
            .attr("class", "chart-title")
            .attr("x", -(margin.left) * 0.9)
            .attr("y", -(margin.top) / 1.2)
            .attr("text-anchor", "start")
            .text("CO2 Emissioner for forskellige madvarer.")
            .style("fill", "white");

        // set X axis label
        svg.append("text")
            .attr("class", "chart-label")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom / 1.6)
            .attr("text-anchor", "middle")
            .text("CO2 Emissioner (kg)")
            .style("fill", "white");

        // set legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width / 2 - (typeKeys.length / 3) * 77}, ${-margin.top / 2})`);

        const legendItems = legend.selectAll(".legend-item")
            .data(typeKeys)
            .enter()
            .append("g")
            .attr("class", "legend-item")
            .attr("transform", (d, i) => `translate(${(i % 3) * 100}, ${Math.floor(i / 3) * 20})`);

        legendItems.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", color);

        legendItems.append("text")
            .attr("x", 20)
            .attr("y", 5)
            .attr("dy", "0.32em")
            .text(d => d)
            .style("fill", "white")
            .style("font-size", "12px");

        // create info box
        const infoBox = d3.select("#infoBox");

        // define legend information
        const legendInfo = {
            "Landbrug": "Landbrug: Dette refererer til emissioner fra landbrugsaktiviteter.",
            "ILUC": "ILUC: Emissioner fra ændringer i arealanvendelsen.",
            "Forarbejdning": "Forarbejdning: Emissioner fra forarbejdning.",
            "Emballage": "Emballage: Emissioner fra emballage.",
            "Transport": "Transport: Emissioner fra transport.",
            "Detail": "Detail: Emissioner fra detailhandel."
        };

        // info box events
        const legendMouseover = function (event, d) {
            infoBox.style("opacity", .8);
        };
        const legendMousemove = function (event, d) {
            infoBox
                .html(legendInfo[d])
                .style("top", (event.pageY - 30) + "px")
                .style("left", (event.pageX + 10) + "px");
        };
        const legendMouseleave = function () {
            infoBox.style("opacity", 0);
        };

        // attach info box events to legend items
        legendItems.on("mouseover", legendMouseover)
            .on("mousemove", legendMousemove)
            .on("mouseleave", legendMouseleave);

    }).catch(function(error) {
        console.error('Error loading or parsing data:', error);
    });
}

// Run the chart function
stackedBarChart();