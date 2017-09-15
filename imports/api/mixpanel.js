import Nightmare from 'nightmare';
import { Meteor } from 'meteor/meteor';
const { ADMIN_AUTH } = process.env;

/**
 * scrape ad.shop.co for user count
 * @return {Promise}
 */
export function scrapeUserCountFromAdmin() {
  console.log('trying to scrape!');
  return Nightmare({ maxAuthRetries: 3, show: false })
    .on('console', (log, msg) => {
      console.log(msg);
    })
    .authentication(...ADMIN_AUTH.split(':'))
    .goto('http://ad.shop.co')
    .evaluate(() => {
        function test(){
          console.log("Hello From Test.");
        }
        test();
      return window.Meteor.subscribe('dashboard.users.countTotal');
    })
    .wait(1000) // wait for sub to load
    .evaluate(() => {
      return window.Counter.get('dashboard.users.countTotal');
    })
    .catch((err) => {
      console.log('in the catch', err.message);
    });
}

const shopCoUserCount = 449;

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
    .catch((err) => {
      console.log('in the catch', err.message);
    });
  }
}

Meteor.methods({
  'userCountAll'() {
    if (Meteor.isServer) {
      return scrapeUserCountFromAdmin().then((count) => {
        console.log(`Found ${count} users`);
        return count - shopCoUserCount;
      });
    }
  },
  'jobCountAll'() {
    if (Meteor.isServer) {
      return scrapeJobCountFromAdmin().then((count) => {return count;});
    }
  },
});
