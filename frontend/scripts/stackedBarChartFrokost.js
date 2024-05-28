function stackedBarChart2() {
    const margin = { top: 80, right: 20, bottom: 50, left: 120 };
    const width = 450 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;
  
    // append the svg object to the body of the page
    const svg = d3
      .select("#inner8")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 450 350")
      .attr("preserveAspectRatio", "xMinYMin")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // parse the Data
    d3.csv("klimadatabase2.csv")
      .then(function (data) {
        // Ensure all columns are correctly read
        data.forEach((d) => {
          d.Landbrug = +d.Landbrug;
          d.ILUC = +d.ILUC;
          d.Forarbejdning = +d.Forarbejdning;
          d.Emballage = +d.Emballage;
          d.Transport = +d.Transport;
          d.Detail = +d.Detail;
        });
  
        // list of value keys
        const typeKeys = [
          "Landbrug",
          "ILUC",
          "Forarbejdning",
          "Emballage",
          "Transport",
          "Detail",
        ];
  
        // stack the data
        const stack = d3
          .stack()
          .keys(typeKeys)
          .order(d3.stackOrderNone)
          .offset(d3.stackOffsetNone);
        const stackedData = stack(data);
  
        // X scale and Axis
        const formater = d3.format(".1s");
        const xScale = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d3.sum(typeKeys, (key) => d[key]))])
          .range([0, width]);
        const xAxis = svg
          .append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(
            d3
              .axisBottom(xScale)
              .ticks(7)
              .tickSize(0)
              .tickPadding(6)
              .tickFormat(formater)
          );
        xAxis.select(".domain").remove();
  
        // Y scale and Axis
        const yScale = d3
          .scaleBand()
          .domain(data.map((d) => d.Produkt))
          .range([0, height])
          .padding(0.2);
        svg.append("g").call(d3.axisLeft(yScale).tickSize(0).tickPadding(8));
  
        // color palette
        const color = d3
          .scaleOrdinal()
          .domain(typeKeys)
          .range([
            "#0072BC",
            "#18375F",
            "#EF4A60",
            "#984ea3",
            "#ff7f00",
            "#ffff33",
            "#a65628",
          ]);
  
        // set horizontal grid line
        svg
          .append("g")
          .attr("class", "grid")
          .call(
            d3
              .axisLeft(yScale)
              .tickSize(-width)
              .tickFormat("")
              .tickValues(yScale.domain().filter((d, i) => !(i % 1)))
          ); // Ensuring grid lines for each band
  
        // create a tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("id", "chart-tooltip")
          .attr("class", "tooltip")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("background-color", "white")
          .style("border", "solid")
          .style("border-width", "1px")
          .style("border-radius", "5px")
          .style("padding", "10px");
  
        // tooltip events
        const mouseover = function (event, d) {
          tooltip.style("opacity", 1);
          d3.select(this).style("opacity", 0.7);
        };
  
        const mousemove = function (event, d) {
          tooltip
            .html(`Value: ${d3.format(",")(d[1] - d[0])}`)
            .style("left", event.pageX + 15 + "px")
            .style("top", event.pageY - 28 + "px");
        };
  
        const mouseleave = function (d) {
          tooltip.style("opacity", 0);
          d3.select(this).style("opacity", 1);
        };
  
        // create bars
        svg
          .append("g")
          .selectAll("g")
          .data(stackedData)
          .join("g")
          .attr("fill", (d) => color(d.key))
          .selectAll("rect")
          .data((d) => d)
          .join("rect")
          .attr("x", (d) => xScale(d[0]))
          .attr("y", (d) => yScale(d.data.Produkt))
          .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
          .attr("height", yScale.bandwidth())
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave);
  
        // set title
        svg
          .append("text")
          .attr("class", "chart-title")
          .attr("x", -margin.left * 0.9)
          .attr("y", -margin.top / 1.2)
          .attr("text-anchor", "start")
          .text("CO2 Emissions by Product");
  
        // set X axis label
        svg
          .append("text")
          .attr("class", "chart-label")
          .attr("x", width / 2)
          .attr("y", height + margin.bottom / 1.6)
          .attr("text-anchor", "middle")
          .text("CO2 Emissions (kg)");
  
        // set legend
        const legend = svg
          .append("g")
          .attr(
            "transform",
            `translate(${width / 2 - (typeKeys.length / 3) * 60}, ${
              -margin.top / 1.5
            })`
          );
  
        const legendItems = legend
          .selectAll(".legend-item")
          .data(typeKeys)
          .enter()
          .append("g")
          .attr("class", "legend-item")
          .attr(
            "transform",
            (d, i) => `translate(${(i % 3) * 120}, ${Math.floor(i / 3) * 20})`
          );
  
        legendItems
          .append("rect")
          .attr("width", 13)
          .attr("height", 13)
          .style("fill", color);
  
        legendItems
          .append("text")
          .attr("x", 20)
          .attr("y", 10)
          .attr("dy", "0.32em")
          .text((d) => d);
      })
      .catch(function (error) {
        console.error("Error loading or parsing data:", error);
      });
  }
  
  stackedBarChart2();
  