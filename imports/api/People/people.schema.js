import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PeopleSchema = new SimpleSchema({
  _id: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
    label: 'Created At',
  },
  modifiedAt: {
    type: Date,
    label: 'Modified At',
    optional: true,
  },
});
