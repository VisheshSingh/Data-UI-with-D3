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

// Create a linear scale
const y = d3.scaleLinear().range([graphHeight, 0]);

// create a band scale
const x = d3
  .scaleBand()
  .range([0, 500])
  .paddingInner(0.2)
  .paddingOuter(0.2);

//create the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(3)
  .tickFormat(d => d + " orders");

// update x-axis text
xAxisGroup
  .selectAll("text")
  .attr("transform", "rotate(-40)")
  .attr("text-anchor", "end")
  .attr("fill", "orange");

// update function
const update = data => {
  //1. update the scales if they rely on our data
  y.domain([0, d3.max(data, d => d.orders)]);
  x.domain(data.map(item => item.name));

  //2. add updated data to the elements
  const rects = graph.selectAll("rect").data(data);

  //3. remove unwnted shapes with exit selection
  rects.exit().remove();

  //4. update the current shapes in DOM
  rects
    .attr("width", x.bandwidth)
    .attr("height", d => graphHeight - y(d.orders))
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.orders))
    .attr("fill", "orange");

  //5. update the enter selection in DOM
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", d => graphHeight - y(d.orders))
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.orders))
    .attr("fill", "orange");

  // call the axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};

// Get external data from firestore
db.collection("dishes")
  .get()
  .then(res => {
    let data = [];
    res.docs.forEach(doc => data.push(doc.data()));

    update(data);

    d3.interval(() => {
      data.pop();
      update(data);
    }, 2000);
  });
