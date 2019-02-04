// Setup margin
let margin = {top: 80, right: 20, bottom: 50, left: 100};
let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

// positioning graph in the svg
let g = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// // X-Labe
// g.append('text')
//   .attr('class', 'x axis-label')
//   .attr('x', width / 2)
//   .attr('y', height + 140)
//   .attr('font-size', '20px')
//   .attr('text-anchor', 'middle')
//   .text('Tallest buildings');

// // Y Label
// g.append('text')
//   .attr('class', 'y axis-label')
//   .attr('x', -(height / 2))
//   .attr('y', -60)
//   .attr('font-size', '20px')
//   .attr('text-anchor', 'middle')
//   .attr('transform', 'rotate(-90)')
//   .text('Height (m)');

// fetching data
d3.json('./data.json').then(res => {
  res.forEach(item => {
    item.revenue = +item.revenue;
  });

  // Scale y-axis
  let y = d3
    .scaleLinear() // fn scales graph to fit in height of the svg
    .domain([0, d3.max(res, d => d.revenue)]) // input
    .range([height, 0]); // output

  // Scale x-axis
  let x = d3
    .scaleBand() // fn scales graph to fit in width of the svg
    .domain(
      res.map(d => {
        return d.month; // inserting name of the bars
      }),
    )
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  let xAxisCall = d3.axisBottom(x);
  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(xAxisCall);
  // .selectAll('text');
  // .attr('y', '10')
  // .attr('x', '-5')
  // .attr('text-anchor', 'end')
  // .attr('transform', 'rotate(-40)');

  let yAxisCall = d3.axisLeft(y);
  g.append('g')
    .attr('class', 'y-axis')
    .call(yAxisCall);
  // .ticks(3) // show 3 ticks in the y-axys
  // .tickFormat(function(d) {
  //   return d + 'm';
  // });

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
    .attr('height', d => height - y(d.revenue)) // height of each bars
    .attr('fill', 'brown');
});
