import { Picker } from 'meteor/meteorhacks:picker';
import bodyParser from 'body-parser';
import { People } from './People/people.collection';

Picker.middleware(bodyParser.urlencoded({ extended: false }));
Picker.middleware(bodyParser.json());

// POST: Register a user, used with zapier for auto registering waitlist users
// required body fields = { email, password, firstName, lastName }
Picker.route('/webhook/user-registered', (params, req, res, next) => {
  if (req.method !== 'POST') return next();
  const peoples = req.body && JSON.parse(req.body.users);
  try {
    peoples.forEach(({ $distinct_id, $properties }) => {
      People.upsert($distinct_id, {
        $set: {
          _id: $distinct_id,
          email: $properties.$email,
          createdAt: $properties.$created,
        },
      });
    });
    res.statusCode = 200;
    res.end();
  } catch (e) {
    res.statusCode = 404;
    console.error(e);
    res.end(JSON.stringify(e));
  }
});


// [
//   {
//     "$distinct_id": "XJJMjfdRn9yK2AGaa",
//     "$properties": {
//       "$city": "Atlanta",
//       "$country_code": "US",
//       "$region": "Georgia",
//       "$initial_referring_domain": "$direct",
//       "$email": "shehroz+35@shop.co",
//       "$initial_referrer": "$direct",
//       "$last_name": "Warne",
//       "userId": "XJJMjfdRn9yK2AGaa",
//       "$created": "2017-05-03T02:33:16",
//       "$browser_version": 58,
//       "$last_seen": "2017-05-03T08:07:55",
//       "$os": "Windows",
//       "$browser": "Chrome",
//       "$timezone": "America/New_York",
//       "$first_name": "Robert"
//     }
//   },
//   {
//     "$distinct_id": "zv9L3XAv46HhfqRn2",
//     "$properties": {
//       "$city": "Laren",
//       "$country_code": "NL",
//       "$region": "North Holland",
//       "$campaigns": [
//         1875892,
//         1714688
//       ],
//       "$initial_referring_domain": "www.shop.co",
//       "$email": "doorne04@ziggo.nl",
//       "$initial_referrer": "https://www.shop.co/",
//       "$last_name": "Van doorne",
//       "userId": "zv9L3XAv46HhfqRn2",
//       "$deliveries": [
//         7719825304,
//         7719856054
//       ],
//       "$created": "2017-05-03T12:10:11",
//       "$browser_version": 9,
//       "$last_seen": "2017-05-03T12:10:12",
//       "$os": "iOS",
//       "$browser": "Mobile Safari",
//       "$timezone": "Europe/Amsterdam",
//       "$first_name": "Caroline"
//     }
//   }