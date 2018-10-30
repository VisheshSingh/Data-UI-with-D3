// select the svg container
const svg = d3.select("svg");

// Create a linear scale
const y = d3
  .scaleLinear()
  .domain([0, 1000])
  .range([0, 500]);

console.log(y(900));
console.log(y(0));
console.log(y(500));
// Get external json
d3.json("menu.json").then(data => {
  // build rects
  const rects = svg.selectAll("rect").data(data);

  // apply attrs to rect in DOM
  rects
    .attr("width", 50)
    .attr("height", d => y(d.orders))
    .attr("x", (d, i) => i * 70)
    .attr("fill", "orange");

  // add enter selection to DOM
  rects
    .enter()
    .append("rect")
    .attr("width", 50)
    .attr("height", d => y(d.orders))
    .attr("x", (d, i) => i * 70)
    .attr("fill", "orange");
});
