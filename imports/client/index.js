import React from 'react';
import classNames from 'classnames';
import './index.less';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {shape1: '', shape2: '', shape3: '', shape4: ''};
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
        shape1: 'transition1-1',
        shape2: 'transition1-2',
        shape3: 'transition1-3',
        shape4: 'transition1-4',
        shape5: 'transition1-5',
        shape6: 'transition1-6'});
      setTimeout(() => this.timeOfDayColorChange(hour), 15000);
    } else if (hour === 8 && (min > 0 && min < 6) ||
        (initialize === 'init' && (hour >= 8 && hour< 20))) {
      this.setState({
        shape1: 'transition2-1',
        shape2: 'transition2-2',
        shape3: 'transition2-3',
        shape4: 'transition2-4',
        shape5: 'transition2-5',
        shape6: 'transition2-6'});
      setTimeout(() => this.timeOfDayColorChange(hour), 15000);
    } else if ((hour === 20 && (min > 0 && min < 6)) ||
        (initialize === 'init' && (hour >= 20 && hour< 22))) {
      this.setState({
        shape1: 'transition3-1',
        shape2: 'transition3-2',
        shape3: 'transition3-3',
        shape4: 'transition3-4',
        shape5: 'transition3-5',
        shape6: 'transition3-6'});
      setTimeout(() => this.timeOfDayColorChange(hour), 15000);
    } else if ((hour === 22 && (min > 0) && (min < 6)) ||
        (initialize === 'init' && (hour >= 22 || hour < 6))) {
      this.setState({
        shape1: 'transition4-1',
        shape2: 'transition4-2',
        shape3: 'transition4-3',
        shape4: 'transition4-4',
        shape5: 'transition4-5',
        shape6: 'transition4-6'});
      setTimeout(() => this.timeOfDayColorChange(hour), 15000);
    }
  }

  timeOfDayColorChange(hour) {
    if (hour >= 6 && hour< 8) {
      this.setState({
        shape1: 'sunrise1',
        shape2: 'sunrise2',
        shape3: 'sunrise3',
        shape4: 'sunrise4',
        shape5: 'sunrise5',
        shape6: 'sunrise6'});
    } else if (hour >= 8 && hour< 20) {
      this.setState({
        shape1: 'daytime1',
        shape2: 'daytime2',
        shape3: 'daytime3',
        shape4: 'daytime4',
        shape5: 'daytime5',
        shape6: 'daytime6'});
    } else if (hour >= 20 && hour< 22) {
      this.setState({
        shape1: 'dusk1',
        shape2: 'dusk2',
        shape3: 'dusk3',
        shape4: 'dusk4',
        shape5: 'dusk5',
        shape6: 'dusk6'});
    } else if (hour >= 22 || hour < 6) {
      this.setState({
        shape1: 'night1',
        shape2: 'night2',
        shape3: 'night3',
        shape4: 'night4',
        shape5: 'night5',
        shape6: 'night6'});
    }
  }

  render () {
    return (
      <div className={classNames('Home', 'foo', 'bar')} >
        <svg>
          <rect className={classNames('shape', this.state.shape1)} x='0%' y='-50%' width='100%' height='95%'/>
          <rect className={classNames('shape', this.state.shape2)} x='0' y='35%' width='100%' height='35%'/>
          <ellipse className={classNames('shape', this.state.shape5)} cx="65%" cy="40%" rx="17%" ry="12%"/>
          <rect className={classNames('shape', this.state.shape3)} x='0' y='50%' width='100%' height='25%'/>
          <ellipse className={classNames('shape', this.state.shape6)} cx="35%" cy="55%" rx="17%" ry="12%"/>
          <rect className={classNames('shape', this.state.shape4)} x='0' y='70%' width='100%' height='50%'/>
        </svg>
      </div>
    );
  }
}

export default MainPage;

// <ellipse className={classNames('shape', this.state.shape4)} cx="65%" cy="75%" rx="17%" ry="12%"/>
