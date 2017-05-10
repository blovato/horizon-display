import React from 'react';
import classNames from 'classnames';
import './index.less';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {shape1: '', shape2: '', shape3: '', shape4: ''};
  }

  componentDidMount() {
    this.colorTransitionCheck('init');
    this.incrementTime();
  }

  incrementTime() {
    setInterval(() => this.colorTransitionCheck(), 300000);
  }

  colorTransitionCheck(initialize = '') {
    const date = new Date;
    const hour = date.getHours();
    const min = date.getMinutes();

    if (hour === 6 && (min > 0 && min < 6) ||
        (initialize === 'init' && (hour >= 6 && hour< 8))) {
        this.colorTransition(1, "sunrise");
    } else if (hour === 8 && (min > 0 && min < 6) ||
        (initialize === 'init' && (hour >= 8 && hour< 20))) {
        this.colorTransition(2, "daytime");
    } else if ((hour === 20 && (min > 0 && min < 6)) ||
        (initialize === 'init' && (hour >= 20 && hour< 22))) {
        this.colorTransition(3, "dusk");
    } else if ((hour === 22 && (min > 0) && (min < 6)) ||
        (initialize === 'init' && (hour >= 22 || hour < 6))) {
        this.colorTransition(4, "night");
    }
  }

  colorTransition(transitionNum, timeOfDay) {
    this.setState({
      shape1: `transition${transitionNum}-1`,
      shape2: `transition${transitionNum}-2`,
      shape3: `transition${transitionNum}-3`,
      shape4: `transition${transitionNum}-4`,
      shape5: `transition${transitionNum}-5`,
      shape6: `transition${transitionNum}-6`});

    setTimeout(() => this.timeOfDayColorChange(timeOfDay), 15000);
  }

  timeOfDayColorChange(time) {
    this.setState({
      shape1: `${time}1`,
      shape2: `${time}2`,
      shape3: `${time}3`,
      shape4: `${time}4`,
      shape5: `${time}5`,
      shape6: `${time}6`});
  }

  render () {
    return (
      <div className={classNames('Home', 'foo', 'bar')} >
        <svg>
          <rect className={classNames('shape', this.state.shape1)} x='0%' y='-50%' width='100%' height='95%'/>
          <rect className={classNames('shape', this.state.shape2)} x='0' y='35%' width='100%' height='35%'/>
          <ellipse className={classNames('shape', this.state.shape5)} cx='65%' cy='40%' rx='17%' ry='12%'/>
          <rect className={classNames('shape', this.state.shape3)} x='0' y='50%' width='100%' height='25%'/>
          <ellipse className={classNames('shape', this.state.shape6)} cx='35%' cy='55%' rx='17%' ry='12%'/>
          <rect className={classNames('shape', this.state.shape4)} x='0' y='70%' width='100%' height='50%'/>
        </svg>
      </div>
    );
  }
}

export default MainPage;
