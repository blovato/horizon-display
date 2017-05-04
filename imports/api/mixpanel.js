import { People } from './People/people.collection';
import fetch from './helpers/fetch';
const { MIXPANEL_SECRET } = process.env;


const jqlQueries = {
  allPeople: 'function main(){return People()}',
};

function queryMixpanel(jql) {
  // https://mixpanel.com/help/reference/jql/api-reference
  return fetch.post(`https://mixpanel.com/api/2.0/jql?script=${jql}`, {
    auth: MIXPANEL_SECRET+':', // is without password intentionally
  });
}

function seedAllRegisteredUsers() {
  const hasPeople = !!People.find({}, { fields: { _id: 1 } }).fetch().length;
  if (hasPeople) return;
  queryMixpanel(jqlQueries.allPeople)
    .then((res) => console.log(res.data.length))
    // todo: upsert People db
    .catch((err) => console.error(err));
}

seedAllRegisteredUsers();
