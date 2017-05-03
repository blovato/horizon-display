import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import './Home.less';

function Home() {
  return (
    <div className={classNames('Home', 'foo', 'bar')} >
      <h1>Welcome to Meteor yo!</h1>
    </div>
  );
}

export default Home;
