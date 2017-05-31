import React, { PropTypes } from 'react';
import './index.less';

class UserCountFlock extends React.Component {
  componentDidMount() {
    var width = window.innerWidth,
    height = window.innerHeight,
    size = 5.87 * 2;

    var nodes = window.d3.range(300).map(function() { return {radius: (Math.random() / 2) * 12 + size}; }),
        root = nodes[0],
        color = window.d3.scale.category10();

    root.radius = 0;
    root.fixed = true;

    var force = window.d3.layout.force()
        .gravity(0.05)
        .charge(function(d, i) { return i ? 0 : -2000; })
        .nodes(nodes)
        .size([width / 1.5, height]);

    force.start();

    var canvas = window.d3.select("#flock").append("canvas")
        .attr("width", width)
        .attr("height", height);

    var context = canvas.node().getContext("2d");

    force.on("tick", function(e) {
      var q = window.d3.geom.quadtree(nodes),
          i,
          d,
          n = nodes.length;

      for (i = 1; i < n; ++i) q.visit(collide(nodes[i]));

      context.clearRect(0, 0, width, height);
      context.fillStyle = 'steelblue';
      context.beginPath();
      for (i = 1; i < n; ++i) {
        d = nodes[i];
        context.moveTo(d.x, d.y);
        context.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
      }
      context.fill();
    });

    function collide(node) {
      var r = node.radius + 16,
          nx1 = node.x - r,
          nx2 = node.x + r,
          ny1 = node.y - r,
          ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = node.radius + quad.point.radius;
          if (l < r) {
            l = (l - r) / l * .5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    }

    setInterval(function() {
      root.py = Math.random() * width;
      root.px = Math.random() * height;
      force.resume();
    }, 4000);
  }

  render () {
    return (
      <div id={'flock'}></div>
    );
  }
}

export default UserCountFlock;
