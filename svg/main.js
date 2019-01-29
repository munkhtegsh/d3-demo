// Setup margin
let margin = {top: 10, right: 20, bottom: 30, left: 40};
let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

// positioning graph in the svg
let g = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// fetching data
d3.json('./data.json').then(res => {
  res.forEach(item => {
    item.revenue = +item.revenue;
  });

  // Scale y-axis
  let y = d3
    .scaleLinear() // fn scales graph to fit in height of the svg
    .domain([0, 54000]) // input
    .range([0, 300]); // output

  // Scale x-axis
  let x = d3
    .scaleBand() // fn scales graph to fit in width of the svg
    .domain(
      res.map(d => {
        console.log(d);
        return d.month; // inserting name of the bars
      }),
    )
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  // d3.max(function(d) {
  //   return d.revenue;
  // }),

  // Select 'rect' && Enter data into svg
  let rect = g
    .selectAll('rect')
    .data(res)
    .enter();
  rect
    .append('rect')
    .attr('x', function(d, i) {
      // x-axys starting point
      return x(d.month);
    })
    .attr('y', function(d, i) {
      // y-axys starting point
      return y(d.revenue);
    })
    .attr('width', x.bandwidth) // width of each bars
    .attr('height', d => d.revenue) // height of each bars
    .attr('fill', 'brown');
});
