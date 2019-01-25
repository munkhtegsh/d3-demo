d3.json('./data.json').then(res => {
  let data = res.map(item => {
    return {name: item.name, height: +item.height};
  });

  let svg = d3
    .select('.row')
    .append('svg')
    .attr('width', 2000)
    .attr('height', 100);

  let y = d3
    .scaleLinear()
    .domain([0, 828])
    .range([0, 100]);

  let squares = svg
    .selectAll('rect')
    .data(data)
    .enter();

  squares
    .append('rect')
    .attr('x', (item, i) => {
      return i * 100;
    })
    .attr('y', 0)
    .attr('height', item => {
      return y(item.height);
    })
    .attr('width', item => {
      return '15px';
    })
    .attr('fill', 'green');
});

// d3.json('./data.json').then(data => {
//   data.forEach(d => {
//     console.log(d);
//     d.age = +d.age;
//   });

//   let svg = d3
//     .select('#chart-are')
//     .append('svg')
//     .attr('width', 2000)
//     .attr('height', 300);

//   let rectangles = svg.selectAll('rect').data(data);

//   rectangles
//     .enter()
//     .append('rect')
//     .attr('x', (d, i) => {
//       return i * 200;
//     })
//     .attr('y', (d, i) => {
//       return 0;
//     })
//     .attr('width', d => {
//       return d.age * 5;
//     })
//     .attr('height', d => {
//       return d.age * 5;
//     })
//     .attr('fill', d => {
//       if (d.age === 10) {
//         return 'blue';
//       } else {
//         return 'green';
//       }
//     });
// });
