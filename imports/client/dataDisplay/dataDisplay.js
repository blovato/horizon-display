import React from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import getSanFranciscoWeather from '/imports/api/weather';
import classNames from 'classnames';
import './dataDisplay.css';

class DataDisplay extends React.Component {
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
    this.handleTime(true);
    this.incrementTime();
    Meteor.call('weather.getSanFrancisco', (error, res) => {
      if (!error) {
        this.setState({
          weather: res.data.weather[0].description,
          tempFahrenheit: Math.round(res.data.main.temp * 9/5 - 459.67),
          tempCelsius: Math.round(res.data.main.temp - 273.15)});
      } else {
        console.log(error);
      }
    });
  }

  incrementTime() {
    setInterval(() => this.handleTime(), 1000);
  }

  handleTime(initialize = ''){
    const now = moment();

    if (initialize) {
      this.setState({date: now.format('MMMM DD'), time: now.format('HH:mm')});
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

export default DataDisplay;
