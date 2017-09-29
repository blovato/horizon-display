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
      jobCount: 0,
      opacity: "-dark",
      phase: 1,
      ready: false
    };

    this.colorTransition = this.colorTransition.bind(this);
    this.colorTransitionSet = this.colorTransitionSet.bind(this);
    this.changePhase = this.changePhase.bind(this);
    this.opacityChange = this.opacityChange.bind(this);
    this.fetchCount = this.fetchCount.bind(this);
  }

  componentWillReceiveProps({ count }) {
    if (count !== this.props.count) {
      this.setState({ count });
    }
  }

  componentDidMount() {
    this.fetchUsers();
    this.fetchCount();
    this.colorTransition(true);
    setTimeout(() => this.setState({ready: true}), 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  launchFullScreen(element) {
    if(element.requestFullScreen) {
      element.requestFullScreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  }

  fetchUsers() {
    this.props.fetchCount((error, response) => {
      if (error) {
        this.setState({count: 10000});
      } else {
        const countObj = JSON.parse(response.content);
        const userCount = countObj.totalUserCount - countObj.shopCoUserCount;

        this.setState({count: userCount});
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
    } else if (phaseTimes[hour] === undefined) {
      this.setState(
        {phase: phaseTimes[hour - 1] + 1, opacity: ''},
        () => this.colorTransitionSet(true)
      );
    } else {
      this.setState(
        {phase: phaseTimes[hour], opacity: ''},
        () => this.colorTransitionSet(true)
      );
    }

  }

  colorTransitionSet(initialize = false) {
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
    if (this.state.count === 0 || !this.state.ready) {
      return (
        <div className='loading'>
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
          <p className="loading-text">Loading...</p>
          <a className='full-screen-button'
            onClick={() => {this.launchFullScreen(document.getElementById('app'));}}>
            Full Screen
          </a>
        </div>
      );
    } else {
      return (
        <div className={classNames('Home', 'foo', 'bar')}>
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
