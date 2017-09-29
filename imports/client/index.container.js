import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Count } from '/imports/api/Count/count.collection';
import index from './index';

export default createContainer(() => {
  const fetchCount = (cb) => HTTP.get('http://my.shop.co/userCounts', cb);
  const fetchJobCount = (cb) => Meteor.call('jobCountAll', cb);

  return {
    fetchCount: fetchCount,
    fetchJobCount: fetchJobCount
  };
}, index);
