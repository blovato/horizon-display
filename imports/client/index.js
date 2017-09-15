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
      count: 10,
      jobCount: 0,
      opacity: "-dark",
      phase: 1};

    this.colorTransition = this.colorTransition.bind(this);
    this.initializePhase = this.initializePhase.bind(this);
  }

  componentWillReceiveProps({ count }) {
    if (count !== this.props.count) {
      this.setState({ count });
    }
  }

  componentDidMount() {
    // this.fetchUsers();
    this.fetchCount();
    this.colorTransition(true);
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
      this.setState({ background: `background-2${this.state.opacity}` });
    } else {
      this.setState({ background: 'background-1' });
    }

    setTimeout(() => this.backgroundAnimation(), 10000);
  }

  colorTransition(initialize = false) {
    if (initialize) {
      this.initializePhase();
      // this.colorTransitionSet();
    } else {
      this.changePhase();
    }
  }

  opacityChange(time) {
    if (this.state.opacity === '') {
      this.setState({opacity: '-dark'});
    } else {
      this.setState({opacity: ''});
    }
  }

  changePhase() {
    if (this.state.phase === 24) {
      this.setState({phase: 1}, this.colorTransitionSet);
    } else {
      const num =  this.state.phase + 1;
      this.setState({phase: num}, this.colorTransitionSet);
    }
  }

  initializePhase() {
    const phaseTimes = {
      '0': 1, '2': 3, '4': 5, '6': 7, '8': 9, '10': 11, '12': 13,
      '14': 15, '16': 17, '18': 19, '20': 21, '22': 23,
    };

    const time = new Date();
    const hour = time.getHours();
    const minute = Number(time.getMinutes());


    if (phaseTimes[hour] && (minute < 30)) {
      this.setState(
        {phase: phaseTimes[hour], opacity: '-dark'},
        () => this.colorTransitionSet(true)
      );
    } else if (phaseTimes[hour] === undefined && (minute >= 30 && minute < 60)) {
      this.setState(
        {phase: phaseTimes[hour - 1] + 1, opacity: '-dark'},
        () => this.colorTransitionSet(true)
      );
    } else {
      this.setState(
        {phase: phaseTimes[hour], opacity: ''},
        () => this.colorTransitionSet(true)
      );
    }

  }

  // initializeTime(hour) {
  //   if (hour >= 6 && hour< 8) {
  //     return "sunrise";
  //   // } else if (hour >= 8 && hour< 20) {
  //   } else if (true) {
  //     return "daytime";
  //   } else if (hour >= 20 && hour< 22) {
  //     return "dusk";
  //   } else if (hour >= 22 || hour < 6) {
  //     return "night";
  //   }
  // }

  colorTransitionSet(initialize = false) {
    debugger
    const phaseColors = {
      1: ['N1', 'N2'], 3: ['N2', 'N3'], 5: ['N3', 'N4'],  7: ['N4', 'D1'],
      9: ['D1', 'D2'], 11: ['D2', 'D3'], 13: ['D3', 'D4'], 15: ['D4', 'D5'],
      17: ['D5', 'E1'], 19: ['E1', 'E2'], 21: ['E2', 'E3'], 23: ['E3', 'N1']
    };
    let color1;
    let color2;

    if (phaseColors[this.state.phase])  {
      color1 = phaseColors[this.state.phase][0];
      color2 = phaseColors[this.state.phase][1];
    } else {
      color1 = phaseColors[this.state.phase - 1][1];
      color2 = phaseColors[this.state.phase - 1][0];
    }

    if (initialize) {
      this.setState({ background1: color1,
        background2: color2,
        background: 'background-1'});
    } else {
      clearTimeout(this.timeoutId);
      this.setState({background: 'background-1'});
      setTimeout(() => this.setState({ background2: color2 }), 10000);
      setTimeout(() => this.setState({background: 'background-2'}), 1000);
      setTimeout(() => this.setState({ background1: color1 }), 10000);
    }

    setTimeout(() => this.backgroundAnimation(), 10000);
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
              <p className={'count'}>Total: {this.state.count.toLocaleString()}</p>
              <div className="node-count"><p>20</p></div>
            </div>
          </div>
          <div className={this.state.background}>
            <div className={classNames('shape', this.state.background1, 'foreground-img')}></div>
          </div>

          <div className={classNames('shape', this.state.background2, 'background-img')}></div>

          <DisplayData
            colorTransition={this.colorTransition}
            opacityChange={this.opacityChange} />
          <UserCountFlock
            count={this.state.count}
            divisor={20} />
        </div>
      );
    }
  }
}

export default MainPage;
