import React from 'react';
import moment from 'moment';
import getSanFranciscoWeather from '/imports/api/weather';
import classNames from 'classnames';
import './dataDisplay.less';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {shape1: '',
      date: '',
      time: '',
      weather: '',
      tempCelsius: 0,
      tempFahrenheit: 0};
  }

  componentDidMount() {
    this.handleTime('init');
    this.incrementTime();
    getSanFranciscoWeather()
      .then(res => {
        this.setState({
          weather: res.data.weather[0].description,
          tempFahrenheit: Math.round(res.data.main.temp * 9/5 - 459.67),
          tempCelsius: Math.round(res.data.main.temp - 273.15)});
      })
      .catch(err => console.error(err));
  }

  incrementTime() {
    setInterval(() => this.handleTime(), 1000);
  }

  handleTime(initialize = ''){
    const now = moment();

    if (initialize === 'init') {
      this.setState({date: now.format('MMMM DD'), time: now.format('HH:mm')});
      this.props.colorTransition(now.format('HH'), 'init');
    } else if (now.format('HH:mm') !== this.state.time) {
      if (now.format('HH') !== this.state.time.slice(0,2)) {
        this.props.colorTransition(now.format('HH'));
      }
      this.setState({date: now.format('MMMM DD'), time: now.format('HH:mm')});
    }
  }

  render () {
    return (
      <div className={'current-info'}>
        <div className={'main-temp-container'}>
          <div className={'temp-container'}>
            <p className={'temp-conversion'}>C</p>
            <p className={'temp'}>{this.state.tempCelsius}&#176;</p>
          </div>
          <div className={'temp-container'}>
            <p className={'temp-conversion'}>F</p>
            <p className={'temp'}>{this.state.tempFahrenheit}&#176;</p>
          </div>
        </div>
        <p className={'weather'}>{this.state.weather.toUpperCase()}</p>
        <p className={'time'}>{this.state.time}</p>
        <p className={'date'}>{this.state.date}</p>
      </div>
    );
  }
}

export default MainPage;