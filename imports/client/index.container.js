import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { People } from '/imports/api/People/people.collection';
import index from './index';

export default createContainer(() => {
  const fetchCount = (cb) => Meteor.call('userCountAll', cb);
  const fetchJobCount = (cb) => Meteor.call('jobCountAll', cb);

  return {fetchCount: fetchCount, fetchJobCount: fetchJobCount};
}, index);
