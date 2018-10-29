// select the svg container
const svg = d3.select("svg");

d3.json("planets.json").then(data => {
  const circle = svg.selectAll("circle").data(data);

  // add attrs to circle in DOM
  circle
    .attr("cx", d => d.distance)
    .attr("cy", 200)
    .attr("r", d => d.radius)
    .attr("fill", d => d.fill);

  // add enter selection to DOM
  circle
    .enter()
    .append("circle")
    .attr("cx", d => d.distance)
    .attr("cy", 200)
    .attr("r", d => d.radius)
    .attr("fill", d => d.fill);
});
