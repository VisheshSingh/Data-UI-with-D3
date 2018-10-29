const data = [{ width: 200, height: 100, fill: "teal" }];

const svg = d3.select("svg");

const rect = svg
  .select("rect")
  .data(data)
  .attr("height", (d, i, n) => {
    console.log(n[i]);
    return d.height;
  })
  .attr("width", d => d.width)
  .attr("fill", d => d.fill);

console.log(rect);
