import { CountSchema } from './count.schema';

export const Count = new Mongo.Collection('count');

Count.attachSchema(CountSchema);
