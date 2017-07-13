import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { People } from '/imports/api/People/people.collection';
import index from './index';

export default createContainer(() => {
  const fetchCount = (cb) => Meteor.call('userCountAll', cb);

  return {fetchCount: fetchCount};
}, index);
