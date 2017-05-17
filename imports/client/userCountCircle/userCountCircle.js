import React from 'react';
// import classNames from 'classnames';
import './userCountCircle.less';

class UserCountCircle extends React.Component {
  render () {
    const count = 2000;
    // const size = Math.round(Math.pow(this.props.count, 2) / 10000);
    const size = 400;
    const containerSize = size * 2;

    return (
      <div className={'current-count'} style={{height: containerSize, width: containerSize}}>
        <svg viewBox={`0 0 ${containerSize} ${containerSize}`} className={'count-circle'}>

          <defs>
            <radialGradient id='exampleGradient'>
              <stop offset='5%' stopColor='white'/>
              <stop offset='100%' stopColor='grey'/>
            </radialGradient>
          </defs>

          <circle fill='url(#exampleGradient)' cx={size} cy={size} r={size}/>
        </svg>
        <div className={'count-container'} style={{height: containerSize, width: containerSize}}>
          <p className={'user-count'}>{this.props.count}</p>
        </div>
      </div>
    );
  }
}

export default UserCountCircle;
