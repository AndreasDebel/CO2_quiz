const transportData = [
    {"transport": "EL-Cykel", "co2": 14},
    {"transport": "Tog", "co2": 28},
    {"transport": "EL-Bil", "co2": 47},
    {"transport": "Motorcykel", "co2": 113},
    {"transport": "Benzin Bil", "co2": 170},
    {"transport": "Diesel Bil", "co2": 171},
    {"transport": "Fly", "co2": 246},
    {"transport": "Krydstogtskib", "co2": 250}
  ];
  
  const chartWidth = 900;
  const chartHeight = 550;
  const chartMargin = {top: 20, right: 50, bottom: 40, left: 60};
  
  const chartSvg = d3.select("#test")
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .append("g")
      .attr("transform", `translate(${chartMargin.left},${chartMargin.top})`);
  
  const y = d3.scaleBand()
      .domain(transportData.map(d => d.transport))
      .range([0, chartHeight - chartMargin.top - chartMargin.bottom])
      .padding(0.1);
  
  const x = d3.scaleLinear()
      .domain([0, d3.max(transportData, d => d.co2)])
      .range([0, chartWidth - chartMargin.left - chartMargin.right]);
  
  chartSvg.append("g")
      .attr("transform", `translate(0,${chartHeight - chartMargin.top - chartMargin.bottom})`)
      .call(d3.axisBottom(x));
  
  chartSvg.append("g")
      .call(d3.axisLeft(y));
  
  const bars = chartSvg.selectAll(".bar")
      .data(transportData)
      .enter().append("g");
  
  bars.append("rect")
      .attr("class", "bar")
      .attr("y", d => y(d.transport))
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", d => x(d.co2));
  
  bars.append("text")
      .attr("class", "label")
      .attr("y", d => y(d.transport) + y.bandwidth() / 2)
      .attr("x", d => x(d.co2) + 3) // Lille offset fra enden af baren
      .attr("dy", ".35em") // Vertikal justering for at centrere teksten i baren
      .text(d => d.co2)
      .style("font-size", "20px")
      .style("fill", "white");

// Første linje
chartSvg.append("text")
    .attr("x", (650))
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .style("font-size", "35px")
    .style("font-weight", "bold")
    .style("fill", "white")
    .text("Gram CO₂-udledning");

// Anden linje
chartSvg.append("text")
    .attr("x", (650))
    .attr("y", 80) // Juster Y for at placere den under den første linje
    .attr("text-anchor", "middle")
    .style("font-size", "35px")
    .style("font-weight", "bold")
    .style("fill", "white")
    .text("pr. kilometer");
