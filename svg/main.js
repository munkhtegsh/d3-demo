d3.json('./data.json').then(res => {
  let data = res.map(item => {
    return {name: item.name, height: +item.height};
  });

  let margin = {top: 20, right: 10, bottom: 20, left: 100};
  let width = 960 - margin.left - margin.right;
  let height = 500 - margin.top - margin.bottom;

  let svg = d3
    .select('.row')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  let g = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  let x = d3
    .scaleBand()
    .domain(data, function(e) {
      return e.name;
    })
    .range([0, width])
    .paddingInner(0, 3)
    .paddingOuter(0.3);

  let y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(e) {
        return e.height;
      }),
    ])
    .range([0, height]);

  let squares = g
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
    .attr('fill', 'orange');
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
