import { PeopleSchema } from './people.schema';

export const People = new Mongo.Collection('people');

People.attachSchema(PeopleSchema);
