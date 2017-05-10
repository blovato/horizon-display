import React from 'react';
import classNames from 'classnames';
import './index.less';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {rect1: '', rect2: '', rect3: '', rect4: ''};
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
        rect3: 'transition1-3',
        rect4: 'transition1-4'});
      setTimeout(() => this.timeOfDayColorChange(hour), 30000);
    } else if (hour === 8 && (min > 0 && min < 6) ||
        (initialize === 'init' && (hour >= 8 && hour< 20))) {
      this.setState({
        rect1: 'transition2-1',
        rect2: 'transition2-2',
        rect3: 'transition2-3',
        rect4: 'transition2-4'});
      setTimeout(() => this.timeOfDayColorChange(hour), 30000);
    } else if ((hour === 20 && (min > 0 && min < 6)) ||
        (initialize === 'init' && (hour >= 20 && hour< 22))) {
          console.log('start');
      this.setState({
        rect1: 'transition3-1',
        rect2: 'transition3-2',
        rect3: 'transition3-3',
        rect4: 'transition3-4'});
      setTimeout(() => this.timeOfDayColorChange(hour), 30000);
    } else if ((hour === 22 && (min > 0) && (min < 6)) ||
        (initialize === 'init' && (hour >= 22 || hour < 6))) {
      this.setState({
        rect1: 'transition4-1',
        rect2: 'transition4-2',
        rect3: 'transition4-3',
        rect4: 'transition4-4'});
      setTimeout(() => this.timeOfDayColorChange(hour), 15000);
    }
  }

  timeOfDayColorChange(hour) {
    if (hour >= 6 && hour< 8) {
      this.setState({
        rect1: 'sunrise1',
        rect2: 'sunrise2',
        rect3: 'sunrise3',
        rect4: 'sunrise4'});
    } else if (hour >= 8 && hour< 20) {
      this.setState({
        rect1: 'daytime1',
        rect2: 'daytime2',
        rect3: 'daytime3',
        rect4: 'daytime4'});
    } else if (hour >= 20 && hour< 22) {
      this.setState({
        rect1: 'dusk1',
        rect2: 'dusk2',
        rect3: 'dusk3',
        rect4: 'dusk4'});
    } else if (hour >= 22 || hour < 6) {
      this.setState({
        rect1: 'night1',
        rect2: 'night2',
        rect3: 'night3',
        rect4: 'night4'});
    }
  }

  render () {
    return (
      <div className={classNames('Home', 'foo', 'bar')} >
        <svg>
          <rect className={classNames('rect', this.state.rect1)} x='0%' y='-50%' width='100%' height='85%'/>
          <rect className={classNames('rect', this.state.rect2)} x='0' y='35%' width='100%' height='25%'/>
          <rect className={classNames('rect', this.state.rect3)} x='0' y='60%' width='100%' height='25%'/>
          <rect className={classNames('rect', this.state.rect4)} x='0' y='85%' width='100%' height='50%'/>
        </svg>
      </div>
    );
  }
}

export default MainPage;
