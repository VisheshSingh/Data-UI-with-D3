// select the svg container
const svg = d3.select("svg");

// Get external json
d3.json("menu.json").then(data => {
  // Create a linear scale
  const y = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([0, 500]);

  // create a band scale
  const x = d3
    .scaleBand()
    .domain(data.map(item => item.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  // build rects
  const rects = svg.selectAll("rect").data(data);

  // apply attrs to rect in DOM
  rects
    .attr("width", x.bandwidth)
    .attr("height", d => y(d.orders))
    .attr("x", d => x(d.name))
    .attr("fill", "orange");

  // add enter selection to DOM
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", d => y(d.orders))
    .attr("x", d => x(d.name))
    .attr("fill", "orange");
});
