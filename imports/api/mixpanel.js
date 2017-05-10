import { People } from './People/people.collection';
import fetch from './helpers/fetch';
const { MIXPANEL_SECRET } = process.env;

const jqlQueries = {
  // note: symbol '&&' not supported in jql (I think), chaining filters instead
  allPeopleNotTestAccount: `function main(){
    return People()
      .filter(function(user){return !!user.properties.$email})
      .filter(function(user){return user.properties.$email.indexOf("@shop.co") < 0})
      .filter(function(user){return user.properties.$email !== "foo@bar"})
  }`,
};

function queryMixpanel(jql) {
  // https://mixpanel.com/help/reference/jql/api-reference
  return fetch.post(`https://mixpanel.com/api/2.0/jql?script=${jql}`, {
    auth: MIXPANEL_SECRET+':', // is without password intentionally
  });
}

function seedAllRegisteredUsers() {
  queryMixpanel(jqlQueries.allPeopleNotTestAccount)
    .then((res) => { console.log(`Mixpanel returned ${res.data.length} people`); return res.data; })
    // insert to db
    .then(users => users.forEach(({ distinct_id, properties }) => {
      People.upsert(distinct_id, {
        $set: {
          _id: distinct_id,
          email: properties.$email,
          createdAt: properties.$created,
        },
      });
    }))
    .then(() => console.log(`People DB seeded with ${People.find({}).fetch().length} people`))
    .catch((err) => console.error(err));
}

seedAllRegisteredUsers();
