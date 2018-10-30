// select the svg container
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

// create margins and dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append("g");

// Get external json
d3.json("menu.json").then(data => {
  // Create a linear scale
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.orders)])
    .range([0, graphHeight]);

  // create a band scale
  const x = d3
    .scaleBand()
    .domain(data.map(item => item.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  // build rects
  const rects = graph.selectAll("rect").data(data);

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

  //create and call the axes
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
});
