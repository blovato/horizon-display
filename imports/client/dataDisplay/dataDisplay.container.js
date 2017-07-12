import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { People } from '/imports/api/People/people.collection';
import dataDisplay from './dataDisplay';

export default createContainer(() => {
  const isLoading = !Meteor.subscribe('People.count').ready();
  const count = People.find().count();

  return {count: count, isLoading: isLoading};
}, dataDisplay);
