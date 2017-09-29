import { Meteor } from 'meteor/meteor';
import { Count } from './count.collection';

Meteor.publish('Count.count', function () {
  const reactive = new ReactiveVar(0);
  reactive.set(42);
  return reactive;
  // return (Count.find({fields: {_id: 1}}));
});
