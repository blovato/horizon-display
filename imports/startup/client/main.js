import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';

import MainPage from '../../client';

Meteor.startup(() => {
  ReactDOM.render(
    <MainPage />,
    document.getElementById('app')
  );
});
