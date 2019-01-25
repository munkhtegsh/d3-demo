d3.json('./data.json').then(data => {
  console.log(data);
  data.forEach(d => {
    console.log(d.name);
  });
});

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
  .attr('width', d => {
    return d;
  })
  .attr('height', d => {
    return d;
  })
  .attr('fill', 'green');
