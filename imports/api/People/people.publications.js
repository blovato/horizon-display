import { Meteor } from 'meteor/meteor';
import { People } from './people.collection';

Meteor.publish('People.count', function () {
  return (People.find({fields: {_id: 1}}));
});
