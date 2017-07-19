import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import DisplayData from './dataDisplay/dataDisplay';
import UserCountFlock from './userCountFlock/userCountFlock';
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
      shape7: '',
      shape8: '',
      shape9: '',
      shape10: '',
      shape11: '',
      shape12: '',
      background: 'background-1',
      count: 0,
      jobCount: 0};

    this.colorTransition = this.colorTransition.bind(this);
  }

  componentWillReceiveProps({ count }) {
    if (count !== this.props.count) {
      this.setState({ count });
    }
  }

  componentDidMount() {
    this.fetchUsers();
    this.fetchCount();
    this.backgroundAnimation();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  fetchUsers() {
    this.props.fetchCount((_, count) => {this.setState({count: count});});
    setTimeout(() => this.fetchUsers(), 60000);
  }

  fetchCount() {
    this.props.fetchJobCount((_, count) => {this.setState({jobCount: count});});
    setTimeout(() => this.fetchCount(), 20000);
  }

  backgroundAnimation() {
    if (this.state.background === 'background-1') {
      this.setState({ background: 'background-2' });
    } else {
      this.setState({ background: 'background-1' });
    }

    setTimeout(() => this.backgroundAnimation(), 10000);
  }

  colorTransition(hour, initialize = false) {
    if (hour === 6 ||
        (initialize && (hour >= 6 && hour< 8))) {
        this.colorTransitionSet("sunrise");
    } else if (hour === 8 ||
        (initialize && (hour >= 8 && hour< 20))) {
        this.colorTransitionSet("daytime");
    } else if (hour === 20 ||
        (initialize && (hour >= 20 && hour< 22))) {
        this.colorTransitionSet("dusk");
    } else if (hour === 22 ||
        (initialize && (hour >= 22 || hour < 6))) {
        this.colorTransitionSet("night");
    }
  }

  colorTransitionSet(timeOfDay) {
    this.setState({
      shape7: `${timeOfDay}-background-1`,
      shape8: `${timeOfDay}-background-2`,
      shape9: `${timeOfDay}-background-3`,
      shape10: `${timeOfDay}-background-4`,
      shape11: `${timeOfDay}-background-5`,
      shape12: `${timeOfDay}-background-6`});

    setTimeout(() => this.timeOfDayColorChange(timeOfDay), 10000);
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
    if (this.state.count === 0) {
      return (
        <div className='loading'>
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
          <p className="loading-text">Loading...</p>
        </div>
      );
    } else {
      return (
        <div className={classNames('Home', 'foo', 'bar')} >
          <p className='job-count'>{this.state.jobCount} Open Jobs</p>
          <div className={this.state.background}>
            <div className={classNames('shape', this.state.shape1)}></div>
            <div className={classNames('shape', this.state.shape2)}></div>
            <div className={classNames('shape', this.state.shape3)}></div>
            <div className={classNames('shape', this.state.shape4)}></div>
          </div>

          <div className={classNames('shape', this.state.shape7)}></div>
          <div className={classNames('shape', this.state.shape8)}></div>
          <div className={classNames('shape', this.state.shape9)}></div>
          <div className={classNames('shape', this.state.shape10)}></div>

          <DisplayData colorTransition={this.colorTransition}
            count={this.state.count}
            divisor={20} />
          <UserCountFlock
            count={this.state.count}
            divisor={20} />
        </div>
      );
    }
  }
}

export default MainPage;
