import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { People } from '/imports/api/People/people.collection';
import userCountFlock from './userCountFlock';

export default createContainer(() => {
  const isLoading = !Meteor.subscribe('People.count').ready();
  const count = People.find().count();

  return {count: count, isLoading: isLoading};
}, userCountFlock);
