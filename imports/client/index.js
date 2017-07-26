import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import DisplayData from './dataDisplay/dataDisplay';
import UserCountFlock from './userCountFlock/userCountFlock';
import './index.css';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {background1: '',
      background2: '',
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
    this.props.fetchCount((error, count) => {
      if (error) {
        this.setState({count: 10000});
      } else {
        this.setState({count: count});
      }
    });
    setTimeout(() => this.fetchUsers(), 60000);
  }

  fetchCount() {
    this.props.fetchJobCount((error, count) => {
      if (error) {
        this.setState({jobCount: 0});
      } else {
        this.setState({jobCount: count});
      }
    });
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
    // } else if (hour === 8 ||
    //     (initialize && (hour >= 8 && hour< 20))) {
    //     this.colorTransitionSet("daytime");
    } else if (hour === 20 ||
        (initialize && (hour >= 20 && hour< 22))) {
        this.colorTransitionSet("dusk");
    // } else if (hour === 22 ||
    //     (initialize && (hour >= 22 || hour < 6))) {
    } else if (true) {
        this.colorTransitionSet("night");
    }
  }

  colorTransitionSet(timeOfDay) {
    this.setState({ background2: `${timeOfDay}-background` });

    setTimeout(() => this.timeOfDayColorChange(timeOfDay), 10000);
  }

  timeOfDayColorChange(time) {
    this.setState({ background1: `${time}` });
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
          <div className='user-info'>
            <p className='job-count'>{this.state.jobCount} Open Jobs</p>
            <div className={'count-container'}>
              <p className={'count'}>Total: {this.state.count}</p>
              <div className="node-count"><p>20</p></div>
            </div>
          </div>
          <div className={this.state.background}>
            <div className={classNames('shape', this.state.background1)}></div>
          </div>

          <div className={classNames('shape', this.state.background2)}></div>

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
