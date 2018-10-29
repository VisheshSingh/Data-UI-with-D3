const data = [
  { width: 200, height: 100, fill: "teal" },
  { width: 100, height: 50, fill: "pink" },
  { width: 50, height: 30, fill: "red" }
];

const svg = d3.select("svg");

const rect = svg
  .selectAll("rect")
  .data(data)
  .attr("height", (d, i, n) => {
    // console.log(n[i]);
    return d.height;
  })
  .attr("width", d => d.width)
  .attr("fill", d => d.fill);

// console.log(rect);

rect
  .enter()
  .append("rect")
  .attr("height", (d, i, n) => d.height)
  .attr("width", d => d.width)
  .attr("fill", d => d.fill);
