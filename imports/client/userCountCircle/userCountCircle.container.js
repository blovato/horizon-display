import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { People } from '/imports/api/People/people.collection';
import userCountCircle from './userCountCircle';

export default createContainer(() => {
  const isLoading = !Meteor.subscribe('People.count').ready();
  const count = People.find().count();

  return {count: count};
}, userCountCircle);
