import Nightmare from 'nightmare';
import { Meteor } from 'meteor/meteor';
const { ADMIN_AUTH } = process.env;
import { Count } from './Count/count.collection';

  // fetch.get('my.shop.co/userCount').then((count) => {
  //   Count.upsert();
  // })
/**
 * scrape ad.shop.co for user count
 * @return {Promise}
 */

export function scrapeJobCountFromAdmin() {
  if (Meteor.isServer) {
    return Nightmare({ maxAuthRetries: 3, show: false })
    .authentication(...ADMIN_AUTH.split(':'))
    .goto('https://parachute.shop.co')
    .evaluate(() => {
      return window.Meteor.subscribe('tasks.count.new');
    })
    .wait(1000) // wait for sub to load
    .evaluate(() => {
      return window.Counts.get('tasks.count.new');
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
      console.log('in the catch', err.message);
    });
  }
}

Meteor.methods({
  'jobCountAll'() {
    if (Meteor.isServer) {
      return scrapeJobCountFromAdmin().then((count) => {return count;});
    }
  },
});
