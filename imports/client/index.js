import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import DisplayData from './dataDisplay/dataDisplay';
import UserCountFlock from './userCountFlock';
import './index.less';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {shape1: '',
      shape2: '',
      shape3: '',
      shape4: '',
      shape5: '',
      shape6: '',
      background: 'background-dark'};
    this.colorTransition = this.colorTransition.bind(this);
    this.backgroundAnimation();
  }

  backgroundAnimation() {
    if (this.state.background === 'background-dark') {
      this.setState({background: 'background'});
    } else {
      this.setState({background: 'background-dark'});
    }
    setTimeout(() => this.backgroundAnimation(), 3000);
  }

  colorTransition(hour, initialize = false) {
    if (hour === 6 ||
        (initialize && (hour >= 6 && hour< 8))) {
        this.colorTransitionSet(1, "sunrise");
    } else if (hour === 8 ||
        (initialize && (hour >= 8 && hour< 20))) {
        this.colorTransitionSet(2, "daytime");
    } else if (hour === 20 ||
        (initialize && (hour >= 20 && hour< 22))) {
        this.colorTransitionSet(3, "dusk");
    } else if (hour === 22 ||
        (initialize && (hour >= 22 || hour < 6))) {
        this.colorTransitionSet(4, "night");
    }
  }

  colorTransitionSet(transitionNum, timeOfDay) {
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
    console.log();
    return (
      <div className={classNames('Home', 'foo', 'bar')} >
        <svg className={this.state.background}>
          <rect className={classNames('shape', this.state.shape1)} x='0%' y='-50%' width='100%' height='95%'/>
          <rect className={classNames('shape', this.state.shape2)} x='0' y='35%' width='100%' height='35%'/>
          <ellipse className={classNames('shape', this.state.shape5)} cx='65%' cy='40%' rx='17%' ry='12%'/>
          <rect className={classNames('shape', this.state.shape3)} x='0' y='50%' width='100%' height='25%'/>
          <ellipse className={classNames('shape', this.state.shape6)} cx='35%' cy='55%' rx='17%' ry='12%'/>
          <rect className={classNames('shape', this.state.shape4)} x='0' y='70%' width='100%' height='50%'/>
        </svg>
        <DisplayData colorTransition={this.colorTransition} />
        <UserCountFlock />
      </div>
    );
  }
}

export default MainPage;
