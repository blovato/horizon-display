import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';

import MainPage from '../../client/index.container';

Meteor.startup(() => {
  ReactDOM.render(
    <MainPage />,
    document.getElementById('app')
  );
});
