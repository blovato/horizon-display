import React, { PropTypes } from 'react';
import './userCountFlock.less';

class UserCountFlock extends React.Component {
  constructor() {
    super();

    this.state = {count: 0, canvas: ''};
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = null;
    this.root = null;
    this.force = null;

    this.nodes = [{}];
    this.createForce = this.createForce.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.count !== this.props.count) {
      this.setState({count: newProps.count});
      this.addNodes();
      this.nodeProperties();
    }
  }

  // componentDidUpdate() {
  //   if (this.state.count === 1570) {
  //     console.log(this.props.isLoading);
  //     this.addNodes();
  //   // }
  //   } else if (this.state.count % 6 === 0) {
  //     this.addNodes();
  //   }
  // }

  componentDidMount() {
    this.createCanvas();
    this.createForce();
  }

  createCanvas() {
    this.canvas = window.d3.select('#flock').append('canvas')
        .attr('width', this.width)
        .attr('height', this.height);
  }

  createForce() {
    this.force = window.d3.layout.force()
        .gravity(0.02)
        .charge(function(d, i) { return i ? 0 : -2000; })
        .nodes(this.nodes)
        .size([this.width / 1.5, this.height])
        .on('tick', this.draw.bind(this));

    this.force.start();

    setInterval(() => this.addMovement(), 4000);
  }

  nodeProperties() {
    var nodes = this.force.nodes();
    this.root = nodes[0];

    this.root.radius = 0;
    this.root.fixed = true;
  }

  addMovement() {
    this.root.py = Math.random() * this.width;
    this.root.px = Math.random() * this.height;
    this.force.resume();
  }

  addNodes() {
    var size = 5.87 * 2;
    var flockCount = Math.floor(this.state.count / 18);
    while (this.nodes.length < flockCount + 1) {
      this.nodes.push({radius: Math.random() * 12 + size});
    }
    this.force.resume();
    // debugger
  }

  collide(node) {
    var r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
        // debugger
    return function(quad, x1, y1, x2, y2) {
      // debugger
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
      // debugger
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
  }

  draw() {
    var context = this.canvas.node().getContext('2d');
    // debugger

    var q = window.d3.geom.quadtree(this.nodes),
        i,
        d,
        n = this.nodes.length;
    for (i = 1; i < n; i++) {
      if (isNaN(this.nodes[i].x) || isNaN(this.nodes[i].y)) {
        this.nodes[i].x = Math.random() * this.height;
        this.nodes[i].y = Math.random() * this.width;
      }
    }

    for (i = 1; i < n; ++i) q.visit(this.collide(this.nodes[i]));
    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = 'rgba(255, 255, 255, ' + 0.5 + ')';
    context.beginPath();
    for (i = 1; i < n; ++i) {
      d = this.nodes[i];
      // debugger
      context.moveTo(d.x, d.y);
      context.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
    }
    context.fill();
  }

  handleClick() {
    var count = this.state.count + 1;
    if (count % 18 === 0) {
      this.addNodes();
    }
    this.setState({count: count});
  }

  render () {
    return (
      <div className={'container'}>
        <div id={'flock'}></div>

        <div className={'userIncrementer'}>
          <button onClick={() => this.handleClick()}>plus</button>
          {this.state.count / 18}
        </div>

      </div>
    );
  }
}

export default UserCountFlock;
