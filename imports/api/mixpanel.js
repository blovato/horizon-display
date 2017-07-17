import Nightmare from 'nightmare';
import { Meteor } from 'meteor/meteor';
const { ADMIN_AUTH } = process.env;

/**
 * scrape ad.shop.co for user count
 * @return {Promise}
 */
export function scrapeUserCountFromAdmin() {
  return Nightmare({ maxAuthRetries: 3 })
    .authentication(...ADMIN_AUTH.split(':'))
    .goto('http://ad.shop.co')
    .evaluate(() => {
      return window.Meteor.subscribe('dashboard.users.countTotal');
    })
    .wait(1000) // wait for sub to load
    .evaluate(() => {
      return window.Counter.get('dashboard.users.countTotal');
    });
}

const shopCoUserCount = 449;

Meteor.methods({
  'userCountAll'() {
    if (Meteor.isServer) {
      return scrapeUserCountFromAdmin().then((count) => {
        console.log(`Found ${count} users`);
        return count - shopCoUserCount;
      });
    }
  },
});
