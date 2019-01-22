let data = [5, 2, 15, 10, 25];

let svg = d3
  .select('#chart-are')
  .append('svg')
  .attr('width', 2000)
  .attr('height', 300);

let rectangles = svg.selectAll('rect').data(data);

rectangles
  .enter()
  .append('rect')
  .attr('x', (d, i) => {
    return i * 200;
  })
  .attr('y', (d, i) => {
    return 0;
  })
  .attr('width', 100)
  .attr('height', 100)
  .attr('fill', 'green');
