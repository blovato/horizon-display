import React from 'react';
import classNames from 'classnames';
import './index.less';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {rect1: 'dawn1', rect2: 'dawn2', rect3: 'dawn3', rect4: 'dawn4'};
    this.incrementTime();
  }

  incrementTime() {
    setInterval(this.timeOfDayColorChange(), 1000);
  }

  timeOfDayColorChange() {
    const date = new Date;
    console.log(date);
    // if (date.getTime())
  }

  render () {
    return (
      <div className={classNames('Home', 'foo', 'bar')} >
        <svg>
          <rect className={classNames('rect', this.state.rect1)} x='0%' y='-25%' width='100%' height='50%'/>
          <rect className={classNames('rect', this.state.rect2)} x='0' y='25%' width='100%' height='25%'/>
          <rect className={classNames('rect', this.state.rect3)} x='0' y='50%' width='100%' height='25%'/>
          <rect className={classNames('rect', this.state.rect4)} x='0' y='75%' width='100%' height='50%'/>
        </svg>
      </div>
    );
  }
}

export default MainPage;
