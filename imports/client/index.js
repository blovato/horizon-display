import React from 'react';
import classNames from 'classnames';
import './index.less';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {rect1: '', rect2: '', cir1: '', cir2: ''};
  }

  componentDidMount() {
    this.colorTransition('init');
    this.incrementTime();
  }

  incrementTime() {
    setInterval(() => this.colorTransition(), 300000);
  }

  colorTransition(initialize = "") {
    const date = new Date;
    const hour = date.getHours();
    const min = date.getMinutes();
    if (hour === 6 && (min > 0 && min < 6) ||
        (initialize === 'init' && (hour >= 6 && hour< 8))) {
      this.setState({
        rect1: 'transition1-1',
        rect2: 'transition1-2',
        cir1: 'transition1-3',
        cir2: 'transition1-4'});
      setTimeout(() => this.timeOfDayColorChange(hour), 15000);
    } else if (hour === 8 && (min > 0 && min < 6) ||
        (initialize === 'init' && (hour >= 8 && hour< 20))) {
      this.setState({
        rect1: 'transition2-1',
        rect2: 'transition2-2',
        cir1: 'transition2-3',
        cir2: 'transition2-4'});
      setTimeout(() => this.timeOfDayColorChange(hour), 15000);
    } else if ((hour === 20 && (min > 0 && min < 6)) ||
        (initialize === 'init' && (hour >= 20 && hour< 22))) {
          console.log('start');
      this.setState({
        rect1: 'transition3-1',
        rect2: 'transition3-2',
        cir1: 'transition3-3',
        cir2: 'transition3-4'});
      setTimeout(() => this.timeOfDayColorChange(hour), 15000);
    } else if ((hour === 22 && (min > 0) && (min < 6)) ||
        (initialize === 'init' && (hour >= 22 || hour < 6))) {
      this.setState({
        rect1: 'transition4-1',
        rect2: 'transition4-2',
        cir1: 'transition4-3',
        cir2: 'transition4-4'});
      setTimeout(() => this.timeOfDayColorChange(hour), 15000);
    }
  }

  timeOfDayColorChange(hour) {
    // if (hour >= 6 && hour< 8) {
    if (true) {
      this.setState({
        rect1: 'sunrise1',
        rect2: 'sunrise2',
        cir1: 'sunrise3',
        cir2: 'sunrise4'});
    } else if (hour >= 8 && hour< 20) {
      this.setState({
        rect1: 'daytime1',
        rect2: 'daytime2',
        cir1: 'daytime3',
        cir2: 'daytime4'});
    } else if (hour >= 20 && hour< 22) {
      this.setState({
        rect1: 'dusk1',
        rect2: 'dusk2',
        cir1: 'dusk3',
        cir2: 'dusk4'});
    } else if (hour >= 22 || hour < 6) {
      this.setState({
        rect1: 'night1',
        rect2: 'night2',
        cir1: 'night3',
        cir2: 'night4'});
    }
  }

  render () {
    return (
      <div className={classNames('Home', 'foo', 'bar')} >
        <svg>
          <rect className={classNames('rect', this.state.rect1)} x='0%' y='-50%' width='100%' height='95%'/>
          <rect className={classNames('rect', this.state.rect2)} x='0' y='45%' width='100%' height='85%'/>
          <circle className={classNames('circle', this.state.cir1)} cx="50%" cy="125%" r="40%" />
          <circle className={classNames('circle', this.state.cir2)} cx="50%" cy="125%" r='25%' />
        </svg>
      </div>
    );
  }
}

export default MainPage;
